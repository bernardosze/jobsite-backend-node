/**
 * Supplier Routes for 'supplier/' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const { logger } = require('../../config/logger');
const SupplierController = require('../../controllers/supplier');

const router = express.Router();

/**
 * Build a complete Supplier object from request body.
 * @param {express.Application.Request} req
 */
const getSupplier = req => {
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

	const supplier = {
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

	return supplier;
};

// Get All Suppliers
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/supplier/');
	res.json(await SupplierController.getSuppliers());
});

// Get Supplier by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/supplier/${req.params.id}`);
	res.json(await SupplierController.getSupplier(req.params.id));
});

// Create a new supplier
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/supplier/');
	const supplier = getSupplier(req);
	res.json(await SupplierController.insertSupplier(supplier));
});

// Update Supplier by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/supplier/');
	const supplier = getSupplier(req);
	res.json(await SupplierController.updateSupplier(supplier));
});

// Remove a Supplier by id
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/supplier/');
	res.json(await SupplierController.deleteSupplier(id));
});

module.exports = router;
