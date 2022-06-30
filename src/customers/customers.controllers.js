const uuid = require('uuid');
const customersDetails = require('../database/models/init-models').initModels().customer_details;
const customersAddresses = require('../database/models/init-models').initModels().customer_addresses;

const getCustomerById = async (id) => {
  const customers = await customersDetails.findAll({
    where: {
      id
    },
  })
  return customers
}

const createCustomer = async (data, id) => {
  const customerId = uuid.v4();
  const newCustomer = await customersDetails.create({
    id: customerId,
    ...data,
    id_customer: id
  })
  return newCustomer
}

const updateCustomer = async (data, id) => {
  const customer = await customersDetails.update(data, {
    where: { id },
  })
  if (customer) {
    const customer = await customersDetails.findOne({
      where: { id },
    })
    return customer
  }
  return null
}

const getAllAddresses = async (id) => {
  const addresses = await customersAddresses.findAll({})
  return addresses
}

const getAddressById = async (id) => {
  const address = await customersAddresses.findOne({
    where: { id },
  })
  return address
}

const createAddress = async (data, id) => {
  const customerId = uuid.v4();
  const newAddress = await customersAddresses.create({
    id: customerId,
    ...data,
    id_customer: id
  })
  return newAddress
}

const updateAddress = async (data, id) => {
  const address = await customersAddresses.update(data, {
    where: { id },
  })
  if (address) {
    const address = await customersAddresses.findOne({
      where: { id },
    })
    return address
  }
  return null
}

const deleteAddress = async (id) => {
  const address = await customersAddresses.destroy({
    where: { id },
  })
  return address
}

module.exports = {
  getCustomerById,
  createCustomer,
  updateCustomer,
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
}