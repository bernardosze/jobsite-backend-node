/**
 * Customer Controller.
 * @author: Leonardo Otoni.
 */
const Sequelize = require('sequelize');

const { logger } = require('../config/logger');
const Customer = require('../models/customer');

const customerFieldList = [
	'id',
	'name',
	'address',
	'phone',
	'email',
	'personalName',
	'personalPosition',
	'personalPhone'
];

const customersFieldList = ['id', 'name', 'address', 'phone', 'personalName'];

/**
 * Fetch all customers
 * @param {Array} params - Query filter parameters
 * @param {Object} pagination - setup for the resultSet
 */
module.exports.getCustomers = async (params, pagination) => {
	const { Op } = Sequelize;
	let filter = {};
	params.forEach(param => {
		filter = {
			...filter,
			[Object.keys(param)[0]]: {
				[Op.like]: `${[Object.values(param)[0]]}%`
			}
		};
	});

	let resultSet = [];
	let numRows = 0;
	try {
		await Customer.findAndCountAll({
			attributes: [...customersFieldList],
			raw: true,
			offset: pagination.offset,
			limit: pagination.limit,
			where: {
				...filter
			}
		}).then(result => {
			resultSet = result.rows;
			numRows = result.count;
		});
	} catch (error) {
		logger.error(`Error fetching Customers ${error}`);
		throw error;
	}
	return { resultSet, numRows };
};

// Fetch a customer
module.exports.getCustomer = async customerId => {
	let data;
	try {
		data = await Customer.findOne({
			where: { id: customerId },
			attributes: [...customerFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a Customer ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new customer
module.exports.insertCustomer = async customerData => {
	let data = {};
	try {
		const customer = await Customer.create(customerData);
		logger.debug(`Customer successfully created: ${customer}`);
		data = { code: 200, customer: { id: customer.id } };
	} catch (error) {
		logger.error(`Error trying to insert a Customer: ${JSON.stringify(customerData)}`);
		logger.error(error);

		const { errors } = error;
		let messages = [error.message]; // default message
		if (errors) {
			// array of Sequelize Validation Messages
			messages = errors.map(e => e.message);
		}

		data = { code: 400, type: 'Exception', message: messages };
	}
	return data;
};

// Update an existing customer
/**
 * @param {tCustomer} - customer
 */
module.exports.updateCustomer = async customer => {
	let data;
	try {
		await Customer.update(
			{
				name: customer.name,
				phone: customer.phone
			},
			{
				where: { id: customer.id }
			}
		);
		logger.debug(`Customer successfully updated: ${JSON.stringify(customer)}`);
		data = { status: 200, message: 'Customer successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Customer: ${JSON.stringify(customer)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing customer
module.exports.deleteCustomer = async customerId => {
	let data;
	try {
		await Customer.destroy({
			where: { id: customerId }
		});
		logger.debug(`Customer successfully deleted: ${JSON.stringify(customerId)}`);
		data = { status: 200, message: 'Customer successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Customer: ${JSON.stringify(customerId)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
