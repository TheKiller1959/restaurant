//todo:
//? Crear una funcion que tome como argumento el token y que genere una url como la siguiente:
//* /auth/verify-account?token=(token)&user_id(userId)

/*
/auth/reset-password
/auth/reset-token
/auth/verify-account
*/

const authControllers = require('./auth.controller')
const jwt = require('jsonwebtoken')
const toPromise = require('../tools/toPromise').toPromise
const config = require('../config')
const crypto = require('../tools/crypto')


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
}

const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Invalid Credentials' })
  }

  const [myUser, err] = await toPromise(authControllers.getMyUserByEmail(req.body.email))
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
}

const generateUrl = (token, userId) => {
  return `/auth/verify-account?token=${token}&user_id${userId}`
};

const generateVerifyToken = (req, res) => {
  //? Esta ruta debe estar entro de /me/verify-account
  if (!req.user.id) {
    res.status(400).json({ message: 'Error' })
  }
  const id = req.user.id
  const token = authControllers.createToken(id)
  res.status(200).json({
    message: 'Confirm your account inthe next url',
    url: generateUrl(token, id)
  })
};

const verifyAccount = (req, res) => {
  //* /auth/verify-account?token=(token)&user_id(userId)
  if (!req.query) {
    res.status(400).json({ message: 'Missing data' })
  } else if (!req.query.token || !req.query.user_id) {
    res.status(400).json({ message: 'Missing data' })
  } else {
    //? Verificar la cuenta de usuario
    //todo: crear ambos controladores para modificar la tabla de usuarios a verificado:true y la tabla de verify_tokens a used:true
    //! Esta ruta no esta protegida, todo es a base del req.query
    //* crear las rutas necesarias para verificar la cuenta
  }
};

module.exports = {
  registerUser,
  loginUser,
  generateVerifyToken,
  verifyAccount
}