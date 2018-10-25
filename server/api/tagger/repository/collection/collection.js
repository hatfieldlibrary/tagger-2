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
 * Created by mspalti on 4/4/17.
 */

'use strict';

const async = require('async');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Returns item type counts for the overview
 * dashboard.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.countCTypesByArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.countCTypesByArea(areaId)
    .then((data) => {
      callback(data)
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });
};

/**
 * Gets browse type (search option types) by area for overview dashboard.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.browseTypesByArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.browseTypesByArea(areaId)
    .then((data) => {
      callback(data)
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });
};

/**
 * Sets the collection publication status.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.setPublicationStatus = function (req, callback, errorHandler) {
  const pubStatus = req.params.status;
  const collectionId = req.params.collId;

  taggerDao.setPublicationStatus(pubStatus, collectionId)
    .then(() => {
      callback();
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });

};

/**
 * Sets the collection parents (area).
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.updateParentCollection = function (req, callback, errorHandler) {
  const collectionId = req.params.collId;
  // Assuming the patch request is a single value array. Additional patch operations are ignored.
  const parent = req.body[0].value;
  const path = req.body[0].path;
  if (path !== '/parent') {
    const err = new Error(`Invalid patch path. Expected "/parent". `);
    errorHandler(err);
    logger.dao(err);
  }
  taggerDao.updateParentCollection(collectionId, JSON.stringify(parent))
    .then(() => {
      callback();
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });

};
/**
 * Gets the collection publication status.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.getPublicationStatus = function (req, callback, errorHandler) {
  const collectionId = req.params.collId;

  taggerDao.getPublicationStatus(collectionId)
    .then((collection) => {
      callback(collection);
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });

};

/**
 * Returns repoType (search option) counts for the overview
 * dashboard.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.repoTypesByArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.repoTypesByArea(areaId)
    .then((types) => {
      callback(types);
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });
};

/**
 * Retrieves the collections by area id for the administrative
 * collection panel.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.list = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.findCollectionsInArea(areaId)
    .then((collections) => {
      callback(collections);
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });
};

/**
 * Returns the first collection for the area.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.getFirstCollectionInArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  async.waterfall([
      function (waterfall) {
        taggerDao.findCollectionsInArea(areaId)
          .then(
            (collections) => {
              waterfall(null, collections[0].dataValues.CollectionId);

            });
      },
      function (collId, waterfall) {
        taggerDao.findCollectionById(collId)
          .then(
            (collection) => {
              waterfall(null, collection);
            });
      }
    ],
    function (err, collection) {
      if (err) {
        logger.dao(err);
        errorHandler(err);
      }
      callback(collection);

    });

};

/**
 * Retrieves data for a single collection by collection id.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.byId = function (req, callback, errorHandler) {

  const collId = req.params.id;

  async.parallel({
      getCollection: (parallel) => {
        taggerDao.findCollectionById(collId)
          .then((result) => {
            parallel(null, result);
          });
      },
      getCategory: (parallel) => {
        taggerDao.findCategoryAssociation(collId)
          .then((result) => {
            parallel(null, result);
          });
      },
      getAreas: (parallel) => {
        taggerDao.findAreasForCollection(collId)
          .then((result) => {
            parallel(null, result);
          });
      }
    },
    function (err, result) {
      if (err !== null) {
        logger.dao(err);
        errorHandler(err);
      }

      let response = {};
      let areas = [];
      if (result.getCollection !== null) {
        response.id = result.getCollection.id;
        response.title = result.getCollection.title;
        response.description = result.getCollection.description;
        response.dates = result.getCollection.dates;
        response.items = result.getCollection.items;
        response.ctype = result.getCollection.ctype;
        response.url = result.getCollection.url;
        response.searchUrl = result.getCollection.searchUrl;
        response.browseType = result.getCollection.browseType;
        response.repoType = result.getCollection.repoType;
        response.image = result.getCollection.image;
        response.restricted = result.getCollection.restricted;
      }

      if (result.getCategory !== null) {

        response.category = result.getCategory.CategoryId;
      }
      if (result.getAreas !== null) {
        for (var i = 0; i < result.getAreas.length; i++) {
          areas[0] = result.getAreas[i].AreaId;
        }
        response.areas = areas;
      }
      callback(response);

    });
};

/**
 * Updates metadata and associations for a single collection.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.update = function (req, callback, errorHandler) {

  const id = req.body.id;
  const title = req.body.title;
  const url = req.body.url;
  const searchUrl = req.body.searchUrl;
  const browseType = req.body.browseType;
  const description = req.body.description;
  const dates = req.body.dates;
  const items = req.body.items;
  const ctype = req.body.ctype;
  const repoType = req.body.repoType;
  const restricted = req.body.restricted;
  const category = req.body.category;

  const update = {
    title: title,
    url: url,
    searchUrl: searchUrl,
    browseType: browseType,
    description: description,
    dates: dates,
    items: items,
    ctype: ctype,
    repoType: repoType,
    restricted: restricted
  };

  async.series({

      updateCollection: (series) => {
        taggerDao.updateCollection(update, id)
          .then((result) => {
            series(null, result);
          });
      },
      checkCategory: function (series) {
        taggerDao.findCategoryAssociation(id)
          .then(function (result) {
          series(null, result);
        });
      }
    },
    function (err, result) {
      if (err !== undefined && err !== null) {
        logger.dao(err);
        errorHandler(err);

      }
      // If no category exists for this collection,
      // add new entry.
      if (result.checkCategory === null) {
        taggerDao.addCollectionToCategory(id, category)
          .then(callback())
          .catch((err) => {
            logger.dao(err);
            errorHandler(err);
          });
        // If category does exist, update to the current value.
      } else {
        taggerDao.updateCollectionCategory(id, category)
          .then(() => {
            callback()
          })
          .catch(
            (err) => {
              logger.dao(err);
              errorHandler(err);
            });
      }
    });

};

/**
 * Deletes a collection.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.delete = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.deleteCollection(id)
    .then(() => {
      callback({status: 'success'})
    })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });

};

/**
 * Adds a new collection with title field metadata
 * and creates the collection association with the
 * collection area.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.add = function (req, callback, errorHandler) {

  const title = req.body.title;
  const areaId = req.body.areaId;
  const browseType = req.body.browseType;
  const repoType = req.body.repoType;
  const ctype = req.body.ctype;
  const parent = req.body.parent;

  console.log(req.body)

  let newCollectionId;

  async.series({
      addCollection: (series) => {
        taggerDao.addNewCollection(title, browseType, repoType, ctype, parent).then(function (coll) {
          newCollectionId = coll.id;
          series(null, coll);
        });
      },
      addArea: (series) => {
        taggerDao.addCollectionToArea(newCollectionId, areaId)
          .then((result) => {
            series(null, result);
          });
      },
      collections: (series) => {
        taggerDao.findCollectionsInArea(areaId)
          .then((colls) => {
            series(null, colls);
          });
      }
    }, (err, results) => {
      if (err) {
        logger.dao(err);
        errorHandler(err);
      }
      callback({status: 'success', id: newCollectionId, collections: results.collections});

    }
  );

};

