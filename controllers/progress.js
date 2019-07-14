/**
 * Progress Controller.
 * @author: Sagrika Aggarwal.
 */
const { logger } = require('../config/logger');
const Progress = require('../models/progress');
const Lot = require('../models/lot');

const progressFieldList = [
	'id',
	'activity',
	'stage',
	'crewName',
	'manPower',
	'foreMan',
	'workArea',
	'workDescription',
	'delay',
	'cause',
	'action',
	'resolution',
	'head',
	'notes',
	'lastProgress',
	'overallProgress'
];

// Fetch all Progresss
module.exports.getProgresss = async () => {
	let data;
	try {
		data = await Progress.findAll({
			attributes: [...progressFieldList],
			include: [Lot]
		});
	} catch (error) {
		logger.error(`Error fetching Progresss ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a Progress
module.exports.getProgress = async progressId => {
	let data;
	try {
		data = await Progress.findOne({
			where: { id: progressId },
			attributes: [...progressFieldList],
			include: [Lot]
		});
	} catch (error) {
		logger.error(`Error fetching a Progress ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new Progresss
module.exports.insertProgress = async progress => {
	let data;
	const {
		activity,
		stage,
		crewName,
		foreMan,
		workArea,
		workDescription,
		delay,
		cause,
		action,
		resolution,
		loteNumber,
		quoteNumber,
		notes
	} = progress;

	let { lastProgress, overallProgress, manPower } = progress;

	manPower = parseInt(manPower, 10);
	lastProgress = parseInt(lastProgress, 10);
	overallProgress = parseInt(overallProgress, 10);

	try {
		const { id } = await Lot.findOne({
			where: { lotID: loteNumber, quoteNumber },
			attributes: ['id'],
			raw: true
		});

		await Progress.create({
			activity,
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
			head: id,
			notes,
			lastProgress,
			overallProgress
		});
		logger.debug(`Progress successfully created: ${progress}`);
		data = { status: 200, message: 'Progress successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Progress: ${JSON.stringify(progress)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing Progress
/**
 * @param {tProgress} - Progress
 */
module.exports.updateProgress = async progress => {
	let data;
	try {
		await Progress.update(
			{
				crewName: progress.crewName,
				foreMan: progress.foreMan,
				manPower: progress.manPower,
				activity: progress.activity,
				stage: progress.stage,
				delay: progress.delay,
				cause: progress.cause,
				action: progress.action,
				resolution: progress.resolution,
				workType: progress.workType,
				workDescription: progress.workDescription,
				notes: progress.notes,
				lastProgress: progress.lastProgress,
				overallProgress: progress.overallProgress,
				head: progress.head
			},
			{
				where: { id: progress.id }
			}
		);
		logger.debug(`Progress successfully updated: ${JSON.stringify(progress)}`);
		data = { status: 200, message: 'Progress successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Progress: ${JSON.stringify(progress)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing Progress
module.exports.deleteProgress = async progressId => {
	let data;
	try {
		await Progress.destroy({
			where: { id: progressId }
		});
		logger.debug(`Progress successfully deleted: ${JSON.stringify(progressId)}`);
		data = { status: 200, message: 'Progress successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Progress: ${JSON.stringify(progressId)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
