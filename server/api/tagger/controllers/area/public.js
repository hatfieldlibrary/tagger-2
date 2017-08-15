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
 * Created by mspalti on 3/31/17.
 */
(function () {

  'use strict';

  const publicApiRepository = require('../../repository/area/public');
  const utils = require('../../utils/response-utility');

  /**
   * Retrieves a list of all areas.
   * @param req
   * @param res
   * @param next
   */
  exports.list = function (req, res, next) {
    publicApiRepository.list(
      req,
      (data) => {
        utils.sendResponse(res, data);
      },
      (err) => {
        return next(err);
      });
  };

  /**
   * Retrieves area information by area id.
   * @param req
   * @param res
   * @param next
   */
  exports.byId = function (req, res, next) {
    publicApiRepository.byId(
      req,
      (data) => {
        utils.sendResponse(res, data);
      },
      (err) => {
        return next(err);
      });
  };

  /**
   * Retrieves area list with collection counts.
   * @param req
   * @param res
   * @param next
   */
  exports.listAreasWithCount = function (req, res, next) {
    publicApiRepository.listAreasWithCount(
      req,
      (data) => {
        utils.sendResponse(res, data);
      },
      (err) => {
        return next(err);
      });
  };

  /**
   * Retrieves areas for a given collection.
   * @param req
   * @param res
   * @param next
   */
  exports.areasForCollection = function (req, res, next) {
    publicApiRepository.areasForCollection(
      req,
      (data) => {
        utils.sendResponse(res, data);
      },
      (err) => {
        return next(err);
      });
  };

})();
