/**
 * Materials Request Model.
 * @author: Sagrika Aggarwal
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');
const Lot = require('../models/lot');
const Quote = require('../models/quote');

const RequestHeader = sequelize.define('mes_req_heads', {
	id: {
		type: Sequelize.INTEGER,
		field: 'id',
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	reporter: {
		type: Sequelize.STRING,
		field: 'reporter',
		defaultValue: 'Admin'
	},

	loteNumber: {
		type: Sequelize.STRING,
		field: 'loteNumber',
		defaultValue: 'Office Requested'
	},

	quoteNumber: {
		type: Sequelize.INTEGER,
		field: 'quoteNumber',
		defaultValue: 'Office Requested'
	},

	address: {
		type: Sequelize.STRING,
		field: 'address',
		validate: {
			len: {
				args: [1, 200],
				msg: 'Address should be less than 200 characters.'
			}
		}
	},

	userName: {
		type: Sequelize.STRING,
		field: 'userName',
		validate: {
			notEmpty: {
				msg: 'User name cannot be empty.'
			},
			max: {
				args: [100],
				msg: 'User name cannot have more than 500 characters.'
			}
		}
	},

	userDate: {
		type: Sequelize.DATE,
		field: 'userDate',
		defaultValue: Sequelize.NOW
	},

	//   mesReqId: {
	//     type: Sequelize.INTEGER,
	//     field: 'mesReqId',
	//   },

	activated: {
		type: Sequelize.BOOLEAN,
		field: 'activated',
		defaultValue: 1
	}
});

RequestHeader.sync();
module.exports = RequestHeader;
