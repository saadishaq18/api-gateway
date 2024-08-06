const jwt = require('jsonwebtoken')
const generateError = require('@utils/errorHandler')
const config = require('@config/default')
const Role = require('@models/Roles');

const authMiddleware = function(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next(generateError('Unauthorized - You are not authorized'), 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        return next(generateError("Unauthorized - You are not authorized", 401))
    }
}

const verifyRole = (roleName, permissions = []) => {
    return async (req, res, next) => {
        try {
            // Check if the role is already present in the request body
            if (!req.body.role) {
                // Check if the role exists in the database
                let role = await Role.findOne({ role_name: roleName, deletedAt: null });
                
                // If role does not exist and the roleName is 'SuperAdmin'
                if (!role && roleName === 'SuperAdmin') {
                    // Create the new role with provided permissions
                    const newRole = new Role({
                        role_name: roleName,
                        permissions: permissions
                    });

                    // Save the new role
                    await newRole.save();

                    // Fetch the newly created role
                    role = await Role.findOne({ role_name: roleName, deletedAt: null });
                }

                // If role still does not exist (either non-SuperAdmin role or failed creation)
                if (!role) {
                    return next(generateError(`Something went wrong, unable to register`, 400));
                }

                // Assign the role ID to the request body
                req.body.role = role._id;
            }

            next();
        } catch (error) {
            next(generateError(`Error verifying ${roleName} role`, 500));
        }
    };
};

const verifySuperAdminRole = verifyRole('SuperAdmin');
const verifyUserRole = verifyRole('User');

module.exports = {
    authMiddleware,
    verifySuperAdminRole,
    verifyUserRole,
}