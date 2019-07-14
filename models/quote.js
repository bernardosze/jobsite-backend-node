/**
 * Quote Model
 * @author: Bernardo Sze
 */
const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');
const Customer = require('../models/customer');

const Quote = sequelize.define(
	'quote_numbers',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		quoteNumber: {
			type: Sequelize.INTEGER,
			field: 'quote_number',
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Quote Number must be provided.' },
				max: { args: [100], msg: 'Quote Number cannot have more than 100 characters.' }
			},
			unique: {
				name: 'quoteNumber_UNIQUE',
				args: true,
				msg: 'Informed Quote Number already in use. Choose another one.'
			}
		},
		customerName: {
			type: Sequelize.STRING,
			field: 'customer_name',
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Name must be provided.' },
				len: { args: [3, 45], msg: 'Name length must be between 3 and 45 characters.' }
			},
			references: {
				model: Customer,
				key: 'name'
			}
		},
		projectAddress: {
			type: Sequelize.STRING,
			field: 'project_address',
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Address must be provided.' },
				len: { args: [2, 100], msg: 'Address cannot have more than 100 characters.' }
			}
		},
		projectType: {
			type: Sequelize.ENUM('New Construction', 'Addition', 'Renovation', 'Verify'),
			field: 'project_type',
			allowNull: false,
			validate: {
				isIn: {
					args: [['New Construction', 'Addition', 'Renovation', 'Verify']],
					msg: 'Project Type provided is not allowed.'
				}
			}
		},
		quoteStage: {
			type: Sequelize.ENUM(
				'Demo-Framing',
				'Demo-Excavation-Framing',
				'Demo-Excavation-Foundation-Framing',
				'Demo-Foundation-Framing',
				'Excavation-Foundation-Framing',
				'Foundation-Framing',
				'Framing Only',
				'Verify'
			),
			field: 'quote_stage',
			allowNull: false,
			validate: {
				isIn: {
					args: [
						[
							'Demo-Framing',
							'Demo-Excavation-Framing',
							'Demo-Excavation-Foundation-Framing',
							'Demo-Foundation-Framing',
							'Excavation-Foundation-Framing',
							'Foundation-Framing',
							'Framing Only',
							'Verify'
						]
					],
					msg: 'Quote State provided is not allowed.'
				}
			}
		},
		estimatedStartDate: {
			type: Sequelize.DATE,
			field: 'estimated_start_date',
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Estimate Start Date must be provided.' }
			}
		},
		requestedQuoteDate: {
			type: Sequelize.DATE,
			field: 'requested_quote_date',
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Requested Quote Date must be provided.' }
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
				name: 'quote_number_UNIQUE',
				unique: true,
				fields: ['quote_number']
			}
		]
	}
);
Quote.belongsTo(Customer, { foreignKey: 'customerName' });

module.exports = Quote;
