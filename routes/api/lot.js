/**
 * Lot ID Routes for 'lot/' URL
 * @author Bernardo Sze
 */
const express = require('express');

const { logger } = require('../../config/logger');
const LotController = require('../../controllers/lot');

const router = express.Router();

/**
 * Build a complete Lot object from request body.
 * @param {express.Application.Request} req
 */
const getLot = req => {
	const { id, quoteNumber, lotID, userName, userDate } = req.body;

	const lot = {
		id,
		quoteNumber,
		lotID,
		userName,
		userDate
	};

	return lot;
};

// @route   GET api/lot
// @desc    Get All lots
// @access  PRIVATE
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/lot/');
	res.json(await LotController.getLots());
});

// @route   GET api/lot/:quoteNumber
// @desc    Get All lots BY quote
// @access  PRIVATE
router.get('/:quoteNumber', async (req, res) => {
	logger.debug(`[ Get ] API:/lot/${req.params.quoteNumber}`);
	res.json(await LotController.getLotsByQuote(req.params.quoteNumber));
});

// @route   GET api/lot/:quoteNumber/:lotID
// @desc    Get a lot BY quote AND lot ID
// @access  PRIVATE
router.get('/:quoteNumber/:lotID', async (req, res) => {
	logger.debug(`[ Get ] API:/lot/${req.params.quoteNumber}/${req.params.lotID}`);
	res.json(await LotController.getLot(req.params.quoteNumber, req.params.lotID));
});

// @route   POST api/lot
// @desc    Create a new lot
// @access  PRIVATE
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/lot/');
	const lot = getLot(req);
	res.json(await LotController.insertLot(lot));
});

// @route   PUT api/lot
// @desc    Update a lot
// @access  PRIVATE
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/lot/');
	const lot = getLot(req);
	res.json(await LotController.updateLot(lot));
});

// @route   DELETE api/lot
// @desc    Delete a lot BY quote AND lot ID
// @access  PRIVATE
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/lot/');
	res.json(await LotController.deleteLot(id));
});

module.exports = router;
