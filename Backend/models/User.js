const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
})

//Encrypting the Password and save it in Database
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//Decrypting the password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

//Implementing soft delete
userSchema.methods.softDelete = () => {
    this.deletedAt = new Date()
    return this.save()
}

//Restoring soft delete
userSchema.methods.restore = () => {
    this.deletedAt = null
    return this.save()
}

//Added a custom query
userSchema.query.notDeleted = function() {
    return this.where({deletedAt: null})
}

//filtered the deleted data
// userSchema.pre('find', function(next){
//     return this.where({deletedAt: null})
//     next()
// })

// userSchema.pre('findOne', function(next){
//     return this.where({deletedAt: null})
//     next()
// })

module.exports = mongoose.model('User', userSchema)