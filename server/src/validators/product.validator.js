import { body, validationResult } from "express-validator";

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Title must be between 2 and 100 characters")
        .isAlpha("en-US", { ignore: " " }).withMessage("Title must contain only letters and spaces"),

    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Description must be between 20 and 500 characters"),

    body("price.amount")
        .exists().withMessage("Price amount is required").bail()
        .isFloat({ min: 0 }).withMessage("Price amount must be a floating  number and greater than or equal to 0"),

    body("price.currency")
        .exists().withMessage("currency is required").bail()
        .isString().withMessage("currency must be a string").bail()
        .isIn(["INR", "USD"]).withMessage("currency must be either INR or USD"),
    body("sizes")
        .exists().withMessage("Size is required").bail()
        .isArray().withMessage("Sizes must be an array of objects").bail(),

    body("sizes.*.size")
        .exists().withMessage("Size is must present in every entry of sizes array").bail()
        .trim()
        .isIn(["S", "M", "L", "XL", "XXL"]).withMessage("Size must be one of S, M, L, XL, XXL"),

    body("sizes.*.stock")
        .exists().withMessage("Stock is must present in every entry of sizes array").bail()
        .isInt({ min: 0 }).withMessage("Stock must be an integer and greater than or equal to 0"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
]