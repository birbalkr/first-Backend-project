import { Router } from 'express';
import { loginValidationRules, registerValidationRules } from '../validators/auth.validator.js';
import { login, refresh, register } from '../controllers/auth.controller.js';

const router = Router();

console.log("bihbhkjk");

router.post("/register", registerValidationRules, register)

router.post("/login", loginValidationRules, login)

router.post("/refresh", refresh)



export default router;