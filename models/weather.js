/**
 * Weather Report Model
 * @author: Bernardo Sze
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Weather = sequelize.define('weather', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	quoteNumber: {
		type: Sequelize.STRING,
		field: 'quote_number',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Quote Number must be provided.' },
			max: { args: [10000], msg: 'Quote Number cannot have more than 10000 characters.' }
		}
	},
	lotID: {
		type: Sequelize.STRING,
		field: 'lot_id',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Lot ID must be provided.' },
			max: { args: [1000], msg: 'Lot ID cannot have more than 1000 characters.' }
		}
	},
	date: {
		type: Sequelize.DATE,
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Date must be provided.' }
		}
	},
	reporteeName: {
		type: Sequelize.STRING,
		field: 'reportee_name',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Reportee Name must be provided.' }
		}
	},
	weatherCondition: {
		type: Sequelize.ENUM(
			'Clear',
			'Sunny',
			'Partly Cloudy',
			'Cloudy',
			'Rainy',
			'Snowy',
			'Sleeting',
			'Stormy',
			'Lightning',
			'Thunder',
			'Hailing',
			'Windy',
			'Foggy',
			'Icy',
			'Other'
		),
		field: 'weather_condition',
		validate: {
			isIn: {
				args: [
					[
						'Clear',
						'Sunny',
						'Partly Cloudy',
						'Cloudy',
						'Rainy',
						'Snowy',
						'Sleeting',
						'Stormy',
						'Lightning',
						'Thunder',
						'Hailing',
						'Windy',
						'Foggy',
						'Icy',
						'Other'
					]
				],
				msg: 'Weather Condition provided is not allowed.'
			}
		}
	},
	windSpeed: {
		type: Sequelize.STRING,
		field: 'wind_speed',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Wind Speed must be provided.' },
			max: { args: [50], msg: 'Wind Speed cannot have more than 50 characters.' }
		}
	},
	temperatureMax: {
		type: Sequelize.STRING,
		field: 'temperature_max',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Max Temperature must be provided.' }
		}
	},
	temperatureMin: {
		type: Sequelize.STRING,
		field: 'temperature_min',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Min Temperature must be provided.' }
		}
	},
	forseenWorkTime: {
		type: Sequelize.ENUM('Full Day', 'Half Day', 'Missed Day', 'Undecided'),
		field: 'forseen_work_time',
		allowNull: false,
		validate: {
			isIn: {
				args: [['Full Day', 'Half Day', 'Missed Day', 'Undecided']],
				msg: 'Forseen Work Time provided is not allowed.'
			}
		}
	},
	notes: {
		type: Sequelize.STRING,
		validate: {
			max: { args: [1000], msg: 'Notes cannot have more than 1000 characters.' }
		}
	}
});

module.exports = Weather;
