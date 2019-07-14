/**
 * User Model
 * @author: Bernardo Sze
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
	'users',
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
				notEmpty: { msg: 'Name must be provided.' },
				max: { args: [100], msg: 'Name cannot have more than 100 characters.' }
			}
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				max: { args: [45], msg: 'Customer email cannot have more than 45 characters.' },
				isEmail: true
			},
			unique: {
				name: 'email_UNIQUE',
				args: true,
				msg: 'Informed Customer email already in use. Choose another one.'
			}
		}
	},
	{
		indexes: [
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

module.exports = User;
