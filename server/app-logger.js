/*
 * Copyright (c) 2019.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

// set up access log
const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const morgan = require('morgan');

const logDir = '/var/log/tagger';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const options = {
  file: {
    level: 'info',
    filename: `${logDir}/access-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    handleExceptions: true,
    json: false,
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.level}: ${info.message}`))
  },
  error: {
    level: 'error',
    filename: `${logDir}/error-%DATE%.log`,
    datePattern: 'YYYY-MM',
    maxFiles: '10',
    zippedArchive: true,
    handleExceptions: true,
    json: false,
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`))
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const dailyRotateAccessFileTransport = new transports.DailyRotateFile(options.file);
const dailyRotateErrorFileTransport = new transports.DailyRotateFile(options.error);

/**
 * Defines the logger used for errors (e.g. 500).
 */
const errorLogger = createLogger({
  transports: [
    dailyRotateErrorFileTransport,
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions)
});

errorLogger.on('error', (err) => {
  console.log(err) // The logger itself can emit errors. Handle these here with simple console log.
});

/**
 * Morgan uses the Winston access log.
 * @type {never}
 */
const accessLogger = createLogger({
  transports: [
    dailyRotateAccessFileTransport
  ],
  exitOnError: false, // do not exit on handled exceptions
});

accessLogger.on('error', (err) => {
  console.log(err) // The logger itself can emit errors. Handle these here with simple console log.
});

/**
 * Use this function to set the server access log.
 * @param app
 */
module.exports.setAccessLog = function (app) {

  app.use(morgan('combined', {
    'stream': {
      write: (message) =>
        accessLogger.info(message.trim())
    }
  }));

};

/**
 * Return a copy of the error logger.
 * @returns {never}
 */
module.exports.getErrorLogger = function() {
  return errorLogger;
};
