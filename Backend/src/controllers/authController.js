
const {registerUser, loginUser} = require('@services/authService')

//register user controller
const register = async (req, res, next) => {
    try {
        const response = await registerUser(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

//login user controller
const login = async (req, res, next) => {
    try {
        const response = await loginUser(req.body)
        res.status(200).json(response)
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    register,
    login
}