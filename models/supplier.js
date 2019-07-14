/**
 * Supplier Model.
 * @author: Sagrika Aggarwal
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');

const Supplier = sequelize.define(
	'suppliers',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Supplier Name must be provided.' },
				len: { args: [3, 45], msg: 'Supplier Name length must be between 3 and 45 characters.' }
			}
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Address must be provided.' },
				len: { args: [0, 200], msg: 'Address cannot have more than 200 characters.' }
			}
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'City must be provided.' },
				max: { args: [45], msg: 'City cannot have more than 45 characters.' }
			}
		},
		state: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'State must be provided.' },
				max: { args: [45], msg: 'State cannot have more than 45 characters.' }
			}
		},
		country: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Country must be provided.' },
				max: { args: [45], msg: 'Country cannot have more than 45 characters.' }
			}
		},
		phone: {
			type: Sequelize.STRING,
			field: 'phone',
			allowNull: false,
			validate: {
				notEmpty: { msg: 'Supplier phone must be provided.' },
				isNumeric: true,
				len: {
					args: [11, 15],
					msg: 'Supplier Phone number must have at least 11 numeric characters.'
				}
			}
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				max: { args: [45], msg: 'Supplier email cannot have more than 45 characters.' },
				isEmail: true
			},
			unique: {
				name: 'email_UNIQUE',
				args: true,
				msg: 'Informed Supplier email already in use. Choose another one.'
			}
		},
		personalName: {
			type: Sequelize.STRING,
			field: 'personal_name',
			validate: {
				notEmpty: { msg: 'Personal Name must be provided.' },
				len: { args: [3, 45], msg: 'Personal Name length must be between 3 and 45 characters.' }
			}
		},
		personalPosition: {
			type: Sequelize.STRING,
			field: 'personal_position',
			validate: {
				notEmpty: { msg: 'Personal Position must be provided.' },
				max: { args: [45], msg: 'Personal Position cannot have more than 45 characters.' }
			}
		},
		personalEmail: {
			type: Sequelize.STRING,
			field: 'personal_email',
			validate: {
				max: { args: [45], msg: 'Personal Email cannot have more than 45 characters.' },
				isEmail: true
			},
			unique: {
				name: 'personal_email_UNIQUE',
				args: true,
				msg: 'Informed Personal email already in use. Choose another one.'
			}
		},
		personalPhone: {
			type: Sequelize.STRING,
			field: 'personal_phone',
			allowNull: true,
			validate: {
				isNumeric: { msg: 'Personal Phone number can contains only numeric characters.' },
				len: {
					args: [11, 15],
					msg: 'Personal Phone number must have at least 11 numeric characters.'
				}
			}
		},
		paymentMethod: {
			type: Sequelize.ENUM('Cheques', 'Cash', 'E-Transfer', 'Credit Card', 'Debit'),
			field: 'payment_method',
			allowNull: false,
			validate: {
				isIn: {
					args: [['Cheques', 'Cash', 'E-Transfer', 'Credit Card', 'Debit']],
					msg: 'Payment Method provided is not allowed.'
				}
			}
		},
		termsOfPayment: {
			type: Sequelize.INTEGER,
			field: 'terms_of_payment',
			validate: {
				isInt: { msg: 'Terms of Payment must be a valid integer number.' }
			}
		},
		blocked: {
			type: Sequelize.ENUM('Y', 'N'),
			defaultValue: 'N',
			validate: {
				isIn: {
					args: [['Y', 'N']],
					msg: 'Blocked field can oly set Y or N.'
				}
			}
		},
		notes: {
			type: Sequelize.STRING,
			validate: {
				// notEmpty: { msg: 'Notes if informed, cannot be empty.' },
				max: { args: [1000], msg: 'Notes cannot have more than 1000 characters.' }
			}
		}
	},
	{
		indexes: [
			{
				name: 'personal_email_UNIQUE',
				unique: true,
				fields: ['personal_email']
			},
			{
				name: 'email_UNIQUE',
				unique: true,
				fields: ['email']
			},
			{
				name: 'name_IDX',
				unique: false,
				fields: ['name']
			}
		]
	}
);

module.exports = Supplier;
