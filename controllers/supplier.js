/**
 * Supplier Controller.
 * @author: Sagrika Aggarwal.
 */
const { logger } = require('../config/logger');
const Supplier = require('../models/supplier');

const supplierFieldList = [
	'id',
	'name',
	'address',
	'city',
	'state',
	'country',
	'phone',
	'email',
	'personalName',
	'personalPosition',
	'personalEmail',
	'personalPhone',
	'paymentMethod',
	'termsOfPayment',
	'blocked',
	'notes'
];

// Fetch all supplier
module.exports.getSuppliers = async () => {
	let data;
	try {
		data = await Supplier.findAll({
			attributes: [...supplierFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Suppliers ${error}`);
		data = { status: '500', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a Supplier
module.exports.getSupplier = async supplierId => {
	let data;
	try {
		data = await Supplier.findOne({
			where: { id: supplierId },
			attributes: [...supplierFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a Supplier ${error}`);
		data = { status: '500', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new Supplier
module.exports.insertSupplier = async supplier => {
	let data;
	try {
		await Supplier.create(supplier);
		logger.debug(`Supplier successfully created: ${supplier}`);
		data = { status: 200, type: 'Success', message: 'Supplier successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Supplier: ${JSON.stringify(supplier)}`);
		logger.error(error);
		data = {
			status: 500,
			type: 'Exception',
			name: error.name,
			message: error.message
		};
	}
	return data;
};

// Update an existing Supplier
/**
 * @param {tSupplier} - supplier
 */
module.exports.updateSupplier = async supplier => {
	let data;
	try {
		await Supplier.update(
			{
				name: supplier.name,
				phone: supplier.phone,
				address: supplier.address,
				city: supplier.city,
				state: supplier.state,
				country: supplier.country,
				email: supplier.email,
				personalName: supplier.personalName,
				personalPosition: supplier.personalPosition,
				personalEmail: supplier.personalEmail,
				personalPhone: supplier.personalPhone,
				paymentMethod: supplier.paymentMethod,
				termsOfPayment: supplier.termsOfPayment,
				blocked: supplier.blocked,
				notes: supplier.notes
			},
			{
				where: { id: supplier.id }
			}
		);
		logger.debug(`Supplier successfully updated: ${JSON.stringify(supplier)}`);
		data = { status: 200, type: 'Success', message: 'Supplier successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Supplier: ${JSON.stringify(supplier)} -  ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing Supplier
module.exports.deleteSupplier = async supplierId => {
	let data;
	try {
		await Supplier.destroy({
			where: { id: supplierId }
		});
		logger.debug(`Supplier successfully deleted: ${JSON.stringify(supplierId)}`);
		data = { status: 200, message: 'Supplier successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Supplier: ${JSON.stringify(supplierId)} -  ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};
