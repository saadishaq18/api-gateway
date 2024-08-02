const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    permission_name:{
        type:String,
        required:true
    },
    permission_type:{
        type:String,
    },
    slug:{
        type: String
    },
    permission_link: {
        type: String
    },
    component_id: {
        type: String
    },
    parent_id: {
        type: String
    },
    icon_name: {
        type: String
    },
    description:{
        type: String
    },
    is_web: {
        type: Boolean
    },
    is_mobile: {
        type: Boolean
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, {
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

module.exports = mongoose.model("Permission", permissionSchema)