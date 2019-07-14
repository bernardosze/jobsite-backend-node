/**
 * Material Controller.
 * @author: Sagrika Aggarwal.
 */
const { logger } = require('../config/logger');
const Request = require('../models/request');
const Header = require('../models/requestHeader');
const Material = require('../models/material');

const requestFieldList = [
	'id',
	'activity',
	'head',
	'requirementDescription',
	'workType',
	'type',
	'dueDate',
	'purchaseOrderId',
	'purchaseOrderDate',
	'notes',
	'userName',
	'userDate',
	'blocked',
	'stage',
	'quantity',
	'units',
	'dimension',
	'date'
];

// Fetch all Requests
module.exports.getRequests = async () => {
	let data;
	try {
		data = await Request.findAll({
			attributes: [...requestFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Requests ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch all Requests And Header
module.exports.getRequestandHeader = async () => {
	let data;
	try {
		data = await Request.findAll({
			attributes: [...requestFieldList],
			include: [Header]
		});
	} catch (error) {
		logger.error(`Error fetching Requests ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a Request
module.exports.getRequest = async requestId => {
	let data;
	try {
		data = await Request.findOne({
			where: { id: requestId },
			attributes: [...requestFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a Request ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a Request and Header by ID
module.exports.getRequestandHeaderbyId = async requestId => {
	let data;
	try {
		data = await Request.findOne({
			where: { id: requestId },
			attributes: [...requestFieldList],
			include: [Header]
		});
	} catch (error) {
		logger.error(`Error fetching a Request ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new Requests
module.exports.insertRequest = async mRequest => {
	let data;
	try {
		await Request.create(mRequest);
		logger.debug(`Request successfully created: ${mRequest}`);
		data = { status: 200, message: 'Request successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Request: ${JSON.stringify(mRequest)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Create a new Requests and Header
module.exports.insertRequestandHeader = async mRequest => {
	let data;
	try {
		const {
			activity,
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
			units,
			dimension,
			quoteNumber,
			loteNumber,
			reporter,
			date,
			address,
			stage,
			activated,
			quantity
		} = mRequest;

		await Header.create(
			{
				quoteNumber,
				loteNumber,
				address,
				reporter,
				userName,
				userDate,
				activated: true,

				mes_requirements: {
					activity,
					stage,
					requirementDescription,
					workType,
					type,
					dueDate,
					purchaseOrderId,
					purchaseOrderDate,
					notes,
					quantity,
					units,
					dimension,
					userName,
					userDate,
					date,
					blocked: true
				}
			},
			{
				include: [Request]
			}
		);

		logger.debug(`Request successfully created: ${mRequest}`);
		data = { status: 200, message: 'Request successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Request: ${JSON.stringify(mRequest)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing Request
/**
 * @param {tRequest} - Request
 */
module.exports.updateRequest = async mRequest => {
	let data;
	try {
		await Request.update(
			{
				activity: mRequest.activity,
				head: mRequest.head,
				requirementDescription: mRequest.requirementDescription,
				workType: mRequest.workType,
				type: mRequest.type,
				dueDate: mRequest.dueDate,
				purchaseOrderId: mRequest.purchaseOrderId,
				purchaseOrderDate: mRequest.purchaseOrderDate,
				notes: mRequest.notes,
				userName: mRequest.userName,
				userDate: mRequest.userDate,
				blocked: mRequest.blocked
			},
			{
				where: { id: mRequest.id }
			}
		);
		logger.debug(`Request successfully updated: ${JSON.stringify(mRequest)}`);
		data = { status: 200, message: 'Request successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Request: ${JSON.stringify(mRequest)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Update an existing Request and Header
/**
 * @param {tRequest} - Request
 */
module.exports.updateRequestandHeader = async mRequest => {
	let data;
	const {
		id,
		reporter,
		loteNumber,
		quoteNumber,
		address,
		userName,
		userDate,
		activated,
		activity,
		requirementDescription,
		workType,
		type,
		dueDate,
		purchaseOrderId,
		purchaseOrderDate,
		notes,
		blocked,
		quantity,
		stage,
		units,
		dimension,
		date
	} = mRequest;

	console.log(mRequest);

	try {
		await Request.update(
			{
				activity,
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
				units,
				dimension,
				date,
				stage,
				activated,
				quantity,
				mes_req_head: {
					quoteNumber,
					loteNumber,
					reporter,
					address
				}
			},
			{
				where: { id }
			},
			{
				include: [Header]
			}
		);
		logger.debug(`Request successfully updated: ${JSON.stringify(mRequest)}`);
		data = { status: 200, message: 'Request successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Request: ${JSON.stringify(mRequest)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing Request
module.exports.deleteRequest = async requestId => {
	let data;
	try {
		await Request.destroy({
			where: { id: requestId }
		});
		logger.debug(`Request successfully deleted: ${JSON.stringify(requestId)}`);
		data = { status: 200, message: 'Request successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Request: ${JSON.stringify(requestId)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
