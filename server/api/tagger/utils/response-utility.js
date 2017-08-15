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
 * Created by mspalti on 12/1/16.
 */

//jshint strict:false

const utils = {};

utils.sendResponse = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));

};

utils.sendErrorStatus = (res, status, err) => {
  res.status(500).send({error: err.message});
};
/**
 * Provides uniform API for unadorned error responses.
 * @param res
 */
// utils.sendErrorJson = function (res, err) {
//   utils.sendResponse(res, {status: 'Server Error', reason: err.message});
//
// };

/**
 * Provides uniform API for unadorned success responses.
 * @param res
 */
utils.sendSuccessJson = (res) => {
  utils.sendResponse(res, {status: 'success'});

};

/**
 * Send json success response that includes data.
 * @param res
 * @param data
 */
utils.sendSuccessAndDataJson = (res, data) => {
  utils.sendResponse(res, {status: 'success', data: data});
};

/**
 * The generic response callback implemented by most controllers.
 * @param res
 * @param data
 */
utils.responseCallback = (res, data) => {
  utils.sendResponse(res, data);
};

/**
 * The error handler implemented by controllers.
 * @param next
 * @param err
 * @returns {*}
 */
utils.errorHandler = (next, err) => {
  return next(err);
};

/**
 * Returns error used by public API services.
 * @param filename the name of the file in which the error occure
 * @param type the type of error
 * @param err the error
 * @returns {Error}
 */
utils.createErrorResponse = (filename, type, err) => {

  let label = '';
  if (type === 'map') {
    label = 'Mapping Response'
  } else if (type === 'repo') {
    label = 'Repository'
  } else if (type === 'external') {
    label = 'Error in request for external resource'
  } else if (type === 'reduce') {
    label = 'Application'
  }

  let error = new Error('['+ filename + '] ' + label + ' Error: ' + err.message);
  error.status = 500;
  return error;

};

module.exports = utils;
