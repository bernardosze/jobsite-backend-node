/**
 * General Application Logger Configuration
 * @author: Leonardo Otoni de Assis
 */
const log4js = require('log4js');
const { env } = require('./environment');

class AppLogger {
  /**
   * @param {log4js} logger
   */
  constructor(logger) {
    if (AppLogger.instance) {
      return AppLogger.instance;
    }
    AppLogger.instance = this;

    this.appender = {
      DEVELOPMENT: 'default',
      PRODUCTION: 'production',
      SERVER: 'server',
    };

    this.logger = logger;
    this.logger.configure({
      appenders: {
        file: {
          type: 'dateFile',
          filename: env.SERVER_LOG,
          keepFileExt: true,
          layout: { type: 'pattern', pattern: '[%d] [%p] %m' },
        },
        console: {
          type: 'console',
          layout: { type: 'pattern', pattern: '%[[%d] [%p]%] %m' },
        },
      },
      categories: {
        default: { appenders: ['console'], level: 'debug' },
        production: { appenders: ['file'], level: 'error' },
        server: { appenders: ['file'], level: 'info' },
      },
    });
  }

  /**
   * Server Logger. It must be used only by the Bootstrap services.
   */
  getServerLogger() {
    return env.isProduction
      ? this.logger.getLogger(this.appender.SERVER)
      : this.logger.getLogger(); // It uses default appender
  }

  /**
   * Default application logger. It must be used as the default logger.
   */
  getAppLogger() {
    return env.isProduction
      ? this.logger.getLogger(this.appender.PRODUCTION)
      : this.logger.getLogger(); // It uses default appender
  }
}

const instance = new AppLogger(log4js);

module.exports.logger = instance.getAppLogger();
module.exports.serverLogger = instance.getServerLogger();
module.exports.appLogger = instance;
