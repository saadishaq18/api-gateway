const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')
const {registerValidations, loginValidations} = require('../middlewares/authvalidationMiddlewares')

const router = express.Router()

router.post('/register', registerValidations, registerUser)
router.post('/login', loginValidations, loginUser)

module.exports = router