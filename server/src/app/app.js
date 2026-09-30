import express from "express";
import router from "../controllers/auth.controller.js";

const app = express();
app.use(express.json());


app.use("/api/auth",router)
export default app;
