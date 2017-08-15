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

const repository = require('../repository/tag-target');
const utils = require('../utils/response-utility');

/**
 * Retrieves list of subject areas associated with a tag.
 * @param req
 * @param res
 */
exports.getAreaTargets = function (req, res) {
  repository.getAreaTargets(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Creates association between a subject tag and an area
 * if that association does not already exist.
 * @param req
 * @param res
 */
exports.addTarget = function (req, res) {
  repository.addTarget(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (data) => {
      utils.sendSuccessAndDataJson(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Removes an association between a subject tag and an area.
 * @param req
 * @param res
 */
exports.removeTarget = function (req, res) {
  repository.removeTarget(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
