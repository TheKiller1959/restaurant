const router = require('express').Router();
const passport = require('passport');
const customerHttpHandler = require('./customers.http');

require('../tools/auth')(passport)

router.route('/users/:uuid/customer')
  .get(passport.authenticate('jwt', { session: false }), customerHttpHandler.getCustomerInfo)
  .post(passport.authenticate('jwt', { session: false }), customerHttpHandler.registerCustomer)

router.route('/:uuid')
  .put(passport.authenticate('jwt', { session: false }), customerHttpHandler.updateCostumer)

router.route('/:uuid/address')
  .get(passport.authenticate('jwt', { session: false }), customerHttpHandler.getAllAddresses)
  .post(passport.authenticate('jwt', { session: false }), customerHttpHandler.createAddress)

router.route('/:uuid/address/:uuid')
  .get(passport.authenticate('jwt', { session: false }), customerHttpHandler.getAddressById)
  .put(passport.authenticate('jwt', { session: false }), customerHttpHandler.updateAddress)
  .delete(passport.authenticate('jwt', { session: false }), customerHttpHandler.deleteAddress)


exports.router = router;