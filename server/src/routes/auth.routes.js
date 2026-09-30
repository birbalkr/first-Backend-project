import {Router} from 'express';
import { registerValidationRules } from '../validators/auth.validator.js';
import { register } from '../controllers/auth.controller.js';

const router = Router();

console.log("bihbhkjk");

router.post("/register",registerValidationRules ,register)


export default router;