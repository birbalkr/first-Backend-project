import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
        enum: ['user', 'seller'],
    }
})
const userModel = mongoose.model("User", userSchema);

export default userModel;