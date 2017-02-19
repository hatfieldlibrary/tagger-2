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
            // see https://github.com/sequelize/sequelize/issues/4883
            return null;
          }).catch(function (err) {
          logger.dao(err);
          callback(err, null);
        });
      },
      areaList: function (callback) {
        taggerDao.getAreaIdsForCollection(collId)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          callback(err, null);
          logger.dao(err);
        });
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
          return null;
        }).catch(function (err) {
          callback(err, null);
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
 * Removes collection from the area.  This can be called if the
 * attempt to remove the collection via the default API method
 * failed due to a missing Collection/Category relation.
 * @param collId the collection id
 * @param areaId the area id
 * @param res the response object
 * @private
 */
function _removeCollectionFromArea(collId, areaId, res) {

  async.series(
    {
      remove: (callback) => {
        taggerDao.removeCollectionFromArea(areaId, collId)
          .then(function (result) {
            callback(null, result);
            return null;
          }).catch(function (err) {
          callback(err, null);
        });
      },
      getAreas: (callback) => {
        taggerDao.getAreaIdsForCollection(collId)
          .then(function (result) {
            callback(null, result);
            return null;
          }).catch(function (err) {
          callback(err, null);
        });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
        utils.sendErrorJson(res, err);
      } else {
        utils.sendSuccessAndDataJson(res, {areaList: result});
      }
    });

}


/**
 * Removes the association between a collection and a collection
 * area.  Also removes the category (collection group) from the collection,
 * Returns new area list after completion.
 * @param req
 * @param res
 */
exports.removeAreaTarget = function (req, res) {

  const collId = req.params.collId;
  const areaId = req.params.areaId;

  async.waterfall([
      (callback) => {
        taggerDao.getCategoryForCollection(collId).then((result) => {
            callback(null, result.Category);
            return null;
          }
        ).catch(function (err) {
          callback(err, null);
        })
      },
      (category, callback) => {
        /*
         * Remove category from collection if the category belongs to the area
         * that is being removed. This allows a new category for to the collection.
         */
        if (category.areaId === areaId) {
          taggerDao.deleteCategoryFromCollection(collId, category.id).then((result) => {
            callback(null, result);
          }).catch(function (err) {
            logger.dao(err);
          });
        } else {
          callback(null, category);
        }

      },
      (result, callback) => {
        taggerDao.removeCollectionFromArea(areaId, collId).then(function (result) {
          callback(null, result);
          return null;
        }).catch(function (err) {
          callback(err, null);
        });
      },
      (result, callback) => {
        taggerDao.getAreaIdsForCollection(collId).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          callback(err, null);
        });
      }
    ],
    function (err, result) {
      if (err) {

        let message = err.message;
        if (message.match('Cannot read property \'Category\' of null') !== null) {
          logger.dao(err);
          /**
           * If the Category property is missing, the collection that is being
           * removed from the area did not have a Category assigned. Attempt to
           * remove the collection without checking for Category.
           */
          _removeCollectionFromArea(collId, areaId, res);

        } else {
          logger.dao(err);
          utils.sendErrorJson(res, err);

        }
      } else {
        utils.sendSuccessAndDataJson(res, {areaList: result});

      }

    });

};
