// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/user_routes');
const profileRoutes = require('./routes/profile_routes');
const systemRoutes = require('./routes/system_routes');
const uploadRoutes = require('./routes/upload_routes');

router.get('/', function(req,res,next){
res.send({'message':'app works , you are in api endpoint now'});
});

router.use('/v1',[
    userRoutes,
    profileRoutes,
    uploadRoutes,
    systemRoutes,
]);

module.exports = router;