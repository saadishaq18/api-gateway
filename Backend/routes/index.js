const express = require('express')
const autRoute = require('./authRoutes')

const router = express.Router()

router.use('/auth', autRoute)

module.exports = router