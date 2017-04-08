/**
 * Created by mspalti on 4/4/17.
 */
(function () {
  'use strict';

  const taggerDao = require('../../dao/area-dao');
  const logger = require('../../utils/error-logger');
  const apiMapper = require('../../map/area');
  const utils = require('../../utils/response-utility');

  /**
   * Retrieves a list of all areas.
   * @param req the request object
   * @param callback success response callback
   * @param errorHandler failure response callback
   */
  exports.list = function (req, callback, errorHandler) {

    taggerDao.listAllAreas()
      .then((areas) => {
          let data;
          try {
            data = apiMapper.mapAreaList(areas);
          } catch (err) {
            logger.map(err);
            errorHandler(utils.createErrorResponse(filename, 'map', err));
          }
          callback(data);
        }
      )
      .catch((err) => {
        logger.repository(err);
        errorHandler(utils.createErrorResponse(filename, 'repo', err));
      });
  };

  /**
   * Retrieves area information by area id.
   * @param req the request object
   * @param callback success response callback
   * @param errorHandler failure response callback
   */
  exports.byId = function (req, callback, errorHandler) {
    const areaId = req.params.id;

    taggerDao.findAreaById(areaId)
      .then((area) => {
        let data;
        try {
          data = apiMapper.mapArea(area);
        } catch (err) {
          logger.map(err);
          errorHandler(utils.createErrorResponse(filename, 'map', err));
        }
        callback(data);
      })
      .catch(function (err) {
        logger.repository(err);
        errorHandler(utils.createErrorResponse(filename, 'repo', err));
      });
  };

  /**
   * Retrieves list of areas with collection counts.
   * @param req the request object
   * @param callback success response callback
   * @param errorHandler failure response callback
   */
  exports.listAreasWithCount = function (req, callback, errorHandler) {
    taggerDao.areaListWithCollectionCounts()
      .then((area) => {
        let data;
        try {
          data = apiMapper.mapAreaList(area);
        } catch (err) {
          logger.map(err);
          errorHandler(utils.createErrorResponse(filename, 'map', err));
        }
        callback(data);
      })
      .catch((err) => {
        logger.repository(err);
        errorHandler(utils.createErrorResponse(filename, 'repo', err));
      });
  };

  /**
   * Retrieves areas for a given collection.
   * @param req the request object
   * @param callback success response callback
   * @param errorHandler failure response callback
   */
  exports.areasForCollection = function (req, callback, errorHandler) {
    const collId = req.params.id;
    taggerDao.findAreasForCollection(collId)
      .then((areas) => {
        let data;
        try {
          data = apiMapper.mapAreaList(areas);
        } catch (err) {
          logger.map(err);
          errorHandler(utils.createErrorResponse(filename, 'map', err));
        }
        callback(data);
      })
      .catch(function (err) {
        logger.repository(err);
        errorHandler(utils.createErrorResponse(filename, 'repo', err));
      });
  };

})();
