const User = require('@models/User')
const generateError = require('@utils/errorHandler')

// Get all users
const getUsers = async () => {
    try {
        const users = await User.find({ deletedAt: null })
        return users
    } catch (error) {
        throw error
    }
}

// Get user by ID
const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId, deletedAt: null })
        if (!user) {
            throw generateError("User not found", 404)
        }
        return user
    } catch (error) {
        throw error
    }
}

// Update user
const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId, deletedAt: null },
            { $set: updateData },
            { new: true, runValidators: true }
        )
        if (!user) {
            throw generateError("User not found", 404)
        }
        return {
            message: "User updated successfully",
            user: user
        };
    } catch (error) {
        throw error
    }
}

// Soft delete user
const deleteUser = async (userId) => {
    try {
        const user = await User.findOne(
            { _id: userId, deletedAt: null },
            // { $set: { deletedAt: new Date() } },
            // { new: true }
        )
        if (!user) {
            throw generateError("User not found", 404)
        }
        user.softDelete()
        return { message: "User deleted successfully" }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}
