const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_name:{
        type:String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

//Implementing soft delete
permissionSchema.methods.softDelete = function(){
    this.deletedAt = new Date()
    return this.save()
}

//Restoring soft delete
permissionSchema.methods.restore = function(){
    this.deletedAt = null
    return this.save()
}

//Added a custom query
permissionSchema.query.notDeleted = function() {
    return this.where({deletedAt: null})
}

module.exports = mongoose.model("Role", roleSchema)