const passport = require('passport');
const jwtStatergy = require('passport-jwt').Strategy;
const  { ExtractJwt } = require('passport-jwt');
const localStatergy =   require('passport-local').Strategy;
const { JWT_SECRET } = require(__base + 'app/config/index');
const User =  require(__base + 'app/models/user');
const { HttpError } = require(__base + 'app/utils/http-error');

// json web token statergy
passport.use(new jwtStatergy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async ( payload, done) => {

    try {

        //find user specified in the token
        const user = await User.findById(payload.sub).populate('account');
       
        //if user doesn't exisit handle it 
        if(!user)
        {
            return done(null , false);
        }

        //otherwise return the user
        done(null , user);

    } catch (error) {
       done(error , false); 
    }
})); 


// local statergy

passport.use(new localStatergy({
    usernameField: 'email'
}, async (email , password, done) =>{
    
    try {

        // find the user  from given email
        const user = await User.findOne({ email }).populate('account');

        // if not found  handle it 
        if(!user)
        {
            return done(new HttpError('Wrong credentials, please try again', 403) , false);
        }
        
        // account not actived 
        if(user && user.active == false)
        {
            return done(new HttpError('Account is not activated', 403) , false);
        }
    
        // if user found check  password is correct
        const isMatch = await user.isValidPassword(password); 
        if(!isMatch)
        {
            return done(new HttpError('Wrong Password, please try again', 403) , false);
        }
        
    
        // otherwise , return the user 
         done(null , user);
        
    } catch (error) {
        done(error , false);
    }
    
}));