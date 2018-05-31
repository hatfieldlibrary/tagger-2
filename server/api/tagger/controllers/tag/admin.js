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

const repository = require('../../repository/tag/admin');
const utils = require('../../utils/response-utility');

/**
 * Retrieves tag information by tag id.
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
 * Administrative list of all tags.
 * @param req
 * @param res
 * @param next
 */
exports.subjectListAdmin = function (req, res, next) {
  repository.subjectList(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves list of tags associated with an area. Query
 * by area id.
 * @param req
 * @param res
 */
exports.tagByArea = function (req, res) {
  repository.tagByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};


/**
 * Retrieves tag name and use count by area id.
 * @param req
 * @param res
 */
exports.tagByAreaCount = function (req, res) {
  repository.tagByAreaCount(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};


/**
 * Adds a new tag.  First checks to see if tag with this name already
 * exists.
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
 * Update the tag name.
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
 * Delete the tag.
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



