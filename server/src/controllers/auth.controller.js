import userModel from "../models/user.models.js";

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

    const user = await userModel.create({ name, email, password });

}