const express = require('express')
const {register, login} = require('@controllers/authController')
const {registerValidations, loginValidations} = require('@middlewares/authMiddleware/authvalidationMiddlewares');
const {verifySuperAdminRole, verifyUserRole} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

router.post('/register', registerValidations, verifyUserRole, register)
router.post('/register-admin', registerValidations, verifySuperAdminRole, register)
router.post('/login', loginValidations, login)

module.exports = router