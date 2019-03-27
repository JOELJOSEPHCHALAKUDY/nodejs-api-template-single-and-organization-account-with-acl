const router = require('express-promise-router')();
const passport = require('passport');
const passportJwtOAuth = passport.authenticate('jwt', { session : false });
const systemController = require(__base + 'app/controllers/systemController');

router.route('/system')
    .get(passportJwtOAuth, systemController.getUptime);

module.exports = router;