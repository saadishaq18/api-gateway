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
        type:Text
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

module.exports = mongoose.model("Permission", permissionSchema)