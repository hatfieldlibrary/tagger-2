/**
 * Created by mspalti on 3/31/17.
 */
(function() {
  'use strict';

  const publicApiRepository = require('../../repository/area/public');


  /**
   * Retrieves a list of all areas.
   * @param req
   * @param res
   */
  exports.list = function (req, res) {
    publicApiRepository.list(req, res);

  };

  /**
   * Retrieves area information by area id.
   * @param req
   * @param res
   */
  exports.byId = function (req, res) {
   publicApiRepository.byId(req, res);
  };

  exports.listAreasWithCount = function (req, res) {
   publicApiRepository.listAreasWithCount(req, res);
  };

  /**
   * Retrieves areas for a given collection.
   * @param req
   * @param res
   */
  exports.areasForCollection = function (req, res) {
    publicApiRepository.areasForCollection(req, res);
  };

})();
