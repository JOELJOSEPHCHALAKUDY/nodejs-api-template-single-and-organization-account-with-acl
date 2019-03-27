const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const accountSchema =  mongoose.Schema({
     type: {
        type: String,
        enum: ['single', 'organization'],
        default: 'single'
    },
    organization: { 
        name: {
            type: String,
            default: '',
            required: false
        },
        country:{
            type: String,
            default: '',
            required: false
        },
        state: {
            type: String,
            default: '',
            required: false
        },
        city: {
            type: String,
            default: '',
            required: false
        },
        address: {
            type: String,
            default: '',
            required: false
        },
        zipcode: {
            type: String,
            default: '',
            required: false
        },
        logo: {
            type: String,
            default: '',
            required: false
        }
    },
    billing_address: {
        country:{
            type: String,
            default: '',
            required: false
        },
        state: {
            type: String,
            default: '',
            required: false
        },
        city: {
            type: String,
            default: '',
            required: false
        },
        address: {
            type: String,
            default: '',
            required: false
        },
        zipcode: {
            type: String,
            default: '',
            required: false
        }
    },
    shipping_address: {
        country:{
            type: String,
            default: '',
            required: false
        },
        state: {
            type: String,
            default: '',
            required: false
        },
        city: {
            type: String,
            default: '',
            required: false
        },
        address: {
            type: String,
            default: '',
            required: false
        },
        zipcode: {
            type: String,
            default: '',
            required: false
        }
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now
    },
    stripe_сustomer: {
        type: Schema.Types.Mixed,
        default: {}
    }

});


//create model
const Account = mongoose.model('account', accountSchema);

// export the model
module.exports = Account;