/**
 * Lot ID Model
 * @author: Bernardo Sze
 */
const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');
const Quote = require('../models/quote');

const Lot = sequelize.define(
	'lot_numbers',
	{
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
			primaryKey: true,
			validate: {
				notEmpty: { msg: 'Quote Number must be provided.' },
				max: { args: [10000], msg: 'Quote Number cannot have more than 10000 characters.' }
			},
			references: {
				model: Quote,
				key: 'quoteNumber'
			}
		},
		lotID: {
			type: Sequelize.STRING,
			field: 'lot_id',
			allowNull: false,
			primaryKey: true,
			validate: {
				notEmpty: { msg: 'Lot ID must be provided.' },
				max: { args: [1000], msg: 'Lot ID cannot have more than 1000 characters.' }
			}
		},
		userName: {
			type: Sequelize.STRING,
			field: 'user_name'
		},
		userDate: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'user_date'
		}
	},
	{
		indexes: [
			{
				name: 'quote_number_lot_id_UNIQUE',
				unique: true,
				fields: ['quote_number', 'lot_id']
			}
		]
	}
);

Lot.belongsTo(Quote, { foreignKey: 'quoteNumber', targetKey: 'quoteNumber' });

module.exports = Lot;
