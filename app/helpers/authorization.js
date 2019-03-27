const Permission =  require(__base + 'app/models/permission');
const ObjectId = require('mongoose').Types.ObjectId; 
const { HttpError } = require(__base + 'app/utils/http-error');


module.exports = {
    
    checkAccess :  (permission_type,action) => {

        return  async (req, res, next) => {
            
            // check if the user object is in the request after verifying jwt
            if(req.user){

                // find the account with the user data from the req after passort jwt auth
                if(req.user.account)
                {
                    // find  the account  and check the type 
                    if(req.user.account.type)
                    {   
                        if(req.user.account.type === 'single')
                        {   
                            // if account  is single grant access
                            return next();
                        }
                        else if(req.user.account.type === 'organization'){
                            
                            // find the user permission 
                            const permission = await Permission.findOne({ user :new ObjectId(req.user._id)}).populate({path: 'type', match: { type: { name: permission_type }}});
                            if(permission)
                            {
                                // check permission with permission type and see if action is true 
                                if(permission[action] == true)
                                {
                                    return next();
                                }
                            }
                        }
                    }

                }
             
            }

            // if true move to next middileware else throw  access denied error  
            return next(new HttpError('You are not authorized to perform this action', 401));
        }

    }

}
