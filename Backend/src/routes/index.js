const express = require('express')
const autRoutes = require('@routes/authRoutes')
const userRoutes = require('@routes/userRoutes')
const permissionRoutes = require('@routes/permissionRoutes')
const roleRoutes = require('@routes/roleRoutes')
const groupRoutes = require('@routes/groupRoutes')
const clientRoutes = require('@routes/clientRoutes')
const metaDataRoutes = require('@routes/metaDataRoutes')


const router = express.Router()

router.use('/auth', autRoutes)
router.use('/users', userRoutes)
router.use('/permissions', permissionRoutes)
router.use('/roles', roleRoutes)
router.use('/groups', groupRoutes)
router.use('/clients', clientRoutes)
router.use('/meta-data', metaDataRoutes)

module.exports = router