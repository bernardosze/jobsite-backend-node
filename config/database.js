/**
 * Database file that provides a database connection pool for all application.
 * @author: Leonardo Otoni;
 */
const Sequelize = require('sequelize/index'); // must use "/index" as a workaround to autocomplete for es6
const { logger } = require('./logger');

const { env } = require('./environment');

// Custom function to log Sequelize operations through the Application Logger
const defaultLogger = (msg) => {
  logger.debug(`<Sequelize> - ${msg}`);
};

const sequelize = new Sequelize(env.DB_SCHEMA, env.DB_USERNAME, env.DB_PASSWORD, {
  dialect: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  pool: {
    min: 1,
    max: 5,
  },
  logging: defaultLogger,
  timezone: 'America/Toronto',
  // global model definitions
  define: {
    freezeTableName: true,
    timestamps: true, // createAt and updateAt columns
    version: true, // optimistic locking (version column)
  },
});

module.exports = sequelize;
