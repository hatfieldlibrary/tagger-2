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
  const collId = req.body.collId;
  const areaId = req.body.areaId;

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
 * Removes area from a collection that has no category (collection group) assigned.  In this situation,
 * there is no need to check the category and remove if it belongs to the area that is being removed.
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

};

/**
 * Removes area target from a collection that has a category (collection group) assigned. If the category
 * exists AND has been assigned to the area to be removed, the category also must be removed from the collection.
 * @param collId
 * @param areaId
 * @param res
 * @private
 */
function _removeAreaTarget(collId, areaId, category, res) {

  async.series(
    {
      deleteCategory: (callback) => {
        if (category.areaId === areaId) {
          taggerDao.deleteCategoryFromCollection(collId, category.id).then((result) => {
            callback(null, result);
            return null;
          }).catch(function (err) {
            logger.dao(err);
          });
        }
      },
      removeFromArea: (callback) => {
        taggerDao.removeCollectionFromArea(areaId, collId).then(function (result) {
          callback(null, result);
          return null;
        }).catch(function (err) {
          callback(err, null);
        });
      },
      areaList: (callback => {
        taggerDao.getAreaIdsForCollection(collId).then(function (result) {
          callback(null, result);
          return null;
        }).catch(function (err) {
          callback(err, null);
        });
      }),
      function(err, result) {
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

  taggerDao.getCategoryForCollection(collId).then((result) => {
    if (result.Category === null) {
      _removeCollectionFromArea(collId, areaId, res);
    } else {
      _removeAreaTarget(collId, areaId, result.Category, res);
    }
  });

};

