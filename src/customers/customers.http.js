const costumerController = require('./customers.controllers');

const getCustomerInfo = async (req, res) => {
  const customers = await costumerController.getCustomerById()
  res.status(200).json(customers)
}

const registerCustomer = async (req, res) => {
  const customer = await costumerController.createCustomer()
  res.status(201).json(customer)
}

const updateCostumer = async (req, res) => {
  const customer = await costumerController.updateCustomer()
  res.status(200).json(customer)
}

const getAllAddresses = async (req, res) => {
  const addresses = await costumerController.getAllAddresses()
  res.status(200).json(addresses)
}

const getAddressById = async (req, res) => {
  const address = await costumerController.getAddressById()
  res.status(200).json(address)
}

const createAddress = async (req, res) => {
  const address = await costumerController.createAddress()
  res.status(201).json(address)
}

const updateAddress = async (req, res) => {
  const address = await costumerController.updateAddress()
  res.status(200).json(address)
}

const deleteAddress = async (req, res) => {
  const address = await costumerController.deleteAddress()
  res.status(202).json(address)
}

module.exports = {
  getCustomerInfo,
  registerCustomer,
  updateCostumer,
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
}