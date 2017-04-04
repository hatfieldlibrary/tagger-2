/**
 * Created by mspalti on 4/4/17.
 */
(function() {
  'use strict';

  const taggerDao = require('../../dao/area-dao');
  const utils = require('../../utils/response-utility');
  const logger = require('../../utils/error-logger');
  const apiMapper = require('../../map/area');


  /**
   * Retrieves a list of all areas.
   * @param req
   * @param res
   */
  exports.list = function (req, res) {

    taggerDao.listAllAreas().then(function (areas) {
      utils.sendResponse(res, apiMapper.mapAreaList(areas));

    }).catch(function (err) {
      logger.dao(err);
      utils.sendErrorJson(res, err);
    });

  };

  /**
   * Retrieves area information by area id.
   * @param req
   * @param res
   */
  exports.byId = function (req, res) {
    const areaId = req.params.id;
    taggerDao.findAreaById(areaId).then(function (areas) {
      utils.sendResponse(res, apiMapper.mapArea(areas));
    }).catch(function (err) {
      logger.dao(err);
      utils.sendErrorJson(res, err);
    });
  };

  exports.listAreasWithCount = function (req, res) {
    taggerDao.areaListWithCollectionCounts()
      .then(function(areas) {
        utils.sendResponse(res, apiMapper.mapAreaCount(areas));
      }).catch(function (err) {
      logger.dao(err);
      utils.sendErrorJson(res, err);
    });
  };

  /**
   * Retrieves areas for a given collection.
   * @param req
   * @param res
   */
  exports.areasForCollection = function (req, res) {
    const collId = req.params.id;
    taggerDao.findAreasForCollection(collId)
      .then(function(areas) {
        utils.sendResponse(res, apiMapper.mapAreasForCollectionList(areas));
      }).catch(function (err) {
      logger.dao(err);
      utils.sendErrorJson(res, err);
    });
  };

})();
