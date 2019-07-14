/**
 * Repair Controller.
 * @author: Bernardo Sze.
 */
const { logger } = require('../config/logger');
const Repair = require('../models/repair');

const repairFieldList = [
	'id',
	'quote_number',
	'lot_id',
	'user_name',
	'user_date',
	'description',
	'activaded',
	'stage',
	'activity',
	'work_type',
	'need_it_by',
	'repair_by',
	'notes',
	'po_number',
	'po_date',
	'blocked'
];

// Fetch all repairs
module.exports.getRepairs = async () => {
	let data;
	try {
		data = await Repair.findAll({
			attributes: [...repairFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Repairs ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a quote
module.exports.getRepair = async repairID => {
	let data;
	try {
		data = await Repair.findOne({
			where: { id: repairID },
			attributes: [...repairFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a repair ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new repair
module.exports.insertRepair = async repair => {
	let data;
	try {
		await Repair.create(repair);
		logger.debug(`Repair successfully created: ${repair}`);
		data = { status: 200, message: 'Repair successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Repair: ${JSON.stringify(repair)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing repair
module.exports.updateQuote = async repair => {
	let data;
	try {
		await Repair.update(
			{
				description: repair.description,
				activaded: repair.activaded,
				stage: repair.stage,
				actvity: repair.actvity,
				work_type: repair.workType,
				need_it_by: repair.needItBy,
				repair_by: repair.repairBy,
				notes: repair.notes,
				blocked: repair.blocked
			},
			{
				where: { id: repair.id }
			}
		);
		logger.debug(`Repair successfully updated: ${JSON.stringify(repair)}`);
		data = { status: 200, message: 'Repair successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Repair: ${JSON.stringify(repair)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing repair
module.exports.deleteRepair = async repairID => {
	let data;
	try {
		await Repair.destroy({
			where: { id: repairID }
		});
		logger.debug(`Repair successfully deleted: ${JSON.stringify(repairID)}`);
		data = { status: 200, message: 'Repair successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Repair: ${JSON.stringify(repairID)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
