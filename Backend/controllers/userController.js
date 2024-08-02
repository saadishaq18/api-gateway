const { getUsers, getUserById, updateUser, deleteUser } = require('../services/userService')

// Get all users controller
const listUsers = async (req, res, next) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

// Get user by ID controller
const getUser = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// Update user controller
const update = async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// Soft delete user controller
const removeUser = async (req, res, next) => {
    try {
        const response = await deleteUser(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    listUsers,
    getUser,
    update,
    removeUser
}
