const { toPromise } = require('../tools/toPromise');
const usersControllers = require('./users.controllers');

// todo:
//? get /users ADMIN
//? get /users/:id ADMIN
//? delete /users/me CLIENT (no id)
//? delete /users/:id ADMIN
//? put-patch /users/me CLIENT-USER
//? put-patch /users/:id ADMIN


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

const deleteUserByMe = async (req, res) => {
  const user = await usersControllers.deleteUser(req.user.id)
  res.status(204).json(user)
}

const deleteUserByAdmin = async (req, res) => {
  const user = await usersControllers.deleteUser(req.user.id)
  res.status(204).json(user)
}

const updateUserMe = async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json({ message: 'Invalid id' })
  }
  if (req.params.uuid !== req.user.id) {
    return res.status(400).json({ message: 'Wrong user' })
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Missing data' })
  }
  const [myUser, err] = await toPromise(usersControllers.editUser(req.params.uuid, req.body))
  if (err) {
    return res.status(401).json({ message: 'Invalid data' })
  }
  res.status(200).json(myUser)
}

const updateUserByAdmin = async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json({ message: 'Invalid id' })
  }
  if (req.params.uuid !== req.user.id) {
    return res.status(400).json({ message: 'Wrong user' })
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Missing data' })
  }
  const [myUser, err] = await toPromise(usersControllers.editUser(req.params.uuid, req.body))
  if (err) {
    return res.status(401).json({ message: 'Invalid data' })
  }
  res.status(200).json(myUser)
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserByMe,
  deleteUserByAdmin,
  updateUserMe,
  updateUserByAdmin
}