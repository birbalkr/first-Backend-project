import { Router } from 'express';
import { addToCartValidator } from '../validators/crat.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js';


const router = Router();

router.post("/", authenticate, addToCartValidator, addToCart)



export default router;