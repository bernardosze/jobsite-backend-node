/**
 * Materials Request Model.
 * @author: Sagrika Aggarwal
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');
const Material = require('../models/material');
const RequestHeader = require('../models/requestHeader');

const MesRequirements = sequelize.define('mes_requirements', {
	id: {
		type: Sequelize.INTEGER,
		field: 'id',
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	activity: {
		type: Sequelize.STRING,
		field: 'activity'
	},

	stage: {
		type: Sequelize.STRING,
		field: 'stage'
	},

	head: {
		type: Sequelize.INTEGER,
		field: 'head',
		references: {
			model: RequestHeader,
			key: 'id'
		}
	},

	requirementDescription: {
		type: Sequelize.STRING,
		field: 'requirementDescription',
		references: {
			model: Material,
			key: 'description'
		}
	},

	quantity: {
		type: Sequelize.STRING,
		field: 'quantity',
		require: true
	},

	units: {
		type: Sequelize.STRING,
		field: 'units'
	},

	dimension: {
		type: Sequelize.STRING,
		field: 'dimension'
	},
	type: {
		type: Sequelize.STRING,
		field: 'type'
	},

	workType: {
		type: Sequelize.STRING,
		field: 'workType'
	},

	dueDate: {
		type: Sequelize.DATE,
		field: 'dueDate',
		defaultValue: Sequelize.NOW
	},
	date: {
		type: Sequelize.DATE,
		field: 'date'
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

	notes: {
		type: Sequelize.STRING,
		field: 'notes',
		validate: {
			max: {
				args: [500],
				msg: 'Notes cannot have more than 500 characters.'
			}
		}
	},

	blocked: {
		type: Sequelize.BOOLEAN,
		field: 'blocked'
	},

	purchaseOrderId: {
		type: Sequelize.INTEGER,
		field: 'purchaseOrderId'
	},
	purchaseOrderDate: {
		type: Sequelize.DATE,
		field: 'purchaseOrderDate'
	}
});

MesRequirements.belongsTo(RequestHeader, { foreignKey: 'head' });
MesRequirements.belongsTo(Material, { foreignKey: 'requirementDescription' });
RequestHeader.hasMany(MesRequirements, { foreignKey: 'head' });
MesRequirements.sync();
module.exports = MesRequirements;
