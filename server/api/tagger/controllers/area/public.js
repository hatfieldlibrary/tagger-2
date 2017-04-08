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
      utils.responseCallback(res, data),
      utils.errorHandler(next, err) );
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
      utils.responseCallback(res, data),
      utils.errorHandler(next, err) );
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
      utils.responseCallback(res, data),
      utils.errorHandler(next, err) );
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
      utils.responseCallback(res, data),
      utils.errorHandler(next, err) );
  };

})();
