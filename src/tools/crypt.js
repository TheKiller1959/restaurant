const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10)
}; //? Compare passwords

const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword)
}; //? Generate random string

module.exports = {
  hashPassword,
  comparePassword
};