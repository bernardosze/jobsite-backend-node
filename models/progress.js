/**
 * Progress Model.
 * @author: Sagrika Aggarwal
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');
const Lot = require('../models/lot');

const Progress = sequelize.define('progress', {
	id: {
		type: Sequelize.INTEGER,
		field: 'id',
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	crewName: {
		type: Sequelize.STRING,
		field: 'crewname',
		allowNull: false
	},

	foreMan: {
		type: Sequelize.STRING,
		field: 'foreMan',
		allowNull: false
	},

	manPower: {
		type: Sequelize.INTEGER,
		field: 'manPower',
		allowNull: false
	},

	workArea: {
		type: Sequelize.STRING,
		field: 'workArea'
	},

	workDescription: {
		type: Sequelize.STRING,
		field: 'workDescription'
	},
	activity: {
		type: Sequelize.STRING,
		field: 'activity',
		allowNull: false
	},

	stage: {
		type: Sequelize.STRING,
		field: 'stage',
		allowNull: false
	},

	head: {
		type: Sequelize.INTEGER,
		field: 'head',
		allowNull: false,
		references: {
			model: Lot,
			key: 'id'
		}
	},
	lastProgress: {
		type: Sequelize.INTEGER,
		field: 'lastProgress',
		allowNull: false
	},

	overallProgress: {
		type: Sequelize.INTEGER,
		field: 'overallProgress',
		allowNull: false
	},

	notes: {
		type: Sequelize.STRING,
		field: 'notes',
		validate: {
			len: {
				args: [0, 500],
				msg: 'Notes cannot have more than 500 characters.'
			}
		}
	},

	delay: {
		type: Sequelize.BOOLEAN,
		field: 'delay',
		allowNull: false,
		defaultValues: 0
	},

	cause: {
		type: Sequelize.STRING,
		field: 'cause',
		validate: {
			len: {
				args: [0, 500],
				msg: 'Cause cannot have more than 500 characters.'
			}
		}
	},
	action: {
		type: Sequelize.STRING,
		field: 'action',
		validate: {
			len: {
				args: [0, 500],
				msg: 'Action cannot have more than 500 characters.'
			}
		}
	},

	resolution: {
		type: Sequelize.STRING,
		field: 'resolution',
		validate: {
			len: {
				args: [0, 500],
				msg: 'Resolution cannot have more than 500 characters.'
			}
		}
	}
});

Progress.belongsTo(Lot, { foreignKey: 'head' });
Lot.hasMany(Progress, { foreignKey: 'head' });
Progress.sync();
module.exports = Progress;
