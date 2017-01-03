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
 * Controllers for the Tagger administrative API and for external clients.
 *
 * @author Michael Spalti
 */

'use strict';

const async = require('async');
const utils = require('../utils/response-utility');
const imageConvert = require('../utils/image-convert');
const taggerDao = require('../dao/collection-dao');
const config = require('../../../config/environment');

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
  }).error(function (err) {
    console.log(err);
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
    }).error(function (err) {
    console.log(err);
  });
};

exports.setPublicationStatus = function (req, res) {
  const pubStatus = req.params.status;
  const collectionId = req.params.collId;

  taggerDao.setPublicationStatus(pubStatus, collectionId).then(
    function() {
      utils.sendResponse(res, {status: 'success'})
    }).error(function(err) {
      console.log(err)
  })

};

exports.getPublicationStatus = function (req, res) {
  const collectionId = req.params.collId;

  taggerDao.getPublicationStatus(collectionId).then(
    function(collection) {
      utils.sendResponse(res, collection)
    }).error(function(err) {
    console.log(err)
  })

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
  }).error(function (err) {
    console.log(err);
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

  }).error(function (err) {
    console.log(err);
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
  }).error(function (err) {
    console.log(err);
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
        })
          .error(function (err) {
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result.check === null) {

        taggerDao.createItemContentTarget(collId, typeId).then(function () {
          utils.sendResponse(res, {status: 'success'});
        }).error(function (e) {
          console.log(e);
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
    utils.sendResponse(res, {status: 'success'});
  }).error(function (e) {
    console.log(e);
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
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      // if new, add target
      if (result.check === null) {

        taggerDao.addTagTarget(collId, tagId)
          .then(function () {
            utils.sendResponse(res, {status: 'success'});
          }).error(function (e) {
          console.log(e);
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
    utils.sendResponse(res, {status: 'success'});
  }).error(function (e) {
    console.log(e);
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
          })
          .error(function (err) {
            console.log(err);
          });

      },
      areaList: function (callback) {
        taggerDao.getAreaIdsForCollection(collId)
          .then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    function (err, result) {
      if (err) {
        console.log(err);
      }
      utils.sendResponse(res, {status: 'success', areaTargets: result.areaList});

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
        )
    },
    function (collId, callback) {
      taggerDao.findCollectionById(collId)
        .then(
          function(collection) {

            callback(null, collection);
          }
        );
    }
  ], function (err, collection) {
    if (err) {
      console.log(err);
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
        })
          .error(function (err) {
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
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
        })
          .error(function (err) {
            console.log(err);
          });
      },
      areaList: function (callback) {
        taggerDao.getAreaIdsForCollection(collId).then(function (result) {
          callback(null, result);
        })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    function (err, result) {
      if (err) {
        console.log(err);
      }
      utils.sendResponse(res, {status: 'success', areaTargets: result.areaList});

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
        });
      },
      getCategory: function (callback) {
        taggerDao.findCategoryAssociation(collId).then(function (result) {
          callback(null, result);
        });
      },
      getAreas: function (callback) {
        taggerDao.findAreasForCollection(collId).then(function (result) {
          callback(null, result);
        });
      }
    },
    function (err, result) {
      if (err !== null) {
        console.log(err);
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
          }).error(function (err) {
          callback(err, null);
          console.log(err);
        });
      },
      checkCategory: function (callback) {
        taggerDao.findCategoryAssociation(id).then(function (result) {
          callback(null, result);
        })
          .error(function (err) {
            callback(err, null);
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err !== undefined && err !== null) {
        utils.sendResponse(res, {status: 'failed'});
        console.log(err);
      }
      // If no category exists for this collection,
      // add new entry.
      if (result.checkCategory === null) {
        taggerDao.addCollectionToCategory(id, category)
          .then(function () {
            utils.sendResponse(res, {status: 'success'});

          }).catch(function (err) {
          console.log(err);
        });
        // If category does exist, update to the current value.
      } else {
        taggerDao.updateCollectionCategory(id, category).then(
          function () {
            utils.sendResponse(res, {status: 'success'});

          }).catch(
          function (err) {
            console.log(err);
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
    console.log(err);
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
          console.log(err);
        });
      },
      addArea: function (callback) {
        taggerDao.addCollectionToArea(newCollectionId, areaId)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          callback(err);
        });
      },
      collections: function (callback) {
        taggerDao.findCollectionsInArea(areaId)
          .then(function (colls) {
            callback(null, colls);
          }).catch(function (err) {
          callback(err);
        });
      }
    }, function (err, results) {
      if (err) {
        console.log(err);
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
      console.log(err);
      res.end();
    }

    if (files.file !== undefined) {
      try {
        imageConvert(res, files, fields, config, updateImageInDb)
      } catch (err) {
        console.log(err);
        res.end();
      }
    }
    else {
      console.log('No image files were received. Aborting upload.');
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
        utils.sendResponse(res, {status: 'success'});
      }
    ).catch(function (err) {
        console.log(err);
      }
    );
  }
};

