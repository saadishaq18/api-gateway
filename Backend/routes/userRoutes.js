const express = require('express')
const router = express.Router()
const {listUsers, getUser, update, removeUser} = require('../controllers/userController')
const {authMiddleware} = require('../middlewares/authMiddleware/authMiddleware')

router.get('/',authMiddleware, listUsers)
router.get('/:id', authMiddleware, getUser)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, removeUser)

module.exports = router