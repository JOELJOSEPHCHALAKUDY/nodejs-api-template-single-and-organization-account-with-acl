const User =  require(__base + 'app/models/user');
const Account =  require(__base + 'app/models/account');
const bcrypt = require('bcryptjs'); 



module.exports = {

    getProfile: async (req, res, next)  => {

        let userProfile = await User.findOne({ _id: req.user._id , active: true}).select('-password -otp -otp_expired_at').populate('account');
        if(!userProfile)
        {
          return  res.status(400).json({ message: 'User Profile not found' });
        }

        res.status(200).json(userProfile);
    },

    getProfileById: async (req, res, next)  => {

        const { id } = req.value.params;

        let userProfile = await User.findOne({ _id: id , active: true}).select('-password -otp -otp_expired_at').populate('account');
        if(!userProfile)
        {
          return  res.status(400).json({ message: 'User Profile not found' });
        }

        res.status(200).json(userProfile);
    },


    updateUserInfo:  async (req, res, next)  => {

        // get the  new billing and shipping address from request

        let { email, first_name ,last_name , phone , avatar  } =  req.body;

        // load the  update and update 

        const updatedUser = await User.findByIdAndUpdate(req.user._id,{ email, first_name , last_name , phone, avatar });
        if(!updatedUser){
            return res.status(400).json({message: 'Something went worng, user profile  is not updated'});
        }

        res.status(200).json({message: 'User Profile info has been updated'});

    },


    updateBillingAddress:  async (req, res, next)  => {

        // get the  new billing from request

        let  billing_address   =  req.body;

        // load the  account and update billing address

        const updatedAccountResult = await Account.findByIdAndUpdate(req.user.account._id,{$set:{  billing_address:billing_address } },{upsert:true});
        if(!updatedAccountResult)
        {
           return res.status(400).json({message: 'Something went worng, billing address not updated'});
        }

        res.status(200).json({message: 'Billing address has been updated' });

    },

    updateShippingAddress:  async (req, res, next)  => {

        // get the  new shipping address from request

        let  shipping_address   =  req.body;

        // load the  account and update shipping address

        const updatedAccountResult = await Account.findByIdAndUpdate(req.user.account._id,{$set:{  shipping_address: shipping_address } },{upsert:true});
        if(!updatedAccountResult)
        {
           return res.status(400).json({message: 'Something went worng, shipping address not updated'});
        }

        res.status(200).json({message: 'Shipping address has been updated' });

    },

    updatePassword: async (req, res, next) => {
        // get the password from request
        let { password } = req.value.body;

        // get the current user details 
        const user =  await User.findOne({_id : req.user._id});
        if(!user)
        {
            return res.status(400).json({ message : "Sorry, invalid user" }); 
        }  

        // generate salt
        const salt =  await  bcrypt.genSalt(10);
        
        // generate the password hash (salt + password)
        const passwordHash = await bcrypt.hash(password, salt);

        // assign  hashed  version  over original , plain text password
        user.password = passwordHash;
        await user.save();

        res.status(200).json({ message : "Your password has been changed sucessfully" });

    
    },

    updateOrganization: async (req, res, next)  => {

        // get the  new organization data from request

        let  organization   =  req.body;

        // load the  account and update organization data

        const updatedAccountResult = await Account.findByIdAndUpdate(req.user.account._id,{$set:{  organization:organization } },{upsert:true});
        if(!updatedAccountResult)
        {
           return res.status(400).json({message: 'Something went worng, organization info not updated'});
        }

        res.status(200).json({message: 'Organization info has been updated' });

    },



}