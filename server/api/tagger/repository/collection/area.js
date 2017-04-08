'use strict';

const async = require('async');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Retrieves areas by collection id for the administrative
 * collections panel.
 * @param req
 * @param callback response success callback
 * @param errorHandler failure response callback
 */
exports.areas = function (req, callback, errorHandler) {
  const collId = req.params.collId;

  taggerDao.findAreasForCollection(collId)
    .then(() => {
    callback();
  })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });

};

/**
 * Adds a collection to a collection area.
 * @param collId    the collection id
 * @param areaId    the area id
 * @param callback response success callback
 * @param errorHandler failure response callback
 */
function _addArea(collId, areaId, callback, errorHandler) {

  async.series(
    {
      create: function (series) {
        taggerDao.addCollectionToArea(collId, areaId)
          .then((result) => {
            series(null, result);
            // see https://github.com/sequelize/sequelize/issues/4883
            return null;
          });
      },
      areaList: function (series) {
        taggerDao.getAreaIdsForCollection(collId)
          .then((result) => {
            series(null, result);
          });
      }
    },

    function (err, result) {
      if (err) {
        errorHandler(err);
      }
      callback(result);

    }
  );
}

/**
 * Adds collection to a collection area after first
 * checking for a existing association then returns
 * new area list.
 * @param req
 * @param callback response success callback
 * @param existingItemCallback success callback for existing association
 * @param errorHandler failure response callback
 */
exports.addAreaTarget = function (req, callback, existingItemCallback, errorHandler) {
  const collId = req.body.collId;
  const areaId = req.body.areaId;

  async.series(
    {
      // Check to see if collection is already associated
      // with area.
      check: function (series) {

        taggerDao.checkAreaAssociation(collId, areaId)
          .then((result) => {
            series(null, result);
            return null;
          });
      }
    },
    function (err, result) {
      if (err) {
        errorHandler(err);
        logger.dao(err);
      }
      // if new
      if (result.check === null) {
        _addArea(collId, areaId, callback, errorHandler);
      }
      // if not new, just return the current list.
      else {
        taggerDao.findCollectionsInArea(areaId).then(
          (areas) => {
            existingItemCallback({status: 'exists', areaTargets: areas})
          }
        );
      }

    });

};

/**
 * Removes area from a collection that has no category (collection group) assigned.  In this situation,
 * there is no need to check the category and remove if it belongs to the area that is being removed.
 * @param collId the collection id
 * @param areaId the area id
 * @param callback response success callback
 * @param errorHandler failure response callback
 * @private
 */
function _removeCollectionFromArea(collId, areaId, callback, errorHandler) {

  async.series(
    {
      remove: (series) => {
        taggerDao.removeCollectionFromArea(areaId, collId)
          .then(function (result) {
            series(null, result);
            return null;
          });
      },
      getAreas: (series) => {
        taggerDao.getAreaIdsForCollection(collId)
          .then(function (result) {
            series(null, result);
            return null;
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
        errorHandler(err);
      } else {
        callback(result);
      }
    });

}

/**
 * Removes area target from a collection that has a category (collection group) assigned. If the category
 * exists AND has been assigned to the area to be removed, the category also must be removed from the collection.
 * @param collId
 * @param areaId
 * @param callback response success callback
 * @param errorHandler failure response callback
 * @private
 */
function _removeAreaTarget(collId, areaId, category, callback, errorHandler) {

  async.series(
    {
      deleteCategory: (series) => {
        if (category.areaId === areaId) {
          taggerDao.deleteCategoryFromCollection(collId, category.id)
            .then((result) => {
              series(null, result);
              return null;
            });
        }
      },
      removeFromArea: (series) => {
        taggerDao.removeCollectionFromArea(areaId, collId)
          .then((result) => {
            series(null, result);
            return null;
          });
      },
      areaList: (series => {
        taggerDao.getAreaIdsForCollection(collId)
          .then((result) => {
            series(null, result);
            return null;
          });
      }),
      function(err, result) {
        if (err) {
          logger.dao(err);
          errorHandler(err);
        } else {
          callback({areaList: result});
        }
      }

    });

}

/**
 * Removes the association between a collection and a collection
 * area.  Also removes the category (collection group) from the collection,
 * Returns new area list after completion.
 * @param req
 * @param callback response success callback
 * @param errorHandler failure response callback
 */
exports.removeAreaTarget = function (req, callback, errorHandler) {

  const collId = req.params.collId;
  const areaId = req.params.areaId;

  taggerDao.getCategoryForCollection(collId).then((result) => {
    if (result.Category === null) {
      _removeCollectionFromArea(collId, areaId, callback, errorHandler);
    } else {
      _removeAreaTarget(collId, areaId, result.Category, callback, errorHandler);
    }
  });

};

