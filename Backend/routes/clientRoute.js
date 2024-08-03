const express = require('express')
const {addClient, getClientAll, getClient, clientUpdate, removeClient} = require('../controllers/clientController')

const router = express.Router()

router.post('/', addClient)
router.get('/', getClientAll)
router.get('/:id', getClient)
router.put('/:id', clientUpdate)
router.delete('/:id', removeClient)

module.exports = router