const { generateToken } = require("../tools/generateToken");
const verify_tokens = require('../database/models/init-models').initModels().verify_tokens
const users = require('../database/models/init-models').initModels().users
const uuid = require('uuid');

const registerNewUser = async (data, hashPassword) => {
  const id = uuid.v4()
  const newUser = await users.create({
    id,
    ...data,
    password: hashPassword
  })
  return newUser
};

const getMyUserByEmail = async (email) => {
  const myUser = await users.findOne({
    where: {
      id,
      email
    }
  })
  return myUser
};

const createToken = (userId) => {
  const newToken = {
    token: generateToken(),
    user_id: userId,
    used: false
  }
  return newToken
};

const resetPassword = async (email) => {
  const user = await getMyUserByEmail(email)
  if (user) {
    const token = createToken(user.id)
    await verify_tokens.create(token)
    return token
  }
  return null
};

const verifyAccount = async (token) => {
  const verifyToken = await verify_tokens.findOne({
    where: {
      token
    }
  })
  if (verifyToken) {
    await verifyToken.update({
      used: true
    })
    return true
  }
  return false
};


module.exports = {
  createToken,
  registerNewUser,
  getMyUserByEmail,
  resetPassword,
  verifyAccount
};