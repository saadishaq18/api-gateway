const express = require('express')
const {listUsers, getUser, update, removeUser} = require('@controllers/userController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware);

router.get('/', listUsers)
router.get('/:id', getUser)
router.put('/:id', update)
router.delete('/:id', removeUser)

module.exports = router