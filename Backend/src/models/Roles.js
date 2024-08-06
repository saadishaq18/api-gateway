const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new mongoose.Schema({
    role_name:{
        type:String,
        required: true
    },
    permissions:[{
        type: Schema.Types.ObjectId,
        ref: 'Permission'
    }],
    deletedAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

//Implementing soft delete
roleSchema.methods.softDelete = function(){
    this.deletedAt = new Date()
    return this.save()
}

//Restoring soft delete
roleSchema.methods.restore = function(){
    this.deletedAt = null
    return this.save()
}

//Added a custom query
roleSchema.query.notDeleted = function() {
    return this.where({deletedAt: null})
}

module.exports = mongoose.model("Role", roleSchema)