const express = require('express')
const {addCity, getCitiesAll, getCity, cityUpdate, removeCity} = require('@controllers/metaDataController')
const {authMiddleware} = require('@middlewares/authMiddleware/authMiddleware')


const router = express.Router()

router.use(authMiddleware);
router.post('/add', addCity)
router.get('/', getCitiesAll)
router.get('/:id', getCity)
router.put('/update/:id', cityUpdate)
router.put('/delete/:id', removeCity)

module.exports = router