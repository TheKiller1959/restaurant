const usersControllers = require('./users.controllers');

// todo:
//? get /users ADMIN
//? get /users/:id ADMIN
//? delete /users/me CLIENT (no id)
//? delete /users/:id ADMIN
//? put-patch /users/me CLIENT-USER
//? put-patch /users/:id ADMIN

/*
/auth/login
/auth/signin
/auth/reset-password
/auth/reset-token
/auth/verify-account
*/


const getAllUsers = async (req, res) => {
  if (!req.user.role_id) {
    res.status(401).json({
      status: 401,
      message: `You don't have authorization to make this request`
    })
  }

  if (req.user.role_id !== 'admin') {
    res.status(401).json({
      status: 401,
      message: `You don't have authorization to make this request`
    })
  }
  const users = await usersControllers.getAllUsers()
  res.status(200).json(users)
}

const getUserById = async (req, res) => {
  const users = await usersControllers.getUserById(req.params.id)
  res.status(200).json(users)
}

module.exports = {
  getAllUsers,
  getUserById
}