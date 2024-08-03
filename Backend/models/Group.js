const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new mongoose.Schema({
    group_name:{
        type:String,
        required: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    deletedAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true
})

//Implementing soft delete
groupSchema.methods.softDelete = function(){
    this.deletedAt = new Date()
    return this.save()
}

//Restoring soft delete
groupSchema.methods.restore = function(){
    this.deletedAt = null
    return this.save()
}

//Added a custom query
groupSchema.query.notDeleted = function() {
    return this.where({deletedAt: null})
}

module.exports = mongoose.model("Group", groupSchema)