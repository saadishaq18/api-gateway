const Permission = require('@models/Permission')
const Role = require('@models/Roles')
const generateError = require('@utils/errorHandler')

//Create a role
const createRole = async function (roleData) {
    const { role_name, permissions } = roleData;
    try {
        // Check if role already exists
        const existingRole = await Role.findOne({
            role_name,
            deletedAt: null
        });
        if (existingRole) {
            throw generateError('Role already exists', 400);
        }

        // Create new role
        const newRole = new Role({
            role_name,
            // Add permissions if provided
            permissions: permissions || []
        });

        // Save the role
        await newRole.save();

        // Validate and assign permissions if provided
        if (permissions && permissions.length > 0) {
            // Check if all permissions exist and are not deleted
            const validPermissions = await Permission.find({
                _id: { $in: permissions },
                deletedAt: null
            });
            
            if (validPermissions.length !== permissions.length) {
                throw generateError('One or more permissions do not exist or are deleted', 400);
            }

            // Assign valid permissions to the new role
            newRole.permissions = validPermissions.map(permission => permission._id);
            await newRole.save();
        }

        return {
            message: "Role created successfully",
            role: newRole
        };

    } catch (error) {
        throw error;
    }
};

//Get all roles
const getAllRoles = async () => {
    try {
        // Fetch roles and populate the permissions field
        const roles = await Role.find({ deletedAt: null })
            .populate({
                path: 'permissions', // The field in Role model that references Permission
                match: { deletedAt: null },
                select: 'permission_name _id' 
            });

            if (roles.length === 0) {
                throw generateError('Role not found', 404)
            }
        return roles;
    } catch (error) {
        throw error;
    }
};

//Get role by id
const getRoleById = async (roleId) => {
    try {
        const role = await Role.findOne({
            _id: roleId,
            deletedAt: null
        })
        .populate({ path: 'permissions', match: { deletedAt: null },   select: 'permission_name _id'  });
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
        return {
            message: "Role updated successfully",
            role: role
        };
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

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    assignPermissionsToRole
}

