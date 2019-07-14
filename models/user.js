/**
 * User Model
 * @author: Bernardo Sze
 */

const Sequelize = require('sequelize/index');
const sequelize = require('../config/database');


const User = sequelize.define('user', {

  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },


  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: { args: [5, 45], msg: 'Customer email cannot have more than 45 characters.' },
      isEmail: true,
    },
    unique: {
      name: 'email_UNIQUE',
      msg: 'Informed email already in use. Choose another one.',
    },
  },
  password: {
    type: Sequelize.STRING,
    field: 'password',
    allowNull: false,
  },

  role: {
    type: Sequelize.STRING,
    field: 'role',
    allowNull: true,
  },

},
{
  indexes: [
    {
      name: 'email_UNIQUE',
      unique: true,
      fields: ['email'],
    },
    {
      name: 'name_IDX',
      unique: false,
      fields: ['name'],
    },
  ],
});

User.sync();
module.exports = User;
