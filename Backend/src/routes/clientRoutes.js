const express = require('express')
const {addClient, getClientAll, getClient, clientUpdate, removeClient} = require('@controllers/clientController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware);
router.post('/', addClient)
router.get('/', getClientAll)
router.get('/:id', getClient)
router.put('/:id', clientUpdate)
router.delete('/:id', removeClient)

module.exports = router