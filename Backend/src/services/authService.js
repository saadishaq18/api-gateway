const jwt = require('jsonwebtoken')
const User = require('@models/User')
const generateError = require('@utils/errorHandler')
const config = require('@config/default')

//Login Service
const registerUser = async (userData) => {
    const {email, nic, username, role} = userData
    try {
       const existingUser = await User.findOne({
        $or:[
            {email:email},
            {nic:nic},
            {username: username}
        ]
       }) 
       if(existingUser){
        throw generateError("User already registered", 409)
       }

       const newUser = new User({
        ...userData
       })

       await newUser.save()
       return {message: "User created successfully", user: newUser}
    } catch (error) {
        throw error
    }
}

//Login Service
const loginUser = async (userData) => {
    const {credential, password} = userData
    try {
        const user = await User.findOne({
            $or:[
                {email:credential},
                {nic: credential},
                {username: credential}
            ],
            deletedAt: null
        })
        if(!user){
            throw generateError("Invalid credentials", 401)
        }

        const isMatch = user.matchPassword(password)
        if(!isMatch){
            throw generateError("Invalid credentials", 401)
        }

        const token = jwt.sign({id: user._id, email: user.email, username: user.username, nic: user.nic, role: user.role? user.role : null},config.jwtSecret, {
            expiresIn: '1h'
        })

        return {
            message: "Logged in successfully",
            token
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    registerUser,
    loginUser
}