const express = require('express')
const {getGroupsAll,getGroup, addGroup, GroupUpdate, removeGroup, assignRolesToGroup} =require('../controllers/groupController')

const router = express.Router()

router.post('/', addGroup)
router.get('/', getGroupsAll)
router.get('/:id', getGroup)
router.put('/:id', GroupUpdate)
router.delete('/:id', removeGroup)
router.post('/assign-roles', assignRolesToGroup)

module.exports = router