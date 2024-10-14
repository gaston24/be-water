require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');


const SECRET_KEY = process.env.SECRET_KEY;

async function login(username, password) {
  const user = await User.findOne({ where: { user_name: username } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  return token;
}

async function register (data) {
    return await User.create(data); 
}

module.exports = { login, register };
