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
