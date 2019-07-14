/**
 * Lot ID Controller.
 * @author: Bernardo Sze.
 */
const { logger } = require('../config/logger');
const Lot = require('../models/lot');

const lotFieldList = ['id', 'quoteNumber', 'lotID', 'userName', 'userDate'];

// Fetch all lots
module.exports.getLots = async () => {
	let data;
	try {
		data = await Lot.findAll({
			attributes: [...lotFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Lot ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch all lots by quote
module.exports.getLotsByQuote = async quoteNumber => {
	let data;
	try {
		data = await Lot.findAll({
			where: { quoteNumber },
			attributes: [...lotFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a lot ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a quote
module.exports.getLot = async (quoteNumber, lotID) => {
	let data;
	try {
		data = await Lot.findOne({
			where: { quoteNumber, lotID },
			attributes: [...lotFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a lot ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new lot
module.exports.insertLot = async lot => {
	let data;
	try {
		await Lot.create(lot);
		logger.debug(`Lot successfully created: ${lot}`);
		data = { status: 200, message: 'Lot successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Quote: ${JSON.stringify(lot)}`);
		logger.error(error);
		data = { status: 500, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing quote
/**
 * @param {Quote} - quote
 */
module.exports.updateLot = async lot => {
	let data;
	try {
		await Lot.update(
			{
				lotID: lot.lotID
			},
			{
				where: { id: lot.id }
			}
		);
		logger.debug(`Lot successfully updated: ${JSON.stringify(lot)}`);
		data = { status: 200, message: 'Lot successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Lot: ${JSON.stringify(lot)} -  ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing lot
module.exports.deleteLot = async id => {
	let data;
	try {
		await Lot.destroy({
			where: { id }
		});
		logger.debug(`Lot successfully deleted: ${JSON.stringify(id)}`);
		data = { status: 200, message: 'Lot successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Quote: ${JSON.stringify(id)} -  ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};
