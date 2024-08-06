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

const verifyRole = (roleName) => {
    return async (req, res, next) => {
        try {
            if (!req.body.role) {
                const role = await Role.findOne({ name: roleName });
                if (!role) {
                    return next(generateError(`${roleName} role not found`, 400));
                }
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