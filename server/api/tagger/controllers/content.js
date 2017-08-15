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

const repository = require('../repository/content');
const utils = require('../utils/response-utility');

/**
 * Retrieves content type by id
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  repository.byId(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves list of all content types
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  repository.list(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Returns name and frequency for content types in a single
 * area for use in dashboard.
 * @param req
 * @param res
 */
exports.countByArea = function (req, res) {
  repository.countByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Adds new content type. First checks to see if it exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  repository.add(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Updates a content type.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  repository.update(
    req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Deletes a content type.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  repository.delete(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

