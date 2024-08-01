const jwt = require('jsonwebtoken')
const {generateError} = require('../utils/errorHandler')
const config = require('../config/default')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startWith('Bearer')){
        return next(generateError('Unauthorized - You are not authorized'), 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        return next(generateError("Unauthorized - You are not authorized", 401))
        next()
    }
}

module.exports = {
    authMiddleware
}