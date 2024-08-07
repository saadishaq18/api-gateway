const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permission_name: {
        type: String,
        required: true
    },
    permission_type: {
        type: String,
        default: null
    },
    slug: {
        type: String
    },
    permission_link: {
        type: String,
        default: null
    },
    component_id: {
        type: String
    },
    parent_id: {
        type: String,
        default: null
    },
    icon_name: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    is_web: {
        type: Boolean,
        default: true
    },
    is_mobile: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Implementing soft delete
permissionSchema.methods.softDelete = function() {
    this.deletedAt = new Date();
    return this.save();
};

// Restoring soft delete
permissionSchema.methods.restore = function() {
    this.deletedAt = null;
    return this.save();
};

// Added a custom query
permissionSchema.query.notDeleted = function() {
    return this.where({ deletedAt: null });
};

module.exports = mongoose.model("Permission", permissionSchema);
