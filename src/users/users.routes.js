const router = require('express').Router();
const userHttpHandler = require('./users.http')
const passport = require('passport');
require('../tools/auth')(passport) //? Import auth.js

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), userHttpHandler.getAllUsers)
  .post(passport.authenticate('jwt', { session: false }), userHttpHandler.createUser)

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }), userHttpHandler.getUserById)
  .delete(passport.authenticate('jwt', { session: false }), userHttpHandler.deleteUserByAdmin)
  .put(passport.authenticate('jwt', { session: false }), userHttpHandler.updateUserByAdmin)


router.route('/me')
  .delete(passport.authenticate('jwt', { session: false }), userHttpHandler.deleteUserByMe)
  .put(passport.authenticate('jwt', { session: false }), userHttpHandler.updateUserMe)

exports.router = router;