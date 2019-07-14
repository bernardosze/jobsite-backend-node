/**
 * Header Controller.
 * @author: Sagrika Aggarwal.
 */
const { logger } = require('../config/logger');
const Header = require('../models/requestHeader');
const Request = require('../models/request');

const headerFieldList = [
	'id',
	'reporter',
	'loteNumber',
	'quoteNumber',
	'address',
	'userName',
	'userDate',
	'activated'
];

// Fetch all Headers
module.exports.getHeaders = async () => {
	let data;
	try {
		data = await Header.findAll({
			attributes: [...headerFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Headers ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

module.exports.getRequestandHeader = async () => {
	let data;

	try {
		data = await Header.findAll({
			include: [Request],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Requests ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a Header
module.exports.getHeader = async headerId => {
	let data;
	try {
		data = await Header.findOne({
			where: { id: headerId },
			attributes: [...headerFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a Header ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new Headers
module.exports.insertHeader = async mHeader => {
	let data;
	try {
		await Header.create(mHeader);
		logger.debug(`Header successfully created: ${mHeader}`);
		data = { status: 200, message: 'Header successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Header: ${JSON.stringify(mHeader)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing Header
/**
 * @param {tHeader} - Header
 */
module.exports.updateHeader = async header => {
	let data;
	try {
		await Header.update(
			{
				reporter: header.reporter,
				loteNumber: header.loteNumber,
				quoteNumber: header.quoteNumber,
				address: header.address,
				userName: header.userName,
				userDate: header.userDate,
				activated: header.activated
			},
			{
				where: { id: header.id }
			}
		);
		logger.debug(`Header successfully updated: ${JSON.stringify(header)}`);
		data = { status: 200, message: 'Header successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Header: ${JSON.stringify(header)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing Header
module.exports.deleteHeader = async headerId => {
	let data;
	try {
		await Header.destroy({
			where: { id: headerId }
		});
		logger.debug(`Header successfully deleted: ${JSON.stringify(headerId)}`);
		data = { status: 200, message: 'Header successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Header: ${JSON.stringify(headerId)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
