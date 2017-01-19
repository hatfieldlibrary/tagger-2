/**
 * Created by mspalti on 1/17/17.
 */
'use strict';

const async = require('async');
const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Retrieves areas by collection id for the administrative
 * collections panel.
 * @param req
 * @param res
 */
exports.areas = function (req, res) {
  const collId = req.params.collId;

  taggerDao.findAreasForCollection(collId).then(function (areas) {
    utils.sendResponse(res, areas);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Returns area ids associated with the collection.
 * @param collId
 * @param callback
 * @private
 */
function _areaIdsForCollection (collId, callback) {

  taggerDao.getAreaIdsForCollection(collId).then(function (result) {
    callback(null, result);
  }).catch(function (err) {
    logger.dao(err);
  });
}

/**
 * Adds a collection to a collection area.
 * @param collId    the collection id
 * @param areaId    the area id
 * @param res
 */
function _addArea(collId, areaId, res) {

  async.series(
    {
      create: function (callback) {
        taggerDao.addCollectionToArea(collId, areaId)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          logger.dao(err);
        });
      },
      areaList: function (callback) {
        _areaIdsForCollection(collId, callback);
      }
    },

    function (err, result) {
      if (err) {
        utils.sendErrorJson(res, err);
      }
      utils.sendSuccessAndDataJson(res, result);
    }
  );
}

/**
 * Adds collection to a collection area after first
 * checking for a existing association then returns
 * new area list.
 * @param req
 * @param res
 */
exports.addAreaTarget = function (req, res) {
  const collId = req.params.collId;
  const areaId = req.params.areaId;

  async.series(
    {
      // Check to see if collection is already associated
      // with area.
      check: function (callback) {

        taggerDao.checkAreaAssociation(collId, areaId).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          logger.dao(err);
        });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
      }
      // if new
      if (result.check === null) {
        _addArea(collId, areaId, res);

      }
      // if not new, just return the current list.
      else {
        taggerDao.findCollectionsInArea(areaId).then = function (areas) {
          utils.sendResponse(res, {status: 'exists', areaTargets: areas});
        };
      }

    });

};

/**
 * Removes the association between a collection and a collection
 * area.  Returns new area list after completion.
 * @param req
 * @param res
 */
exports.removeAreaTarget = function (req, res) {

  const collId = req.params.collId;
  const areaId = req.params.areaId;

  async.series(
    {
      create: function (callback) {
        taggerDao.removeCollectionFromArea(areaId, collId).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          logger.dao(err);
        });
      },
      areaList: function (callback) {
        _areaIdsForCollection(collId, callback);
      }
    },

    function (err, result) {
      if (err) {
        utils.sendErrorJson(res, err);
      }
      utils.sendSuccessAndDataJson(res, result);

    });
};
