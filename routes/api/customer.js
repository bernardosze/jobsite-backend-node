/**
 * Customer Routes for 'customer/' URL
 * @author Leonardo Otoni
 */
const express = require('express');

const { logger } = require('../../config/logger');
const CustomerController = require('../../controllers/customer');

const { getDefaultPaginationSetup } = require('../../utils/requestQueryUtils');

const router = express.Router();

/**
 * Build a complete Customer object from request body.
 * @param {express.Application.Request} req
 */
const getCustomer = req => {
	const {
		id,
		name,
		address,
		city,
		state,
		country,
		phone,
		email,
		personalName,
		personalPosition,
		personalEmail,
		personalPhone,
		paymentMethod,
		termsOfPayment,
		blocked,
		notes
	} = req.body;

	const customer = {
		id,
		name,
		address,
		city,
		state,
		country,
		phone,
		email,
		personalName,
		personalEmail,
		personalPosition,
		personalPhone,
		paymentMethod,
		termsOfPayment,
		blocked,
		notes
	};

	return customer;
};

// @route   GET /api/users
// @desc    Get All Customers
// @access  Private
router.get('/', async (req, res) => {
	logger.debug('[ Get ] /api/customer/');
	const pagination = getDefaultPaginationSetup(req);
	const { customerName, personalName } = req.query;

	// Query parameters
	const params = [];
	if (customerName) {
		params.push({ name: customerName });
	}
	if (personalName) {
		params.push({ personalName });
	}
	try {
		res.json(await CustomerController.getCustomers(params, pagination));
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Get Customer by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/customer/${req.params.id}`);

	try {
		const data = await CustomerController.getCustomer(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(400).json({ type: 'Exception', message: error.message });
	}
});

// @route   POST /api/users
// @desc    Create a new Customer
// @access  Private
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/customer/');
	const customer = getCustomer(req);
	const responseData = await CustomerController.insertCustomer(customer);
	if (responseData.code === 200) {
		return res.json(responseData);
	}
	const { type, message } = responseData;
	return res.status(responseData.code).json({ type, message });
});

// Get Customer by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/customer/');
	const customer = getCustomer(req);
	res.json(await CustomerController.updateCustomer(customer));
});

// Remove a Customer by id
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/customer/');
	res.json(await CustomerController.deleteCustomer(id));
});

module.exports = router;
