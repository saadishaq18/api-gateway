const express = require('express')
const autRoute = require('./authRoutes')
const userRoute = require('./userRoutes')


const router = express.Router()

router.use('/auth', autRoute)
router.use('/users', userRoute)

module.exports = router