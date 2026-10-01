import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";

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