// The following are rest endpoints for external clients (e.g. Academic Commons).

/**
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.tagsForCollection = function (req, res) {
  var collId = req.params.collId;

  taggerDao.findTagsForCollection(collId).then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    console.log(err);
    utils.sendResponse(res, {status: 'failed'});
  });

};

/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.typesForCollection = function (req, res) {
  var collId = req.params.collId;

  taggerDao.findContentTypesForCollection(collId).then(function (types) {
    utils.sendResponse(res, types);
  })
    .catch(function (err) {
      console.log(err);
      utils.sendResponse(res, {status: 'failed'});
    });

};

/**
 * Retrieves a list of all collections for the public API.
 * @param req
 * @param res
 */
exports.allCollections = function (req, res) {

  taggerDao.retrieveAllCollections().then(function (collections) {
    utils.sendResponse(res, collections)

  }).catch(function (err) {
    console.log(err);

  });
};

/**
 * Retrieves single collection information for the public API.
 * @param req
 * @param res
 */
exports.collectionById = function (req, res) {
  const collId = req.params.id;

  async.series({
      collection: function (callback) {

        taggerDao.findCollectionById(collId).then(
          function (data) {
            callback(null, data);
          }).catch(
          function (err) {
            // trigger  error callback
            callback(err);
          });

      },
      categories: function (callback) {

        taggerDao.getCategoryForCollection(collId).then(
          function (data) {
            callback(null, data);
          }).catch(
          function (err) {
            callback(err);
          });

      },
      itemTypes: function (callback) {

        taggerDao.findContentTypesForCollection(collId).then(
          function (data) {
            callback(null, data);
          }).catch(
          function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
        utils.sendResponse(res, {status: 'failed', reason: err});
      } else {
        utils.sendResponse(res, result);
      }
    }
  );

};

/**
 * Retrieves list of collection by area ID for the public API.
 * @param req
 * @param res
 */
exports.collectionsByArea = function (req, res) {
  const areaId = req.params.id;

  taggerDao.getCollectionsByArea(areaId).then(
    function (collections) {
      utils.sendResponse(res, collections);

    }).catch(function (err) {
    console.log(err);
  });
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param res
 */
exports.collectionsBySubject = function (req, res) {
  const subjectId = req.params.id;
  const areaId = req.params.areaId;

  taggerDao.getCollectionsBySubjectAndArea(subjectId, areaId).then(
    function (collections) {
      utils.sendResponse(res, collections);
    }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves a list of collections by category for the public API.
 * @param req
 * @param res
 */
exports.allCollectionsByCategory = function (req, res) {
  const categoryId = req.params.id;

  taggerDao.getCollectionsByCategory(categoryId).then(function (collections) {
    utils.sendResponse(res, collections);
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.allCollectionsBySubject = function (req, res) {
  const subjectId = req.params.id;

  taggerDao.getCollectionsBySubject(subjectId).then(
    function (collections) {
      utils.sendResponse(res, collections);
    }).catch(function (err) {
    console.log(err);
  });
};

/**
 * Used by the Academic Commons.  Returns a JSON list of
 * objects retrieved from the eXist database host.  The fields
 * are the query term (title) and count.
 *
 * {
 *   item: {
 *     title: "1906",
 *     count: "4"
 * }
 *
 * Uses the 'collection' request parameter in the query.
 *
 * @param req
 * @param res
 */
exports.browseList = function (req, res) {
  const collection = req.params.collection;

  const http = require('http');
  const options = {
    headers: {
      accept: 'application/json'
    },
    host: config.externalHostA.host,
    port: config.externalHostA.port,
    path: config.externalHostA.path + collection,
    method: 'GET'
  };
  // If no error, handle response.
  function handleResponse(response) {

    var str = '';
    response.on('data', function (chunk) {
      // Add data as it returns.
      str += chunk;
    });

    response.on('end', function () {
      utils.sendResponse(res, str);

    });
  }

  const request = http.request(options, handleResponse);

  request.on('error', function (e) {
    console.log(e);
    request.end();
  });

  request.end();
};



