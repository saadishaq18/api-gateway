const {createRole, getAllRoles, getRoleById, updateRole,deleteRole, assignPermissionsToRole} = require('../services/roleService')

const addRole = async (req, res, next) => {
    try {
        const response = await createRole(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getRolesAll = async (req, res,next) =>{
    try {
        const response = await getAllRoles()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getRole = async (req, res, next) =>{
    try {
        const response = await getRoleById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const roleUpdate = async (req, res, next) => {
    try {
        const response = await updateRole(req.params.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const removeRole = async (req, res, next) => {
    try {
        const response = await deleteRole(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const assignPermissionsToRoles = async (req, res, next) => {
    try {
        const {roleId, permissionIds} = req.body
        const response = await assignPermissionsToRole(roleId, permissionIds)
        res.status(200).json(response)
    } catch (error) {
        throw error
    }
}

module.exports = {
    addRole,
    getRolesAll,
    getRole,
    roleUpdate,
    removeRole,
    assignPermissionsToRoles
}