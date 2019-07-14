const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');

const MaterialUnit = sequelize.define('materialUnits', {
	id: {
		type: Sequelize.INTEGER,
		field: 'id',
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	unit: {
		type: Sequelize.STRING,
		field: 'unit',
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Type name must be provided.'
			},
			len: {
				args: [1, 5],
				msg: 'Type name length must be between 1 and 100 characters.'
			}
		}
	}
});

module.exports = MaterialUnit;
