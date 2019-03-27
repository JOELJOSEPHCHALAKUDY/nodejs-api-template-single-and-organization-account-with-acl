const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const permissionTypeSchema =  mongoose.Schema({
    name :  { 
        type: String,
        required: true
     }

});


//create model
const PermissionType = mongoose.model('permissionType', permissionTypeSchema);

// export the model
module.exports = PermissionType;