/**
 * Repair Model
 * @author: Bernardo Sze
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Repair = sequelize.define('repairs', {
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
	userName: {
		type: Sequelize.STRING,
		field: 'user_name',
		allowNull: true
	},
	userDate: {
		type: Sequelize.DATE,
		field: 'user_date',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: true
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Description must be provided.' },
			max: { args: [100], msg: 'Description cannot have more than 100 characters.' }
		}
	},
	activaded: {
		type: Sequelize.ENUM('Y', 'N'),
		defaultValue: 'N',
		validate: {
			isIn: {
				args: [['Y', 'N']],
				msg: 'Activaded field can oly set Y or N.'
			},
			notEmpty: { msg: 'Activaded must be provided.' }
		}
	},
	stage: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Stage must be provided.' },
			max: { args: [100], msg: 'Stage cannot have more than 100 characters.' }
		}
	},
	activity: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Activity must be provided.' },
			max: { args: [100], msg: 'Activity cannot have more than 100 characters.' }
		}
	},
	workType: {
		type: Sequelize.STRING,
		field: 'work_type',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Work Type must be provided.' },
			max: { args: [100], msg: 'Work Type cannot have more than 100 characters.' }
		}
	},
	needItBy: {
		type: Sequelize.DATE,
		field: 'need_it_by',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Need It By must be provided.' }
		}
	},
	repairBy: {
		type: Sequelize.STRING,
		field: 'repair_by',
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Repair By must be provided.' },
			max: { args: [100], msg: 'Repair By cannot have more than 100 characters.' }
		}
	},
	notes: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: { msg: 'Notes must be provided.' },
			max: { args: [510], msg: 'Notes cannot have more than 510 characters.' }
		}
	},
	poNumber: {
		type: Sequelize.STRING,
		field: 'po_number',
		allowNull: false,
		validate: {
			max: { args: [45], msg: 'PO Number cannot have more than 45 characters.' }
		}
	},
	poDate: {
		type: Sequelize.DATE,
		field: 'po_date',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: true
	},
	blocked: {
		type: Sequelize.ENUM('Y', 'N'),
		defaultValue: 'N',
		validate: {
			isIn: {
				args: [['Y', 'N']],
				msg: 'Blocked field can oly set Y or N.'
			},
			notEmpty: { msg: 'Blocked must be provided.' }
		}
	}
});

module.exports = Repair;
