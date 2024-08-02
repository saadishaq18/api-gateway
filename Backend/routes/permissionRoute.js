const express = require('express')
const {addPermission, getPermissions, getPermission, permissionUpdate, removePermission} = require('../controllers/permissionController')

const router = express.Router()

router.post('/', addPermission)
router.get('/', getPermissions)
router.get('/:id', getPermission)
router.put('/:id', permissionUpdate)
router.delete('/:id', removePermission)

module.exports = router