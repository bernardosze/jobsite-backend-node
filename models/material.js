/**
 * Supplier Model.
 * @author: Sagrika Aggarwal
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');
const Type = require('./materialType');
const Unit = require('./materialUnit');
const Supplier = require('../models/supplier');

const Material = sequelize.define('materials', {
	id: {
		type: Sequelize.INTEGER,
		field: 'id',
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	description: {
		type: Sequelize.STRING,
		field: 'description',
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Description must be provided.'
			},
			len: {
				args: [3, 100],
				msg: 'Description length must be between 3 and 100 characters.'
			}
		}
	},

	type: {
		type: Sequelize.STRING,
		field: 'type',
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'type must be provided.'
			}
		}
	},

	units: {
		type: Sequelize.INTEGER,
		field: 'units'
	},

	dimension: {
		type: Sequelize.STRING,
		field: 'dimension'
	},

	quantity: {
		type: Sequelize.STRING,
		field: 'quantity'
	},

	supplierId: {
		type: Sequelize.INTEGER,
		field: 'supplierID'
	},

	supplierName: {
		type: Sequelize.STRING,
		field: 'supplierName',
		validate: {
			notEmpty: {
				msg: 'Supplier Name must be provided.'
			},
			max: {
				args: [3, 100],
				msg: 'Supplier Name cannot have more than 45 characters.'
			}
		}
	},

	manufacturerName: {
		type: Sequelize.STRING,
		field: 'manufacturerName',
		validate: {
			max: {
				args: [100],
				msg: 'Manufacturer cannot have more than 100 characters.'
			}
		}
	},

	price: {
		type: Sequelize.STRING,
		field: 'price',
		allowNull: true,
		validate: {
			isNumeric: {
				msg: 'Price can only contain numeric value'
			},
			len: {
				args: [0, 15],
				msg: 'Price can only contain numeric value upto 15 digits'
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
	}
});

Material.belongsTo(Type, {
	foreignKey: 'type'
});

Material.belongsTo(Unit, {
	foreignKey: 'units'
});

Material.belongsTo(Supplier, {
	foreignKey: 'supplierid'
});

module.exports = Material;
