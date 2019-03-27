const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require(__base + 'app/passport/passport');
const userController = require(__base + 'app/controllers/userController');
const { validateBody, schemas} = require(__base + 'app/helpers/routeHelpers');
const  passportLocalOAuth = passport.authenticate('local', { session : false });
const  passportJwtOAuth = passport.authenticate('jwt', { session : false });

router.route('/users')
    .get(userController.getUsers);

router.route('/signup')
    .post(validateBody(schemas.signupSchema),userController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportLocalOAuth , userController.signIn);

router.route('/secret')
    .get(passportJwtOAuth, userController.secret);

router.route('/verify-otp')
    .post(validateBody(schemas.verifyOtpScehma),userController.verifyOtp);

router.route('/password-setup')
    .post(validateBody(schemas.setPasswordSchema),userController.setPassword);

router.route('/forgot-password')
    .post(validateBody(schemas.signupSchema),userController.forgotPassword);

router.route('/password-reset')
    .post(validateBody(schemas.setPasswordSchema),userController.resetPassword);


router.route('/resend-otp')
    .post(validateBody(schemas.signupSchema),userController.resendOTP);

module.exports = router;