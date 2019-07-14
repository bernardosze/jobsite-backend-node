/**
 * Quote Routes for 'quote/' URL
 * @author Bernardo Sze
 */
const express = require('express');

const { logger } = require('../../config/logger');
const QuoteController = require('../../controllers/quote');

const router = express.Router();

/**
 * Build a complete Quote object from request body.
 * @param {express.Application.Request} req
 */
const getQuote = req => {
	const {
		id,
		quoteNumber,
		customerName,
		projectAddress,
		projectType,
		quoteStage,
		estimatedStartDate,
		requestedQuoteDate,
		userName,
		userDate
	} = req.body;

	const quote = {
		id,
		quoteNumber,
		customerName,
		projectAddress,
		projectType,
		quoteStage,
		estimatedStartDate,
		requestedQuoteDate,
		userName,
		userDate
	};

	return quote;
};

// @route   GET /api/users
// @desc    Get All Customers
// @access  Private
// router.get('/', async (req, res) => {
//   logger.debug('[ Get ] /api/customer/');
//   const pagination = getDefaultPaginationSetup(req);
//   const { search } = req.query;

//   // Query parameters
//   const params = [];
//   if (search) {
//     params.push({ search });
//   }
//   try {
//     res.json(await QuoteController.getCustomers(params, pagination));
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// @route   GET api/quote
// @desc    Get All quotes
// @access  PRIVATE
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/quote/');
	res.json(await QuoteController.getQuotes());
});

// @route   GET api/quote/:id
// @desc    Get All quotes
// @access  PRIVATE
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/quote/${req.params.id}`);
	res.json(await QuoteController.getQuote(req.params.id));
});

// @route   POST api/quote
// @desc    Create a new quote
// @access  PRIVATE
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/quote/');
	const quote = getQuote(req);
	res.json(await QuoteController.insertQuote(quote));
});

// @route   PUT api/quote
// @desc    Update a quote
// @access  PRIVATE
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/quote/');
	const quote = getQuote(req);
	res.json(await QuoteController.updateQuote(quote));
});

// @route   DELETE api/quote
// @desc    Delete a quote by quote number
// @access  PRIVATE
router.delete('/', async (req, res) => {
	const { quoteNumber } = req.body;
	logger.debug('[ Delete ] API:/quote/');
	res.json(await QuoteController.deleteQuote(quoteNumber));
});

module.exports = router;
