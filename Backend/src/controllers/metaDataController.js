const axios = require('axios')
const config = require('@config/default')

const addCity = async (req, res, next) => {
    try {
        const response = await axios.post(`${config.Meta_Data_Service}/api/city/add`, req.body)
        res.status(response.status).json(response)
    } catch (error) {
        next(error)
    }
}

const getCitiesAll = async (req, res,next) =>{
    try {
        const response = await axios.get(`${config.Meta_Data_Service}/api/city`)
        res.status(response.status).json(response)
    } catch (error) {
        next(error)
    }
}

const getCity = async (req, res, next) =>{
    try {
        const cityId = req.params.id;
        const response = await axios.get(`${config.Meta_Data_Service}/api/city/${cityId}`)
        res.status(response.status).json(response)
    } catch (error) {
        next(error)
    }
}

const cityUpdate = async (req, res, next) => {
    try {
        const cityId = req.params.id;
        const response = await axios.put(`${config.Meta_Data_Service}/api/city/update/${cityId}`, req.body)
        res.status(response.status).json(response)
    } catch (error) {
        next(error)
    }
}

const removeCity = async (req, res, next) => {
    try {
        const cityId = req.params.id;
        const response = await axios.delete(`${config.Meta_Data_Service}/api/city/delete/${cityId}`)
        res.status(response.status).json(response)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addCity,
    getCitiesAll,
    getCity,
    cityUpdate,
    removeCity,
}