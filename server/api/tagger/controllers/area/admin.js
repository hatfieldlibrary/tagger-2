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

const repository = require('../../repository/area/area');

/**
 * Retrieves area information by area id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  repository.byId(req, res);
};


/**
 * Adds new area. Sets the area position to be at the
 * end of the list.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  repository.add(req, res);
};

/**
 * Updates an existing area.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  repository.update(req, res);
};

/**
 * Updates area position attribute in the database to a new value based on the
 * order of the new areas array array.
 * @param req
 * @param res
 */
exports.reorder = function (req, res) {
  repository.reorder(req, res);
};

/**
 * Delete an area.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
 repository.delete(req, res);

};




