/**
 * Full Request Routes for 'fullrequest/' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const { logger } = require('../../config/logger');
const RequestController = require('../../controllers/fullRequest');

const router = express.Router();

/**
 * Build a complete Request object from request body.
 * @param {express.Application.Request} req
 */
const getRequest = req => {
	const {
		id,
		reporter,
		loteNumber,
		quoteNumber,
		address,
		userName,
		userDate,
		activated,
		activity,
		head,
		requirementDescription,
		workType,
		type,
		dueDate,
		purchaseOrderId,
		purchaseOrderDate,
		notes,
		blocked,
		quantity,
		stage,
		units,
		dimension,
		date
	} = req.body;

	const request = {
		id,
		activity,
		head,
		requirementDescription,
		workType,
		type,
		dueDate,
		purchaseOrderId,
		purchaseOrderDate,
		notes,
		userName,
		userDate,
		blocked,
		units,
		dimension,
		quoteNumber,
		loteNumber,
		reporter,
		date,
		address,
		stage,
		activated,
		quantity
	};

	return request;
};

// Get All Requests
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/request/');
	res.json(await RequestController.getRequestandHeader());
});

// Post All Requests
router.post('/', async (req, res) => {
	logger.debug('[ Get ] API:/request/');
	const request = getRequest(req);
	res.json(await RequestController.insertRequestandHeader(request));
});

// Get All Request by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/request/${req.params.id}`);
	res.json(await RequestController.getRequestandHeaderbyId(req.params.id));
});

// Update a Request and Header by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/request/');
	const request = getRequest(req);
	res.json(await RequestController.updateRequestandHeader(request));
});

module.exports = router;
