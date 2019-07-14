/**
 * Material Controller.
 * @author: Sagrika Aggarwal.
 */
const { logger } = require('../config/logger');
const Material = require('../models/material');

const materialFieldList = [
	'id',
	'description',
	'type',
	'units',
	'dimension',
	'quantity',
	'supplierId',
	'supplierName',
	'manufacturerName',
	'price',
	'notes',
	'userName',
	'userDate'
];

// Fetch all materials
module.exports.getMaterials = async () => {
	let data;
	try {
		data = await Material.findAll({
			attributes: [...materialFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Materials ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a Material
module.exports.getMaterial = async materialId => {
	let data;
	try {
		data = await Material.findOne({
			where: { id: materialId },
			attributes: [...materialFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a Material ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new Material
module.exports.insertMaterial = async material => {
	let data;
	try {
		await Material.create(material);
		logger.debug(`Material successfully created: ${material}`);
		data = { status: 200, message: 'Material successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Material: ${JSON.stringify(material)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing Material
/**
 * @param {tMaterial} - material
 */
module.exports.updateMaterial = async material => {
	let data;
	try {
		await Material.update(
			{
				name: material.name,
				phone: material.phone
			},
			{
				where: { id: material.id }
			}
		);
		logger.debug(`Material successfully updated: ${JSON.stringify(material)}`);
		data = { status: 200, message: 'Material successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Material: ${JSON.stringify(material)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing Material
module.exports.deleteMaterial = async materialId => {
	let data;
	try {
		await Material.destroy({
			where: { id: materialId }
		});
		logger.debug(`Material successfully deleted: ${JSON.stringify(materialId)}`);
		data = { status: 200, message: 'Material successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Material: ${JSON.stringify(materialId)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
