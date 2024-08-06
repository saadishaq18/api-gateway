const express = require('express')
const {addPermission, getPermissions, getPermission, permissionUpdate, removePermission} = require('../controllers/permissionController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware);

router.post('/', addPermission)
router.get('/', getPermissions)
router.get('/:id', getPermission)
router.put('/:id', permissionUpdate)
router.delete('/:id', removePermission)

module.exports = router