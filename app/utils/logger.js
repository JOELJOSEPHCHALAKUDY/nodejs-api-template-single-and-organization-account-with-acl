const winston = require("winston");
const moment = require('moment');
const level = process.env.LOG_LEVEL || 'deb';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

/* Log levels 
{ 
  emerg: 0, 
  alert: 1, 
  crit: 2, 
  error: 3, 
  warning: 4, 
  notice: 5, 
  info: 6, 
  debug: 7
}
*/ 

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: combine(
        timestamp(),
        format.splat(),
        format.simple()
      ),
    })
  ],
  exitOnError: false
});

module.exports = logger;