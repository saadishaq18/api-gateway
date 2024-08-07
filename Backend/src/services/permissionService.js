const Permission = require('@models/Permission')
const generateError = require('@utils/errorHandler')


const createPermission = async function (permissionData) {
    try {
       
        const { permission_name } = permissionData
        
        const existingPermission = await Permission.findOne({
            permission_name: permission_name,
            deletedAt: null
        })
        if (existingPermission) {
            
            throw generateError('Permission already exists', 400)
        }

        const newPermission = new Permission ({
            ...permissionData
        })

        await newPermission.save()
        return {
            message: "Permission created successfully",
            permissions: newPermission
        }
    } catch (error) {
        throw error
    }
}

const getAllPermissions = async function () {
    try {
        const permissions = await Permission.find({ deletedAt: null })
        // console.log(permissions)
        return permissions
    } catch (error) {
        throw error
    }
}

const getPermissionById = async function (permissionId) {
    try {
        const permission = await Permission.findOne({
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
        return {
            message: "Permission Updated successfully",
            permission: permission
        };
    } catch (error) {
        throw error
    }
}

const deletePermission = async function (permissionId) {
    try {
        const permission = await Permission.findOne({
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

// Get Parent Permissions
const getParentPermissions = async function() {
    try {
        const parentPermissions = await Permission.find({
            parent_id: null,
            deletedAt: null,
            status: true
        });
        if (parentPermissions.length === 0) {
            throw generateError('No parent permissions found', 404);
        }
        return parentPermissions;
    } catch (error) {
        throw error;
    }
};

// Get All Parent Permissions with Their Children
const getAllParentPermissionsWithChildren = async function() {
    try {
        const permissions = await Permission.aggregate([
            {
                $match: {
                    parent_id: null,
                    deletedAt: null,
                    status: true
                }
            },
            {
                $lookup: {
                    from: 'permissions',
                    localField: '_id',
                    foreignField: 'parent_id',
                    as: 'children'
                }
            },
            {
                $match: {
                    $or: [
                        { "children.deletedAt": null },
                        { "children": { $size: 0 } }
                    ]
                }
            }
        ]);

        if (permissions.length === 0) {
            throw generateError('No parent permissions found', 404);
        }

        return permissions;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
    getParentPermissions,
    getAllParentPermissionsWithChildren
}