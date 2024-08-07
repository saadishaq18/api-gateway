const Client = require('@models/Client')
const generateError = require('@utils/errorHandler')

const createClient = async (clientData) => {{
    try {
        const {client_name} = clientData

        const existingClient = await Client.findOne({
            client_name,
            deletedAt: null
        })

        if(existingClient){
            throw generateError("Client Already exist", 400)
        }

        const newClient = new Client({
            ...Client
        })

        await newClient.save()

        return{
            message: "Client created successfully",
            client: newClient
        }
    } catch (error) {
        throw error
    }
}}

const getAllClients = async () => {
    try {
        const clients = await Client.find({
            deletedAt: null
        })

        return clients
    } catch (error) {
        throw error
    }
}

const getClientById = async (clientId) => {
    try {
        const client = await Client.findOne({
            _id: clientId,
            deletedAt: null
        })
        if(!client){
            throw generateError("Client not found", 400)
        }

        return client
    } catch (error) {
        throw error
    }
}

const updateClient = async (clientId, clientData) => {
    try {
        const client = await Client.findOneAndUpdate(
            {
            _id: clientId,
            deletedAt: null
        },
        {
            $set: clientData
        }, 
        {
          new: true,
          runValidators: true  
        }
    )
    if(!client){
        throw generateError("Client not found", 400)
    }

    return {
        message: "Client updated successfully",
        client: client
    };
    } catch (error) {
        throw(error)
    }
}

const deleteClient = async (clientId) => {
    try {
        const client = Client.findOne({
            _id: clientId
        })
        if(!client){
            throw generateError("Client not found", 400)
        }

        await client.softDelete()

        return{
            message: "Client deleted successfully"
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
}