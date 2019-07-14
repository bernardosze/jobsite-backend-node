/**
 * Checks the application Setup and block server initialization if find problems.
 * If everething is ok, it publish a Setup Object to be used by the Application.
 *
 * @author Leonardo Otoni de Assis
 */

const path = require('path');
/**
 * Parameter that instruct dotenv.config() how to find .env file:
 * { path: `${path.join(__dirname, '../', '.env')}` }
 */
require('dotenv').config();
const Joi = require('@hapi/joi');

/**
 * Application Config Class.
 * Implements Singleton Pattern
 */
class Config {
  constructor() {
    if (Config.instance) {
      return Config.instance;
    }

    Config.instance = this;

    // Schema to validate external data
    this.setupSchema = Joi.object().keys({
      NODE_ENV: Joi.string().allow(['development', 'production', 'staging']).required(),
      SERVER_PORT: Joi.number().integer().min(1024).max(65535),
      SERVER_LOG: Joi.string().required(),
      APP_PATH: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().integer().min(1024).max(65535),
      DB_SCHEMA: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      AUTH0_CLIENT_ID: Joi.string().required(),
      AUTH0_DOMAIN: Joi.string().required(),
      AUTH0_CLIENT_SECRET: Joi.string().required(),
      AUTH0_CALLBACK_URL: Joi.string().required(),
      isProduction: Joi.boolean(),
    });

    // Object containing external data. It must be validated.
    this.envVars = {
      NODE_ENV: process.env.NODE_ENV,
      SERVER_PORT: process.env.SERVER_PORT,
      SERVER_LOG: process.env.SERVER_LOG,
      APP_PATH: path.join(__dirname, '/../'),
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_SCHEMA: process.env.DB_SCHEMA,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
      isProduction: process.env.NODE_ENV === 'production',
    };
  }

  async validate() {
    const result = Joi.validate(this.envVars, this.setupSchema);
    return { isValid: result.error === null, message: result.error };
  }
}

// const instance = new Config();
// module.exports.env = instance;
const instance = new Config();
module.exports.appConfig = instance;
module.exports.env = instance.envVars;
