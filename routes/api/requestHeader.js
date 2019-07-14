/**
 * Header Routes for 'header/' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const { logger } = require('../../config/logger');
const HeaderController = require('../../controllers/requestHeader');

const router = express.Router();

/**
 * Build a complete Header object from header body.
 * @param {express.Application.Header} req
 */
const getHeader = req => {
	const {
		id,
		reporter,
		loteNumber,
		quoteNumber,
		address,
		userName,
		userDate,
		activated
	} = req.body;

	const header = {
		id,
		reporter,
		loteNumber,
		quoteNumber,
		address,
		userName,
		userDate,
		activated
	};

	return header;
};

// Get All Headers
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/header/');
	res.json(await HeaderController.getHeaders());
});

// Get Header by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/header/${req.params.id}`);
	res.json(await HeaderController.getHeader(req.params.id));
});

// Create a new header
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/header/');
	const header = getHeader(req);
	res.json(await HeaderController.insertHeader(header));
});

// Update a Header by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/header/');
	const header = getHeader(req);
	res.json(await HeaderController.updateHeader(header));
});

// Remove a Header by id
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/header/');
	res.json(await HeaderController.deleteHeader(id));
});

// Get Request & associated Header
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/request/');
	res.json(await HeaderController.getRequestandHeader());
});

module.exports = router;
