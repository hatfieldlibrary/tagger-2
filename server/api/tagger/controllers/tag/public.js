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

/**
 * Created by mspalti on 1/9/17.
 */

'use strict';

const publicApiRepository = require('../../repository/tag/public');
const utils = require('../../utils/response-utility');

/**
 * Retrieves a list of all tags.
 * @param req
 * @param res
 * @param next
 */
exports.subjectList = function (req, res, next) {
  publicApiRepository.subjectList(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 * @param next
 */
exports.subjectsForCollection = function (req, res, next) {
  publicApiRepository.subjectsForCollection(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param res
 * @param next
 */
exports.subjectsByArea = function (req, res, next) {
  publicApiRepository.subjectsByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
