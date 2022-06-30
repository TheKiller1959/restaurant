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
  }
};

//Solo administradores
const getAllUsers = async () => {
  const user = await users.findAll({
    attributes: {
      exclude: ["password"]
    }
  })
  return user
};

//Solo administradores
const getUserById = async (id) => {
  const user = await users.findByPk(id, {
    attributes: {
      exclude: ["password"]
    }
  })
  return user
};

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
};

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
};
// todo:
// ? Crear una funcion que genere un token alfanumerico aleatorio de 8 caracteres
// ? Generar un nuevo token y agregar un nuevo registro a la tabla de verify_tokens, con el userId para enlazar el token

const getPaginatedUsers = async (offset) => {
  // limit : 5

  if (offset) {
    const data = await users.findAll({
      limit: 5,
      offset
    })
    return data
  } else {
    const data = await users.findAll()
    return data

  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
  getPaginatedUsers
};