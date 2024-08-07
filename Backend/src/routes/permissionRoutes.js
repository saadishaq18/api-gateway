const express = require('express')
const {addPermission, getPermissions, getPermission, permissionUpdate, removePermission,  parentPermissions, parentPermissionsWithChildren} = require('@controllers/permissionController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware);

router.post('/', addPermission)
router.get('/', getPermissions)
router.get('/:id', getPermission)
router.put('/update/:id', permissionUpdate)
router.delete('/delete/:id', removePermission)
router.get('/parent-permissions', parentPermissions)
router.get('/child-permissions', parentPermissionsWithChildren)

module.exports = router