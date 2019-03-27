const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require(__base + 'app/passport/passport');
const profileController = require(__base + 'app/controllers/profileController');
const { validateBody,validateParams, schemas} = require(__base + 'app/helpers/routeHelpers');
const  passportLocalOAuth = passport.authenticate('local', { session : false });
const  passportJwtOAuth = passport.authenticate('jwt', { session : false });
const authorization = require(__base + 'app/helpers/authorization');


//.get(passportJwtOAuth,authorization.checkAccess('device_management','read'),validateParams(schemas.idSchema,'jobId'),profileController.getProfile);

router.route('/profile/:id')
    .get(passportJwtOAuth,validateParams(schemas.idSchema,'id'),profileController.getProfileById);
    
router.route('/profile')
    .get(passportJwtOAuth,profileController.getProfile)
    .patch(passportJwtOAuth,profileController.updateUserInfo);

router.route('/profile/billing')
    .patch(passportJwtOAuth,profileController.updateBillingAddress);

router.route('/profile/shipping')
    .patch(passportJwtOAuth,profileController.updateShippingAddress);

router.route('/profile/password')
    .patch(passportJwtOAuth,validateBody(schemas.passwordSchema),profileController.updatePassword);

router.route('/profile/organization')
    .patch(passportJwtOAuth,profileController.updateOrganization);

module.exports = router;