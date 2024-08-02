const {createPermission, getAllPermissions, getPermissionById, updatePermission, deletePermission} = require('../services/permissionService')

const addPermission = async function(req, res, next){
    try {
       const response = await createPermission(req.body)
       res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getPermissions = async function(req, res, next){
    try {
        const response = await getAllPermissions(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getPermission = async function(req, res, next){
    try{
        const response = await getPermissionById(req.params.id)
        res.status(200).json(response)
    }catch(error){
        next(error)
    }
}

const permissionUpdate = async function(req, res, next){
    try{
        const response = await updatePermission(req.params.id, req.body)
        res.status(200).json(response)
    }catch(error){
        next(error)
    }
}

const removePermission = async function(req, res, next){
    try {
        const response = await deletePermission(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addPermission,
    getPermission,
    getPermissions,
    permissionUpdate,
    removePermission
}