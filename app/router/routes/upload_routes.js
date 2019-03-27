const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const multer =  require('multer');
const upload = require(__base + 'app/services/fileupload');


const uploadController = require(__base + 'app/controllers/uploadController');
const passportJwtOAuth = passport.authenticate('jwt', { session : false });


router.route('/upload')
    .post(passportJwtOAuth,uploadController.upload);



module.exports = router;