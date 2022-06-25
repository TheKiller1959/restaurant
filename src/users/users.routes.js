const router = require('express').Router();
const userHttpHandler = require('./users.http')
const passport = require('passport');
const config = require('../config');

require('../tools/auth')(passport)

router.route('/')
  .get(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.getAllUsers)

router.route('/:id')
  .get(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.getUserById)

module.exports = {
  router
}