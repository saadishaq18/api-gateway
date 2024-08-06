const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    client_name:{
        type: String,
        required: true
    },
    secret_key:{
        type: String,
    },
    client_secret_id:{
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

//Implementing soft delete
clientSchema.methods.softDelete = function(){
    this.deletedAt = new Date()
    return this.save()
}

//Restoring soft delete
clientSchema.methods.restore = function(){
    this.deletedAt = null
    return this.save()
}

//Added a custom query
clientSchema.query.notDeleted = function() {
    return this.where({deletedAt: null})
}

module.exports = mongoose.model('Client', clientSchema)