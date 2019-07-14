const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');

const MaterialType = sequelize.define('materialTypes', {
	id: {
		type: Sequelize.INTEGER,
		field: 'id',
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	type: {
		type: Sequelize.STRING,
		field: 'typeName',
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Type name must be provided.'
			},
			len: {
				args: [3, 45],
				msg: 'Type name length must be between 3 and 100 characters.'
			}
		}
	}
});
module.exports = MaterialType;
