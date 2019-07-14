/**
 * Repair Routes for 'repair/' URL
 * @author Bernardo Sze
 */
const express = require('express');

const { logger } = require('../../config/logger');
const RepairController = require('../../controllers/repair');

const router = express.Router();

/**
 * Build a complete Repair object from request body.
 * @param {express.Application.Request} req
 */
const getRepair = req => {
	const {
		id,
		quoteNumber,
		lotID,
		userName,
		userDate,
		description,
		activaded,
		stage,
		activity,
		workType,
		needItBy,
		repairBy,
		notes,
		poNumber,
		poDate,
		blocked
	} = req.body;

	const quote = {
		id,
		quoteNumber,
		lotID,
		userName,
		userDate,
		description,
		activaded,
		stage,
		activity,
		workType,
		needItBy,
		repairBy,
		notes,
		poNumber,
		poDate,
		blocked
	};

	return quote;
};

// @route   GET api/repair
// @desc    Get All repairs
// @access  PRIVATE
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/repair/');
	res.json(await RepairController.getRepairs());
});

// @route   GET api/repair/:id
// @desc    Get repair BY id
// @access  PRIVATE
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/repair/${req.params.id}`);
	res.json(await RepairController.getRepair(req.params.id));
});

// @route   POST api/repair
// @desc    Create a new repair
// @access  PRIVATE
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/repair/');
	const repair = getRepair(req);
	res.json(await RepairController.insertRepair(repair));
});

// @route   PUT api/repair
// @desc    Update a repair
// @access  PRIVATE
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/repair/');
	const repair = getRepair(req);
	res.json(await RepairController.updateRepair(repair));
});

// @route   DELETE api/repair
// @desc    Delete a repair BY id
// @access  PRIVATE
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/repair/');
	res.json(await RepairController.deleterepair(id));
});

module.exports = router;
