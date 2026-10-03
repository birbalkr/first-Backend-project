import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';

import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();


router.post("/", authenticate, (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "user is not authorized to create a product"
        })
    }
    next();
}, upload.array("images"),
    (req, res, next) => { 
        req.body.price = JSON.parse(req.body.price);
        req.body.sizes = JSON.parse(req.body.sizes);
        next()
    },
    createProduct);



export default router;