/*
 * Copyright (c) 2016.
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
 * Controllers for the Tagger administrative API.
 *
 * @author Michael Spalti
 */

'use strict';

const async = require('async');
const utils = require('../../utils/response-utility');
const imageConvert = require('../../utils/image-convert');
const taggerDao = require('../../dao/collection-dao');
const config = require('../../../../config/environment');
const logger = require('../../utils/error-logger');

/**
 * Returns ctype (item type) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.countCTypesByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.countCTypesByArea(areaId).then(function (types) {
    utils.sendResponse(res, types);
  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Gets browse type (search option types) by area for overview dashboard.
 * @param req
 * @param res
 */
exports.browseTypesByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.browseTypesByArea(areaId).then(
    function (collections) {
      utils.sendResponse(res, collections);
    }).catch(function (err) {
    logger.dao(err);
  });
};

exports.setPublicationStatus = function (req, res) {
  const pubStatus = req.params.status;
  const collectionId = req.params.collId;

  taggerDao.setPublicationStatus(pubStatus, collectionId).then(
    function() {
      utils.sendSuccessJson(res);
    }).catch(function (err) {
    logger.dao(err);
  });

};

exports.getPublicationStatus = function (req, res) {
  const collectionId = req.params.collId;

  taggerDao.getPublicationStatus(collectionId).then(
    function(collection) {
      utils.sendResponse(res, collection);
    }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Returns repoType (search option) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.repoTypesByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.repoTypesByArea(areaId).then(function (types) {
    utils.sendResponse(res, types);
  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Retrieves the collections by area id for the administrative
 * collection panel.
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.findCollectionsInArea(areaId).then(function (collections) {
    utils.sendResponse(res, collections);

  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Adds a content type to the collection metadata after first
 * checking whether the association already exists.
 * @param req
 * @param res
 */
exports.addTypeTarget = function (req, res) {
  const collId = req.params.collId;
  const typeId = req.params.typeId;

  async.series({
      check: function (callback) {
        taggerDao.findItemContentTarget(collId, typeId).then(function (result) {
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
      if (result.check === null) {

        taggerDao.createItemContentTarget(collId, typeId).then(function () {
          utils.sendResponse(res, {status: 'success'});
        }).catch(function (err) {
          logger.dao(err);
        });

      } else {
        utils.sendResponse(res, {status: 'exists'});

      }
    }
  );
};

/**
 * Removes a content type association from the collection.
 * @param req
 * @param res
 */
exports.removeTypeTarget = function (req, res) {
  const collId = req.params.collId;
  const typeId = req.params.typeId;

  taggerDao.deleteItemContentTarget(collId, typeId).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Add a subject tag to the collection after first checking
 * whether the association already exists.
 * @param req
 * @param res
 */
exports.addTagTarget = function (req, res) {
  const collId = req.params.collId;
  const tagId = req.params.tagId;

  async.series(
    {
      check: function (callback) {

        taggerDao.checkForExistingTagTarget(collId, tagId)
          .then(function (result) {
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
      // if new, add target
      if (result.check === null) {

        taggerDao.addTagTarget(collId, tagId)
          .then(function () {
            utils.sendResponse(res, {status: 'success'});
          }).catch(function (err) {
          logger.dao(err);
        });

      } else {
        utils.sendResponse(res, {status: 'exists'});
      }

    });

};

/**
 * Removes a subject tag from the collection.
 * @param req
 * @param res
 */
exports.removeTagTarget = function (req, res) {
  const collId = req.params.collId;
  const tagId = req.params.tagId;

  taggerDao.deleteTagTarget(collId, tagId).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

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
      utils.sendAreaTargetsReponse(res, err, result);
    }
  );
}

/**
 * Returns the first collection for the area.
 * @param req
 * @param res
 */
exports.getFirstCollectionInArea = function (req, res) {
  const areaId = req.params.areaId;

  async.waterfall([
    function (callback) {
      taggerDao.findCollectionsInArea(areaId)
        .then(
          function(collections) {
            callback(null, collections[0].dataValues.CollectionId);

          }
        ).catch(function (err) {
        logger.dao(err);
      });
    },
    function (collId, callback) {
      taggerDao.findCollectionById(collId)
        .then(
          function(collection) {
            callback(null, collection);

          }
        );
    }
  ],
    function (err, collection) {
    if (err) {
      logger.dao(err);
    }
    utils.sendResponse(res, collection);

  });

};

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
      utils.sendAreaTargetsReponse(res, err, result);

    });
};

/**
 * Retrieves data for a single collection by collection id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {

  const collId = req.params.id;

  async.parallel({
      getCollection: function (callback) {
        taggerDao.findCollectionById(collId).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          logger.dao(err);
        });
      },
      getCategory: function (callback) {
        taggerDao.findCategoryAssociation(collId).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          logger.dao(err);
        });
      },
      getAreas: function (callback) {
        taggerDao.findAreasForCollection(collId).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          logger.dao(err);
        });
      }
    },
    function (err, result) {
      if (err !== null) {
        logger.dao(err);
      }

      var response = {};
      var areas = [];
      if (result.getCollection !== null) {
        response.id = result.getCollection.id;
        response.title = result.getCollection.title;
        response.description = result.getCollection.description;
        response.dates = result.getCollection.dates;
        response.items = result.getCollection.items;
        response.ctype = result.getCollection.ctype;
        response.url = result.getCollection.url;
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
      utils.sendResponse(res, response);
    });
};

/**
 * Updates metadata and associations for a single collection.
 * @param req
 * @param res
 */
exports.update = function (req, res) {

  const id = req.body.id;
  const title = req.body.title;
  const url = req.body.url;
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
    browseType: browseType,
    description: description,
    dates: dates,
    items: items,
    ctype: ctype,
    repoType: repoType,
    restricted: restricted
  };

  async.series({

      updateCollection: function (callback) {
        taggerDao.updateCollection(update, id)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          logger.dao(err);
        });
      },
      checkCategory: function (callback) {
        taggerDao.findCategoryAssociation(id).then(function (result) {
          callback(null, result);
        }).catch(function (err) {
          logger.dao(err);
        });
      }
    },
    function (err, result) {
      if (err !== undefined && err !== null) {
        console.log(err);
        utils.sendErrorJson(res, err);

      }
      // If no category exists for this collection,
      // add new entry.
      if (result.checkCategory === null) {
        taggerDao.addCollectionToCategory(id, category)
          .then(function () {
            utils.sendSuccessJson(res);

          }).catch(function (err) {
          logger.dao(err);
        });
        // If category does exist, update to the current value.
      } else {
        taggerDao.updateCollectionCategory(id, category).then(
          function () {
            utils.sendSuccessJson(res);

          }).catch(
          function (err) {
            logger.dao(err);
          });
      }
    });

};

/**
 * Deletes a collection.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.body.id;

  taggerDao.deleteCollection(id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Adds a new collection with title field metadata
 * and creates the collection association with the
 * collection area.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const title = req.body.title;
  const areaId = req.body.areaId;
  const browseType = req.body.browseType;
  const repoType = req.body.repoType;
  const ctype = req.body.ctype;

  var newCollectionId;

  async.series({
      addCollection: function (callback) {
        taggerDao.addNewCollection(title, browseType, repoType, ctype).then(function (coll) {
          newCollectionId = coll.id;
          callback(null, coll);
        }).catch(function (err) {
          logger.dao(err);
        });
      },
      addArea: function (callback) {
        taggerDao.addCollectionToArea(newCollectionId, areaId)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          logger.dao(err);
        });
      },
      collections: function (callback) {
        taggerDao.findCollectionsInArea(areaId)
          .then(function (colls) {
            callback(null, colls);
          }).catch(function (err) {
          logger.dao(err);
        });
      }
    }, function (err, results) {
      if (err) {
        logger.dao(err);
      }
      utils.sendResponse(res, {status: 'success', id: newCollectionId, collections: results.collections});
    }
  );

};

/**
 * Image upload. Reads multipart form data and creates
 * thumbnail image. Writes thumbnail and full size image to
 * directories in the configuration's image path directory.
 * @param req
 * @param res
 * @param config
 */
exports.updateImage = function (req, res, config) {

  const multiparty = require('multiparty');

  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {

    if (err) {
      logger.form(err);
      res.end();
    }

    if (files.file !== undefined) {
      try {
        imageConvert(res, files, fields, config, updateImageInDb);
      } catch (err) {
        logger.image(err);
        res.end();
      }
    }
    else {
      logger.missing('No image files were received. Aborting upload.');
      res.end();
    }
  });

  /**
   * Updates the data base with new image information.
   * @param id
   * @param imageName
   */
  function updateImageInDb(res, id, imageName) {
    taggerDao.updateCollectionImage(id, imageName).then(function () {
      utils.sendSuccessJson(res);
      }
    ).catch(function (err) {
      logger.dao(err);
    });
  }
};

