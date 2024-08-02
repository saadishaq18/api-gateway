const express = require('express')
const {register, login} = require('../controllers/authController')
const {registerValidations, loginValidations} = require('../middlewares/authMiddleware/authvalidationMiddlewares')

const router = express.Router()

router.post('/register', registerValidations, register)
router.post('/login', loginValidations, login)

module.exports = router