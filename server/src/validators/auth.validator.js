import { body, validationResult } from "express-validator";


export const registerValidationRules = [

    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Invalid email address"),

    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z\s]+$/).withMessage("Name must contain only letters and spaces")
        .trim(),

    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string")
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

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


export const loginValidationRules = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a string").bail()
        .trim()
        .isEmail().withMessage("Invalid email address"),

    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array()
            })
        }
        next();
    }
]