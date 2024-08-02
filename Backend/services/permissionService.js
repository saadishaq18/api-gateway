const Permission = require('../models/Permissions')
const generateError = require('../utils/errorHandler')


const createPermission = async function (permissionData) {
    try {
        const { permission_name } = permissionData
        const existingPermission = Permission.findOne({
            permission_name: permission_name
        })
        if (existingPermission) {
            throw generateError('Permission already exists', 400)
        }

        const newPermission = new Permission ({
            ...permissionData
        })

        await newPermission.save()
        return {
            message: "Permissions created successfully",
            permissions: newPermission
        }
    } catch (error) {
        throw error
    }
}

const getAllPermissions = async function () {
    try {
        const permissions = await Permission.find({ deletedAt: null })
        return permissions
    } catch (error) {
        throw error
    }
}

const getPermissionById = async function (permissionId) {
    try {
        const permission = await Permission.find({
            _id: permissionId,
            deletedAt: null

        })
        if (!permission) {
            throw generateError('Permission not found', 404)
        }
        return permission
    } catch (error) {
        throw error
    }
}

const updatePermission = async function (permissionId, permissionData) {
    try {
        const permission = await Permission.findOneAndUpdate({
            _id: permissionId,
            deletedAt: null
        }, {
            $set: permissionData
        }, {
            new: true,
            runValidators: true
        }
        )
        if (!permission) {
            throw generateError('Permission not found', 404)
        }
        return permission
    } catch (error) {
        throw error
    }
}

const deletePermission = async function (permissionId) {
    try {
        const permission = Permission.findOne({
            _id: permissionId,
            deletedAt: null
        })
        if (!permission) {
            throw generateError('Permission not found', 404)
        }
        permission.softDelete()
        return {
            message: "Permission deleted successfully"
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
}