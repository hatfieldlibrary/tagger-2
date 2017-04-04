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

const repository = require('../repository/content');

/**
 * Retrieves content type by id
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  repository.byId(req, res);

};

/**
 * Retrieves list of all content types
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  repository.list(req, res);

};

/**
 * Returns name and frequency for content types in a single
 * area for use in dashboard.
 * @param req
 * @param res
 */
exports.countByArea = function (req, res) {
  repository.countByArea(req, res);

};

/**
 * Adds new content type. First checks to see if it exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  repository.add(req, res);
};
/**
 * Updates a content type.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  repository.update(req, res);
};

/**
 * Deletes a content type.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  repository.delete(req, res);

};

