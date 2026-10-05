import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js";

export async function register(req, res) {
    const { name, email, password } = req.body;

    const isExistingUser = await userModel.findOne({ email });

    if (isExistingUser) {
        return res.status(400).json({
            message: "User already exists",
            errors: [
                {
                    field: "email",
                    message: "Email is already exists with this email address"
                }
            ]
        });
    }

    const user = await userModel.create({
        name,
        email,
        passwordHash: await bcrypt.hash(password, 10)
    });

    const accessToken = createAccessToken({ userId: user._id, role: user.role });
    const refreshToken = createRefreshToken({ userId: user._id, role: user.role });


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    });

    res.status(201).json({
        message: "User registered successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id,
            },
            accessToken
        }
    })


}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",

        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        })
    }

    const accessToken = createAccessToken({ userId: user._id, role: user.role });
    const refreshToken = createRefreshToken({ userId: user._id, role: user.role });

    await userModel.findOneAndUpdate({ email },
        {
            refreshToken
        })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    res.status(200).json({
        message: "User loggedIn successfully",
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            accessToken
        }
    })

}

export async function refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        })
    }

    try {
        const decoded = readRefreshToken(refreshToken);
        const { userId, role } = decoded;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        if (refreshToken !== user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
                // isAccountFreeze: true
            })

            return res.status(401).json({
                message: "Refresh token mismatch"
            })
        }

        const accessToken = createAccessToken({ userId, role });
        const newrefreshToken = createRefreshToken({ userId, role });

        await userModel.findByIdAndUpdate(userId, {
            refreshToken: newrefreshToken
        })

        res.cookie("refreshToken", newrefreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            message: "Access token refreshed successfully",
            data: {
                user:{
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                },
                accessToken
            }
        })

    } catch (error) {
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
}


export async function getMe(req, res) {
    
}