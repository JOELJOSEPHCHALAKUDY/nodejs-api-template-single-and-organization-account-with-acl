const User =  require(__base + 'app/models/user');
const Account =  require(__base + 'app/models/account');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require(__base + 'app/config/index');
const mailService = require(__base + 'app/services/mail');
const bcrypt = require('bcryptjs');

signToken = user => {console.log(JWT_SECRET);
    // generate token
    return  JWT.sign({
            iss:'nodeapp',
            sub:  user._id,
            iat:  Math.floor(new Date().getTime() / 1000), // current time , 
            exp: Math.floor(Date.now() / 1000) + (60 * 60)  // for one hour , for current time + 1 day use  Math.floor(new Date().setDate(new Date().getDate() + 1) / 1000)
        }, JWT_SECRET);
}

module.exports = {
    getUsers: async (req, res, next) => {
        console.log('user controller get user called');
        res.status(200).send({message:'success'});
    },

    signUp : async (req, res, next) => {
        console.log('contents of req.value.body', req.value.body);
        const { email } =  req.value.body;

        // check is an user with same email exisit already
        const  foundUser =  await User.findOne({email});
        if(foundUser)
        {
            return res.status(403).json({error : 'The email is already registered'});
        }

        // genrate
        let otp =  Math.floor(10000 + Math.random() * 90000);


        // create new user if does not exists
        let newUser = new  User({ email, otp });

        // create a account 
        let account = new Account ();
        await account.save( async function(err,account) {
          
            newUser.account = account._id
            await newUser.save();  
        });
       

        // generare token 
        // const token = signToken(newUser);  

        // send confirmation email
        await mailService.sendOtpEmail(newUser.email, otp);

        // resopnd with token
        res.status(200).json({ message: ' Email with One Time Password has be send to the '+ email });
    },
    

    signIn:(req, res, next) => {
        //generate token by passing req.user which here gives loggedin user
        
        const token =  signToken(req.user);
        let is_profile = true;
        
        // check if profile  information is filled  else 
        if(req.user.first_name != '' && req.user.last_name != '' && (req.user.account.billing_address.address != '' && req.user.account.billing_address.city != '' && req.user.account.billing_address.country != '' && req.user.account.billing_address.state != '' && req.user.account.billing_address.zipcode != ''  )  && (req.user.account.shipping_address.address != '' && req.user.account.shipping_address.city != '' && req.user.account.shipping_address.country != '' && req.user.account.shipping_address.state != '' && req.user.account.shipping_address.zipcode != ''  ) )
        {
            is_profile = false;
        }
        res.status(200).json({id:req.user._id, token:token, email: req.user.email, phone: req.user.phone, first_name: req.user.first_name ,last_name: req.user.last_name,  avatar:req.user.avatar , account_id:req.user.account._id, role: req.user.role, account_type:req.user.account.type,is_profile:is_profile });
    },

     secret:(req, res, next) => {
        console.log('I manage to get here');
        console.log(req.user);
       // res.status(200).send({message:'I managed to get here'});
    },

    verifyOtp: async (req, res, next) => {
       
        // get the opt from the request 
        let { otp, email } = req.value.body;

        // check if the user with email and Otp exisits 
        const user = await User.findOne({ email, otp });
        if(!user)
        {
           return res.status(400).json({ message: 'Invalid One-Time Password' , vedified: false });
        }
        
        //response
        res.status(200).json({ message: 'Otp has been verfiied', vedified: true , user_id: user._id  });

    },

    setPassword: async (req, res, next) => {
        // get the password from request
        let { password, user_id, otp } = req.value.body;

        // get the current user details 
        const user =  await User.findOne({_id : user_id, otp: otp });
        if(user)
        {   
            // generate salt
            const salt =  await  bcrypt.genSalt(10);
            
            // generate the password hash (salt + password)
            const passwordHash = await bcrypt.hash(password, salt);

            // assign  hashed  version  over original , plain text password
            user.password = passwordHash;
            user.otp = undefined;
            user.active = true;
            await user.save();

            res.status(200).json({ message : "Your account is now active, please log in" });

        }
        else
        {   
            
            return res.status(400).json({ message : "Sorry OTP has expired or invalid" });
        }

    },

    forgotPassword: async (req, res, next) => {

        // get the reset email fro the request
        let { email } = req.value.body;

        // check is an user with same email exisit
        const  foundUser =  await User.findOne({email});
        if(!foundUser)
        {
            return res.status(403).json({error : 'User with email ' + email +' not found'});
        }

        // genrate
        let otp =  Math.floor(10000 + Math.random() * 90000);

        //foundUser.otp = otp;
        //await foundUser.save();
        await User.update({email}, { $set: {otp: otp}});

        // send reset email
        await mailService.sendPasswordResetOtpEmail(email, otp);

        res.status(200).json({ message : "A email with OTP has been send to " + email });

    },

    resetPassword: async (req, res, next) => {
        // get the password from request
        let { password, user_id , otp } = req.value.body;

        // get the current user details 
        const user =  await User.findOne({_id : user_id, otp : otp });
        if(user)
        {

            // generate salt
            const salt =  await  bcrypt.genSalt(10);
            
            // generate the password hash (salt + password)
            const passwordHash = await bcrypt.hash(password, salt);
            
            // assign  hashed  version  over original , plain text password
            user.password = passwordHash;
            user.otp = undefined;
            await user.save();

            res.status(200).json({ message : "Your password has been changed sucessfully " });

        }
        else
        {
            return res.status(400).json({ message : "Sorry something went wrong! " });
        }

    },


    resendOTP: async (req, res, next) => {

        const { email } =  req.value.body;
        console.log(email);
        // check is an user with same email exisit already
        const  foundUser =  await User.findOne({ email});
        if(!foundUser)
        {
            return res.status(403).json({error : 'User with email id '+ email + ' not found'});
        }

        // genrate
        let otp =  Math.floor(10000 + Math.random() * 90000);

        
        // save new otp to the user
        foundUser.otp = otp;
        let updateduser = await foundUser.save();
        if(!updateduser)
        {   
            return res.status(400).json({ message : "Sorry something went wrong! " });
        }

        console.log(updateduser);

        // send confirmation email
        await mailService.sendOtpEmail(email, otp);

        // resopnd with token
        res.status(200).json({ message: ' Email with One Time Password has be send to the '+ email });
    }


}