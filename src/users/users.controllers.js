const crypto = require('../tools/crypto');
const uuid = require('uuid');
const users = require('../database/models/init-models').initModels().users;

//* Cualquier usuario
const registerUser = (data) => {
  const hashedPassword = crypto.hashPassword(data.password);
  const userId = uuid.v4();
  const newUser = users.create({
    id: userId,
    ...data,
    password: hashedPassword,
    role_id: 1
  })

  return {
    message: `User created succesfully with the id: ${userId}`,
    user: newUser,
  };
}

//! Solo administradores
const getAllUsers = async () => {
  const users = await users.findAll({
    attributes: {
      exclude: ["password"]
    }
  })
  return users
}

const getUserById = async (id) => {
  const user = await users.findByPk(id, {
    exclude: ["password"]
  })
  return user
}

//* clientes y administradores
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

//? cualquier rol
const editUser = async (id, data) => {
  const user = await users.update(data, {
    where: {
      id
    }
  })
  return {
    message: `User with id: ${id} edited succesfully.`,
    user: user
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser
}