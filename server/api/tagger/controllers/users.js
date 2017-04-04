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

const repository = require('../repository/users');
/**
 * Retrieves list of current users.
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  repository.list(req, res);

};

/**
 * Adds a new user.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  repository.add(req, res);

};

/**
 * Deletes user.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  repository.delete(req, res);

};

/**
 * Updates user information.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  repository.update(req, res);

};
