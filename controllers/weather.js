/**
 * Weather Report Controller.
 * @author: Bernardo Sze.
 */
const { logger } = require('../config/logger');
const Weather = require('../models/weather');

const weatherFieldList = [
	'id',
	'quoteNumber',
	'lotID',
	'date',
	'reporteeName',
	'weatherCondition',
	'windSpeed',
	'temperatureMax',
	'temperatureMin',
	'forseenWorkTime',
	'notes'
];

// Fetch all weather reports
module.exports.getAllWeather = async () => {
	let data;
	try {
		data = await Weather.findAll({
			attributes: [...weatherFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching weather reports ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a weather report
module.exports.getWeatherByQuoteNumber = async quoteNumber => {
	let data;
	try {
		data = await Weather.findAll({
			where: { quoteNumber },
			attributes: [...weatherFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a weather report ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a weather report
module.exports.getWeatherByQuoteNumberAndLotID = async (quoteNumber, lotID) => {
	let data;
	try {
		data = await Weather.findAll({
			where: { quoteNumber, lotID },
			attributes: [...weatherFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a weather report ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a weather report
module.exports.getWeather = async weatherID => {
	let data;
	try {
		data = await Weather.findOne({
			where: { id: weatherID },
			attributes: [...weatherFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a weather report ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new weather report
module.exports.insertWeather = async weather => {
	let data;
	try {
		await Weather.create(weather);
		logger.debug(`Weather Report successfully created: ${weather}`);
		data = { status: 200, message: 'Weather Report successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a weather report: ${JSON.stringify(weather)}`);
		logger.error(error);
		data = { status: 500, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing weather report
module.exports.updateWeather = async weather => {
	let data;
	try {
		await Weather.update(
			{
				reporteeName: weather.reporteeName,
				weatherCondition: weather.weatherCondition,
				windSpeed: weather.windSpeed,
				temperatureMax: weather.temperatureMax,
				temperatureMin: weather.temperatureMin,
				forseenWorkTime: weather.forseenWorkTime,
				notes: weather.notes
			},
			{
				where: { id: weather.id }
			}
		);
		logger.debug(`Weather Report successfully updated: ${JSON.stringify(weather)}`);
		data = { status: 200, message: 'Weather Report successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a weather report: ${JSON.stringify(weather)} -  ${error}`);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing weather report
module.exports.deleteWeather = async weatherID => {
	let data;
	try {
		await Weather.destroy({
			where: { id: weatherID }
		});
		logger.debug(`Weather Report successfully deleted: ${JSON.stringify(weatherID)}`);
		data = { status: 200, message: 'Weather report successfully deleted.' };
	} catch (error) {
		logger.error(
			`Error trying to delete a weather report: ${JSON.stringify(weatherID)} -  ${error}`
		);
		data = { status: 500, type: 'Exception', message: error.message };
	}
	return data;
};
