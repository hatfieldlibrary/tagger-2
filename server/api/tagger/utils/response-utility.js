/*
 * Copyright (c) 2016.
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

utils.sendResponse = function(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));

};


/**
 * Provides uniform API for unadorned error responses.
 * @param res
 */
utils.sendErrorJson = function (res, err) {
  utils.sendResponse(res, {status: 'Server Error', reason: err.message});

};

/**
 * Provides uniform API for unadorned success responses.
 * @param res
 */
utils.sendSuccessJson = function (res) {
  utils.sendResponse(res, {status: 'success'});

};

/**
 * Send json success response that includes data.
 * @param res
 * @param data
 */
utils.sendSuccessAndDataJson = function (res, data) {
  console.log(data)
  utils.sendResponse(res, {status: 'success', data: data});
};

module.exports = utils;
