const Role = require('../models/Roles')
const generateError = require('../utils/errorHandler')

//Create a role
const createRole = async function (roleData) {
    const { role_name } = roleData
    try {
        const existingRole = await Role.findOne({
            role_name,
            deletedAt: null
        })
        if (existingRole) {
            throw generateError('Role already exists', 400)
        }
        const newRole = new Role({
            ...roleData
        })

        await newRole.save()

        return {
            message: "Role created successfully",
            role: newRole
        }

    } catch (error) {
        throw error
    }

}

//Get all roles
const getAllRoles = async () => {
    try {
        const roles = await Role.find({
            deletedAt: null
        })

        return roles
    } catch (error) {
        throw error
    }
}

//Get role by id
const getRoleById = async (roleId) => {
    try {
        const role = await Role.findOne({
            _id: roleId,
            deletedAt: null
        })
        if (!role) {
            throw generateError('Role not found', 404)
        }
        return role
    } catch (error) {
        throw error
    }
}

//Update role
const updateRole = async (roleId, roleData) => {
    try {
        const role = await Role.findOneAndUpdate(
            {
                _id: roleId,
                deletedAt: null
            },
            {
                $set: roleData
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!role) {
            throw generateError('Role not found', 404)
        }
        return role
    } catch (error) {
        throw error
    }
}

// Delete Role
const deleteRole = async (roleId) => {
    try {
        const role = await Role.findOne({
            _id: roleId,
            deletedAt: null
        })
        if(!role){
            throw generateError("Role not found", 404)
        }
        role.softDelete()
        return{
            message: "Role deleted successfully"
        }
    } catch (error) {
        throw error
    }
}

//assign permission to role
const assignPermissionsToRole = async (roleId, permissionIds) => {
    try{
        const role = await Role.findById(roleId)
        if(!role) throw generateError("Role not found", 400)
        
        role.permissions = permissionIds
    
        return await role.save()
    }
    catch(e){
        throw error
    }
}

module.export = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    assignPermissionsToRole
}

