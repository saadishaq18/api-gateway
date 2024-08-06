const { check, validationResult } = require('express-validator')

const registerValidations = [
    check("firstname")
        .notEmpty().withMessage("First name is required")
        .bail()
        .isLength({ min: 3, max: 24 }).withMessage("First name must be between 3 and 24 characters")
        .bail()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/).withMessage("First name should only contain letters"),
    check("lastname")
        .notEmpty().withMessage("Last name is required")
        .bail()
        .isLength({ min: 3, max: 24 }).withMessage("Last name must be between 3 and 24 characters")
        .bail()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/).withMessage("Last name must only contain alphabets"),
    check("username")
        .notEmpty().withMessage("Username is required")
        .bail()
        .isLength({ min: 3, max: 24 }).withMessage("Username must be between 3 and 24 charcter")
        .bail()
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage("Username can only contain letters, numbers, underscores, and hyphens"),
    check("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid Email format")
        .bail()
        .isLength({ max: 50 }).withMessage("Email length must be less than 50 character"),
    check("phonenumber")
        .notEmpty().withMessage("Phone number is required")
        .bail()
        .matches(/^\d{4}-\d{7}$/).withMessage('Enter a valid phone number in the format xxxx-xxxxxxx'),
    check('nic')
        .notEmpty().withMessage('CNIC is required')
        .bail()
        .matches(/^\d{5}-\d{7}-\d$/).withMessage('Enter a valid CNIC number in the format xxxxx-xxxxxxx-x'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .bail()
        .isLength({ min: 6, max: 15 }).withMessage('Password must be between 6 and 15 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ validationErrors: errors.array() });
        }
        next();
    }
]

const loginValidations = [
    check('credential')
        .notEmpty().withMessage('Credentials is required')
        .bail(),
        // .isEmail().withMessage('Enter a valid credentials'),
        // .isLength({ max: 50 }).withMessage('Email cannot be longer than 50 characters'),

    check('password')
        .notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ validationErrors: errors.array() });
        }
        next();
    }
];

module.exports = {
    registerValidations,
    loginValidations
}