const crypto = require('../tools/crypt');
const uuid = require('uuid');
const users = require('../database/models/init-models').initModels().users;

//Cualquier usuario
const registerUser = async (data) => {
  // todo: La contraseña tiene que estar encriptada con bcrypt
  const hashedPassword = crypto.hashPassword(data.password);
  const userId = uuid.v4();
  const newUser = await users.create({
    uuid: userId,
    ...data,
    password: hashedPassword,
    role_id: 1
  })
  return {
    message: `User created succesfully with the id: ${userId}`,
    user: newUser,
  };
}

//Solo administradores
const getAllUsers = async () => {
  const users = await users.findAll({
    attributes: {
      exclude: ["password"]
    }
  })
  return users
}

[
  {
    id: 1,
    name: 'jose',
    age: 21,
    country: 'col'
  },
  {
    id: 2,
    name: 'wilmar',
    age: 27,
    country: '<col>'
  }
]



//Solo administradores
const getUserById = async (id) => {
  const user = await users.findByPk(id, {
    attributes: {
      exclude: ["password"]
    }
  })
  return user
}

//clientes y administradores
const deleteUser = async (id) => {
  try {
    const user = await users.destroy({
      where: {
        id
      }
    })
    return {
      message: `User with id: ${id} deleted succesfully.`,
      user
    }
  } catch (error) {
    return error
  }
}

// cualquier rol
const editUser = async (id, data) => {
  const user = await users.update(data, {
    where: {
      id
    }
  })
  return {
    message: `User with id: ${id} eddited succesfully.`,
    user: user
  }
}
// todo:
// ? Crear una funcion que genere un token alfanumerico aleatorio de 8 caracteres
// ? Generar un nuevo token y agregar un nuevo registro a la tabla de verify_tokens, con el userId para enlazar el token
module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser
}