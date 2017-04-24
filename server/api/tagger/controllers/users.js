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

'use strict';

const repository = require('../repository/users');
const utils = require('../utils/response-utility');

/**
 * Retrieves list of current users.
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  repository.list(
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Adds a new user.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  repository.add(
    req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Deletes user.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  repository.delete(
    req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Updates user information.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  repository.update(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
