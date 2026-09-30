import mongoose from "mongoose";
import config from "./config.js";

export async function connectDB() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("********************************");
        console.log("Database connected successfully");
        console.log("********************************");
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
}
