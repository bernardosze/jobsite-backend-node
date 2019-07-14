/**
 * Request Routes for 'request/' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const { logger } = require('../../config/logger');
const RequestController = require('../../controllers/request');

const router = express.Router();

/**
 * Build a complete Request object from request body.
 * @param {express.Application.Request} req
 */
const getRequest = req => {
	const {
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
		quantity,
		stage,
		units,
		dimension
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
		quantity,
		stage,
		units,
		dimension
	};

	return request;
};

// Get All Requests
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/request/');
	res.json(await RequestController.getRequests());
});

// Get Request by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/request/${req.params.id}`);
	res.json(await RequestController.getRequest(req.params.id));
});

// Create a new request
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/request/');
	const request = getRequest(req);
	res.json(await RequestController.insertRequest(request));
});

// Update a Request by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/request/');
	const request = getRequest(req);
	res.json(await RequestController.updateRequest(request));
});

// Remove a Request by id
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/request/');
	res.json(await RequestController.deleteRequest(id));
});

module.exports = router;
