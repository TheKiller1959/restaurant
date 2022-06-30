const nodemailer = require('nodemailer');
const config = require('../config');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    //todo: deben ser una variable de entorno
    user: config.nodemailerEmail,
    pass: config.nodemailerPassword
  }
});

module.exports = {
  transporter
};