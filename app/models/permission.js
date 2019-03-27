const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const permissionSchema =  mongoose.Schema({
    user :  { 
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
     },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'permissionType',
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    },
    write: {
        type: Boolean,
        default: false,
        required: true
    },
    delete: {
        type: Boolean,
        default: false,
        required: true
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now
     }

});


//create model
const Permission = mongoose.model('permission', permissionSchema);

// export the model
module.exports = Permission;