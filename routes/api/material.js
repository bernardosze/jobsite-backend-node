/**
 * Material Routes for 'material/' URL
 * @author Sagrika Aggarwal
 */
const express = require('express');

const { logger } = require('../../config/logger');
const MaterialController = require('../../controllers/material');

const router = express.Router();

/**
 * Build a complete Material object from request body.
 * @param {express.Application.Request} req
 */
const getMaterial = req => {
	const {
		id,
		description,
		type,
		units,
		dimension,
		quantity,
		supplierId,
		supplierName,
		manufacturerName,
		price,
		notes,
		userName,
		userDate
	} = req.body;

	const material = {
		id,
		description,
		type,
		units,
		dimension,
		quantity,
		supplierId,
		supplierName,
		manufacturerName,
		price,
		notes,
		userName,
		userDate
	};

	return material;
};

// Get All Materials
router.get('/', async (req, res) => {
	logger.debug('[ Get ] API:/material/');
	res.json(await MaterialController.getMaterials());
});

// Get Material by id
router.get('/:id', async (req, res) => {
	logger.debug(`[ Get ] API:/material/${req.params.id}`);
	res.json(await MaterialController.getMaterial(req.params.id));
});

// Create a new material
router.post('/', async (req, res) => {
	logger.debug('[ Post ] API:/material/');
	const material = getMaterial(req);
	res.json(await MaterialController.insertMaterial(material));
});

// Update Material by id
router.put('/', async (req, res) => {
	logger.debug('[ Put ] API:/material/');
	const material = getMaterial(req);
	res.json(await MaterialController.updateMaterial(material));
});

// Remove a Material by id
router.delete('/', async (req, res) => {
	const { id } = req.body;
	logger.debug('[ Delete ] API:/material/');
	res.json(await MaterialController.deleteMaterial(id));
});

module.exports = router;
