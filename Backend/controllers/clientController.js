const {createClient, getAllClients,getClientById, updateClient, deleteClient} = require('../services/clientService')

const addClient = async (req, res, next) => {
    try {
        const response = await createClient(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getClientAll = async (req, res, next) => {
    try {
        const response = await getAllClients()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getClient = async (req, res, next) => {
    try {
        const response = await getClientById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const clientUpdate = async (req, res, next) => {
    try {
        const response = await updateClient(req.params.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const removeClient = async (req, res, next) => {
    try {
        const response = await deleteClient(req.params.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addClient,
    getClientAll,
    getClient,
    clientUpdate,
    removeClient
}