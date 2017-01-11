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

'use strict';

const utils = require('../utils/response-utility');
const taggerDao = require('../dao/users.dao');
const logger = require('../utils/error-logger');

/**
 * Retrieves list of current users.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.findAllUsers().then(function (users) {
    utils.sendResponse(res, users);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Adds a new user.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const area = req.body.area;

  taggerDao.createNewUser(name, email, area).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Deletes user.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.body.id;

  taggerDao.deleteUser(id).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Updates user information.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const area = req.body.area;
  const id = req.body.id;

  taggerDao.updateUser(name, email, area, id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    logger.dao(err);
  });

};
