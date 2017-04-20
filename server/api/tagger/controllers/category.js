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

const repository = require('../repository/category');
const utils = require('../utils/response-utility');

/**
 * Retrieves the list of all collection groups.
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
 * Returns collection group title and usage count for dashboard.
 * @param req
 * @param res
 */
exports.categoryCountByArea = function (req, res) {
    repository.categoryCountByArea(
      req,
      (data) => {
        utils.sendResponse(res, data);
      },
      (err) => {
        return next(err);
      });

};

/**
 * Requests the category associated with a collection. The model allows
 * for many-to-many relationships between collections and categories.
 * This is incorrect.  The relationship should be one-to-many.
 *
 * The method returns an array of length one if the collection exists.
 * The join will return Category information or null.
 *
 * @param req
 * @param res
 */
exports.categoryByCollection = function (req, res) {
  repository.categoryByCollection(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves list of collection groups by area.
 * @param req
 * @param res
 */
exports.listByArea = function (req, res) {
  repository.listByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves single collection group information by category id.
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
 * Adds a new collection group with title.
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
 * Updates collection group.
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
 * Deletes collection group.
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







