/*
 * Copyright (c) 2017.
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

/**
 * Created by mspalti on 1/10/17.
 */

'use strict';

const logger = require('winston');

const logLevel = 'warn';

let errorLoggers = {};

/**
 * Error returned from data access object.
 * @param err
 */
errorLoggers.dao = function(err)  {
  logger.log(logLevel, err.message, {errorType: 'DAO'});
};

/**
 * Error returned from repository.
 * @param err
 */
errorLoggers.repository = function(err)  {
  logger.log(logLevel, err.message, {errorType: 'REPOSITORY'});
};

/**
 * Error returned from map.
 * @param err
 */
errorLoggers.map = function(err)  {
  logger.log(logLevel, err.message, {errorType: 'MAPPING'});
};

/**
 * Error returned from image processing.
 * @param err
 */
errorLoggers.image = function(err) {
  logger.log(logLevel, err.message, {errorType: 'IMAGE_PROCESSING'});
};

/**
 * Error returned from multi-part form processing.
 * @param err
 */
errorLoggers.form = function(err) {
  logger.log(logLevel, err.message, {errorType: 'MULTIPART_FORM'});
};

/**
 * Custom error for missing input data.
 * @param errorMessage
 */
errorLoggers.missing = function(errorMessage) {
  logger.log(logLevel, errorMessage, {errorType: 'MISSING_DATA'});
};

module.exports = errorLoggers;
