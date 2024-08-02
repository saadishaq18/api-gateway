const express = require('express')
const autRoute = require('./authRoutes')
const userRoute = require('./userRoutes')
const permissionRoute = require('./permissionRoute')


const router = express.Router()

router.use('/auth', autRoute)
router.use('/users', userRoute)
router.use('/permissions', permissionRoute)

module.exports = router