const express = require('express')
const autRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const permissionRoutes = require('./permissionRoute')
const roleRoutes = require('./roleRoute')
const groupRoutes = require('./groupRoutes')
const clientRoutes = require('./clientRoute')


const router = express.Router()

router.use('/auth', autRoutes)
router.use('/users', userRoutes)
router.use('/permissions', permissionRoutes)
router.use('/roles', roleRoutes)
router.use('/groups', groupRoutes)
router.use('/clients',clientRoutes)

module.exports = router