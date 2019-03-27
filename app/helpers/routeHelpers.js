const joi = require('joi');


module.exports =  {
    validateParams: (schema,name) =>    {
        return (req, res, next) =>   {
            console.log({ param: req['params'][name]});
            const result = joi.validate({ param: req['params'][name]},schema) ;
            if(result.error)    {
                return res.status(400).json(result.error);
            }
            
            if(!req.value){ req.value = {};}

            if(!req.value['params']) { req.value['params'] = [];}
            
            req.value['params'][name] = result.value.param;
            next();
        }
    },

    validateBody: (schema) =>    {
        return (req, res, next) =>   {
            const result = joi.validate(req.body,schema,{abortEarly: false}) ;
            if(result.error) {
                return res.status(400).json(result.error);
            }
            if(!req.value){ req.value = {};}
            req.value['body'] = result.value;
            next();
        }
    },
    
    validateQuery: (schema) =>    {
        return (req, res, next) =>   {
            console.log('req.query', req.query);
            const result = joi.validate(req.query,schema) ;
            if(result.error) {
                return res.status(400).json(result.error);
            }
            if(!req.value){ req.value = {};}
            req.value['query'] = result.value;
            next();
        }
    },
    schemas:    {
        authSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required()
        }),
        signupSchema: joi.object().keys({
            email: joi.string().email().required(),
        }),
        idSchema: joi.object().keys({
            param: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        verifyOtpScehma:joi.object().keys({
            otp: joi.number().required(),
            email: joi.string().email().required()
        }),
        setPasswordSchema: joi.object().keys({
            otp: joi.number().required(),
            user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            password: joi.string().required()
        }),
        idParamsSchema: joi.object().keys({
            param: joi.string().required()
        }),
        passwordSchema: joi.object().keys({
            password: joi.string().required()
        }),
    }
}