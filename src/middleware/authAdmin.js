const { Router } = require('express');

const authAdmin = (req, res, next) => {
  if (!req.user.rol) {
    res.status(401).json({
      status: 401,
      message: 'You don`t have authorization to make this request'
    })
  } else if (req.user.rol !== 'admin') {
    res.status(401).json({
      status: 401,
      message: 'You don`t have authorization to make this request'
    })
  } else {
    next()
  }
};

Router.get('/users/:uuid', passport.authenticate('jwt', { session: false }), authAdmin, userHttpHandler.getUserById);