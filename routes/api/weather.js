/**
 * Weather Report Routes for 'weather/' URL
 * @author Bernardo Sze
 */
const express = require('express');

const { logger } = require('../../config/logger');
const WeatherController = require('../../controllers/weather');

const router = express.Router();

/**
 * Build a complete Weather Report object from request body.
 * @param {express.Application.Request} req
 */
const getWeather = req => {
	const {
		id,
		quoteNumber,
		lotID,
		date,
		reporteeName,
		weatherCondition,
		windSpeed,
		temperatureMax,
		temperatureMin,
		forseenWorkTime,
		notes
	} = req.body;

	const weather = {
		id,
		quoteNumber,
		lotID,
		date,
		reporteeName,
		weatherCondition,
		windSpeed,
		temperatureMax,
		temperatureMin,
		forseenWorkTime,
		notes
	};

	return weather;
};

// @route   GET api/weather
// @desc    GET ALL weather reports
// @access  PRIVATE
router.get('/', async (req, res) => {
	logger.debug('[ GET ] API:/weather/');
	res.json(await WeatherController.getAllWeather());
});

// @route   GET api/weather/:id
// @desc    GET ALL weather reports BY quote number
// @access  PRIVATE
router.get('/:quoteNumber', async (req, res) => {
	logger.debug(`[ GET ] API:/weather/${req.params.quoteNumber}`);
	res.json(await WeatherController.getWeatherByQuoteNumber(req.params.quoteNumber));
});

// @route   GET api/weather/:id
// @desc    GET ALL weather reports BY quote number AND lot id
// @access  PRIVATE
router.get('/:quoteNumber/:lotID', async (req, res) => {
	logger.debug(`[ GET ] API:/weather/${req.params.quoteNumber}/${req.params.lotID}`);
	res.json(
		await WeatherController.getWeatherByQuoteNumberAndLotID(
			req.params.quoteNumber,
			req.params.lotID
		)
	);
});

// @route   GET api/weather/:id
// @desc    Get a weather report
// @access  PRIVATE
router.get('/:id', async (req, res) => {
	logger.debug(`[ GET ] API:/weather/${req.params.id}`);
	res.json(await WeatherController.getWeather(req.params.id));
});

// @route   POST api/weather
// @desc    Create a new weather
// @access  PRIVATE
router.post('/', async (req, res) => {
	logger.debug('[ POST ] API:/weather/');
	const weather = getWeather(req);
	res.json(await WeatherController.insertWeather(weather));
});

// @route   PUT api/weather
// @desc    Update a weather
// @access  PRIVATE
router.put('/', async (req, res) => {
	logger.debug('[ PUT ] API:/weather/');
	const weather = getWeather(req);
	res.json(await WeatherController.updateWeather(weather));
});

// @route   DELETE api/weather
// @desc    Delete a weather report by ID
// @access  PRIVATE
router.delete('/', async (req, res) => {
	const { weatherID } = req.body;
	logger.debug('[ DELETE ] API:/weather/');
	res.json(await WeatherController.deleteWeather(weatherID));
});

module.exports = router;
