import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createProduct, listAllProducts } from '../controllers/product.controller.js';

import multer from 'multer';
import { createProductValidator } from '../validators/product.validator.js';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 5, // Maximum number of files
        fileSize: 5 * 1024 * 1024 // 5MB

    }
});

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
    createProductValidator,
    createProduct);


router.get("/",authenticate,listAllProducts);

export default router;