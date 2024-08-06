const express = require('express')
const {getGroupsAll,getGroup, addGroup, GroupUpdate, removeGroup, assignRolesToGroup} =require('@controllers/groupController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

// router.use(authMiddleware);

router.post('/', addGroup)
router.get('/', getGroupsAll)
router.get('/:id', getGroup)
router.put('/update/:id', GroupUpdate)
router.delete('/delete/:id', removeGroup)
router.post('/assign-roles', assignRolesToGroup)

module.exports = router