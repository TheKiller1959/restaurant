const router = require('express').Router();
const authHttpHandler = require('./auth.http');
const passport = require('passport');
require('../tools/auth')(passport);


router.route('/login')
  .get(passport.authenticate('jwt', { session: false }), authHttpHandler.loginUser)
  .post(passport.authenticate('jwt', { session: false }), authHttpHandler.loginUser);

router.route('/signup')
  .post(passport.authenticate('jwt', { session: false }), authHttpHandler.registerUser);

router.route('/verify-account')
  .get(passport.authenticate('jwt', { session: false }), authHttpHandler.verifyAccount)
  .post(passport.authenticate('jwt', { session: false }), authHttpHandler.newToken);

router.route('/verify-account/:token&:userId')
  .get(passport.authenticate('jwt', { session: false }), authHttpHandler.verifyAccount);

router.route('/reset-password')
  .post(passport.authenticate('jwt', { session: false }), authHttpHandler.resetPassword);

router.route('/reset-token')
  .get(passport.authenticate('jwt', { session: false }), authHttpHandler.resetToken);

module.exports = {
  router
};


exports.router = router;