const { generateToken } = require("../tools/generateToken")
const verify_tokens = require('../database/models/init-models').initModels().verify_tokens
const users = require('../models/init-models').initModels().users;
const uuid = require('uuid')

const registerNewUser = async (data, hashPassword) => {
  const id = uuid.v4()
  const newUser = await users.create({
    id,
    ...data,
    password: hashPassword
  })
  return newUser
}

const getMyUserByEmail = async (email) => {
  const myUser = await users.findOne({
    where: {
      email
    }
  })
  return myUser
}

const createToken = (userId) => {
  const newToken = {
    token: generateToken(),
    user_id: userId,
    used: false
  }
  return newToken
}

module.exports = {
  createToken,
  registerNewUser,
  getMyUserByEmail
}