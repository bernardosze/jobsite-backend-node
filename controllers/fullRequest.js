/**
 * Full Request Controller.
 * @author: Sagrika Aggarwal.
 */
const { logger } = require('../config/logger');
const Request = require('../models/request');
const Header = require('../models/requestHeader');

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
		data = { status: 500, type: 'Exception', name: error.name, message: error.message };
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
				quantity
			},
			{
				where: { id }
			}
		);

		const { head } = await Request.findOne({
			where: { id },
			attributes: ['head'],
			raw: true
		});

		await Header.update(
			{
				quoteNumber,
				loteNumber,
				reporter,
				address
			},
			{
				where: { id: head }
			}
		);

		logger.debug(`Request successfully updated: ${JSON.stringify(mRequest)}`);
		data = { status: 200, type: 'Success', message: 'Request successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Request: ${JSON.stringify(mRequest)} -  ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};
