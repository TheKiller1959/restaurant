const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(45)
}); //? Validate login data

module.exports = {
  loginSchema
};