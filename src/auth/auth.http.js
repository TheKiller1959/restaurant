const authControllers = require('./auth.controller');
const jwt = require('jsonwebtoken');
const toPromise = require('../tools/toPromise').toPromise
const config = require('../config');
const crypto = require('../tools/crypt');
const { loginSchema } = require('../tools/verify');


const registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Invalid Data' })
  }
  const hashPassword = crypto.hashPassword(req.body.password)

  const [newUser, err] = await toPromise(authControllers.registerNewUser(req.body, hashPassword))
  if (err) {
    return res.status(400).json({ message: 'Internal Error' })
  }

  res.status(201).json(newUser)
};

const loginUser = async (req, res) => {
  const data = loginSchema.validate(req.body)
  if (data.error) {
    return res.status(400).json({ message: data.error.details.message })
  } else if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: data.error.details.message })
  }

  const [myUser, err] = await toPromise(authControllers.getMyUserByEmail(
    data.value.email,
    data.value.password
  ))
  if (err || !myUser) {
    return res.status(401).json({ message: 'Invalid Email' })
  }

  const verification = crypto.comparePassword(req.body.password, myUser.password)
  if (!verification) {
    return res.status(401).json({ message: 'Invalid Password' })
  }
  const token = jwt.sign({
    id: myUser.id,
    email: req.body.email
  }, config.jwtSecret)

  res.status(200).json({ token })
};


//todo:
//? Crear una funcion que tome como argumento el token y que genere una url como la siguiente:
//* /auth/verify-account?token=(token)&user_id(userId)

const generateUrl = (token, userId) => {
  return `/auth/verify-account?token=${token}&user_id${userId}`
};


//? Verificar la cuenta de usuario
//todo: crear ambos controladores para modificar la tabla de usuarios a verificado:true y la tabla de verify_tokens a used:true
//! Esta ruta no esta protegida, todo es a base del req.query
//* crear las rutas necesarias para verificar la cuenta

const newToken = async (req, res) => {
  const [myUser, err] = await toPromise(authControllers.getMyUserByEmail(req.query.id))
  if (err || !myUser) {
    return res.status(401).json({ message: 'Invalid User' })
  }

  const verification = crypto.comparePassword(req.query.token, myUser.verify_token)
  if (!verification) {
    return res.status(401).json({ message: 'Invalid Token' })
  }

  const [newToken, error] = await toPromise(authControllers.createNewToken(myUser.id))
  if (error) {
    return res.status(400).json({ message: 'Internal Error' })
  }

  res.status(201).json({
    message: 'New token created',
    token: newToken
  })
};

const verifyAccount = async (req, res) => {
  //* /auth/verify-account
  if (!req.query) {
    res.status(400).json({ message: 'Missing data' })
  } else if (!req.query.token || !req.query.user_id) {
    res.status(400).json({ message: 'Missing data' })
  } else {
    const [verifyToken, err] = await toPromise(authControllers.verifyAccount(req.query.token))
    if (err) {
      res.status(400).json({ message: 'Error' })
    } else if (!verifyToken) {
      res.status(400).json({ message: 'Invalid token' })
    }
    const [user, error] = await toPromise(authControllers.getMyUserByEmail(req.query.user_id))
    if (error) {
      res.status(400).json({ message: 'Error' })
    } else if (!user) {
      res.status(400).json({ message: 'Invalid user' })
    }
    res.status(200).json({ message: 'Account verified' })
  }
};

const resetPassword = async (req, res) => {
  //* /auth/reset-password
  if (!req.body) {
    res.status(400).json({ message: 'Invalid Data' })
  }
  const [user, err] = await toPromise(authControllers.getMyUserByEmail(req.body.email))
  if (err || !user) {
    return res.status(401).json({ message: 'Invalid Email' })
  }
  const token = authControllers.createToken(user.id)
  await authControllers.verify_tokens.create(token)
  res.status(200).json({
    message: 'Confirm your account in the next url',
    url: generateUrl(token, user.id)
  })
};

const resetToken = async (req, res) => {
  //* /auth/reset-token
  if (!req.query) {
    res.status(400).json({ message: 'Missing data' })
  } else if (!req.query.token) {
    res.status(400).json({ message: 'Missing data' })
  }
  const [verifyToken, err] = await toPromise(authControllers.verifyAccount(req.query.token))
  if (err) {
    res.status(400).json({ message: 'Error' })
  } else if (!verifyToken) {
    res.status(400).json({ message: 'Invalid token' })
  }
  const [user, error] = await toPromise(authControllers.getMyUserByEmail(verifyToken.user_id))
  if (error) {
    res.status(400).json({ message: 'Error' })
  } else if (!user) {
    res.status(400).json({ message: 'Invalid user' })
  }
  res.status(200).json({ message: 'Account verified' })
};

module.exports = {
  registerUser,
  loginUser,
  newToken,
  verifyAccount,
  resetPassword,
  resetToken
};