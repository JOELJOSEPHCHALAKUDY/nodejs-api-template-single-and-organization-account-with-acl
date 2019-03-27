const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
//create a schema
const userSchema = new Schema({
    first_name: {
         type: String,
         default: '',
         required: false
    },
    last_name: {
         type: String,
         default: '',
         required: false
    },
    email: {
        type: String,
        required: true,
        unique : true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        lowercase : true,
        index: true
    },
    phone: {
         type: String,
         default: '',
         required: false
    },
    avatar: {
        type: String,
        default: '',
        required: false
    },
    password: {
        type : String,
        required : false
    },
    otp: {
        type : Number,
        default:null,
        required: false
    },
    otp_expired_at: { 
        type: Date,
        default:null,
        required: false
    },
    active: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'account',
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


userSchema.methods.isValidPassword = async function(newPassword){
    try {
      
        //compare 
         return  await bcrypt.compare(newPassword , this.password);

    } catch (error) {
        throw new Error(error);
    }
}    

//create model
const User = mongoose.model('user', userSchema);

// export the model
module.exports = User;