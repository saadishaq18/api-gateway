const express = require('express')
const {getRolesAll,getRole, addRole, roleUpdate, removeRole, assignPermissionsToRoles} =require('@controllers/roleController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

// router.use(authMiddleware);
router.post('/', addRole)
router.get('/', getRolesAll)
router.get('/:id', getRole)
router.put('/update/:id', roleUpdate)
router.delete('/delete/:id', removeRole)
router.post('/assign-permissions', assignPermissionsToRoles)

module.exports = router