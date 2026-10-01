import { Router } from 'express';
import { loginValidationRules, registerValidationRules } from '../validators/auth.validator.js';
import { getMe, login, refresh, register } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

console.log("bihbhkjk");

router.post("/register", registerValidationRules, register)

router.post("/login", loginValidationRules, login)

router.post("/refresh", refresh)

router.get("/me", authenticate, getMe)



export default router;