/**
 * Progress Routes for 'progress/' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const { logger } = require('../../config/logger');
const ProgressController = require('../../controllers/progress');

const router = express.Router();

/**
 * Build a complete Progress object from progress body.
 * @param {express.Application.Progress} req
 */
const getProgress = req => {
	const {
		id,
		activity,
		head,
		stage,
		crewName,
		manPower,
		foreMan,
		workArea,
		workDescription,
		delay,
		cause,
		action,
		resolution,
		loteNumber,
		quoteNumber,
		notes,
		lastProgress,
		overallProgress
	} = req.body;

	const progress = {
		id,
		activity,
		stage,
		head,
		crewName,
		manPower,
		foreMan,
		workArea,
		workDescription,
		delay,
		cause,
		action,
		resolution,
		loteNumber,
		quoteNumber,
		notes,
		lastProgress,
		overallProgress
	};

	return progress;
};

// Get All Progresss
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/progress/');
	res.json(await ProgressController.getProgresss());
});

// Get Progress by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/progress/${req.params.id}`);
	res.json(await ProgressController.getProgress(req.params.id));
});

// Create a new progress
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/progress/');
	const progress = getProgress(req);
	res.json(await ProgressController.insertProgress(progress));
});

// Update a Progress by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/progress/');
	const progress = getProgress(req);
	res.json(await ProgressController.updateProgress(progress));
});

// Remove a Progress by id
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/progress/');
	res.json(await ProgressController.deleteProgress(id));
});

module.exports = router;
