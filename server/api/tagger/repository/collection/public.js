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
/**
 * Public API endpoints for collection information.
 */

'use strict';

const async = require('async');
const taggerDao = require('../../dao/collection-dao');
const apiMapper = require('../../map/collection');
const config = require('../../../../config/environment');
const logger = require('../../utils/error-logger');
const utils = require('../../utils/response-utility');
const _ = require('lodash');
const path = require('path');
const filename = path.basename(__filename);

/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param callback response success callback
 * @param errorHandler error callback
 */
exports.typesForCollection = function (req, callback, errorHandler) {
  const collId = req.params.id;
  taggerDao.findContentTypesForCollection(collId)
    .then((types) => {
      let data;
      try {
        data = apiMapper.mapContentTypeList(types);
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    })
    .catch(function (err) {
      logger.repository(err);
      errorHandler(utils.createErrorResponse(filename, 'repo', err))
    });

};

/**
 * Retrieves a list of all collections for the public API.
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.allCollections = function (callback, errorHandler) {
  taggerDao.retrieveAllPublishedCollections()
    .then((collections) => {

      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'all');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    })
    .catch(function (err) {
      logger.repository(err);
      errorHandler(utils.createErrorResponse(filename, 'repo', err))
    });

};

/**
 * Retrieves single collection information for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.collectionById = function (req, callback, errorHandler) {
  const collId = req.params.id;

  async.series({
      collection: function (series) {

        taggerDao.findCollectionById(collId).then(
          (data) => {
            let collection;
            try {
              collection = apiMapper.mapSingleCollection(data);
            } catch (err) {
              logger.map(err);
              errorHandler(utils.createErrorResponse(filename, 'map', err))
            }
            series(null, collection);
          }).catch(
          function (err) {
            logger.dao(err);
            // trigger  error callback
            errorHandler('dao', err);
          });

      },
      category: function (series) {

        taggerDao.getCategoryForCollection(collId).then(
          (data) => {
            let categoryResult;
            if (data) {
              try {
                categoryResult = apiMapper.mapCategory(data);
              } catch (err) {
                logger.map(err);
                errorHandler(utils.createErrorResponse(filename, 'map', err))
              }
            }
            series(null, categoryResult);

          }).catch(
          function (err) {
            logger.dao(err);
            errorHandler(utils.createErrorResponse(filename, 'dao', err))
          });

      },
      itemTypes: function (series) {

        taggerDao.findContentTypesForCollection(collId).then(
          (data) => {
            let itemResult;
            if (data) {
              try {
                itemResult = apiMapper.mapContentTypeList(data)
              } catch (err) {
                logger.map(err);
                errorHandler(utils.createErrorResponse(filename, 'map', err))
              }
            }
            series(null, itemResult);
          }).catch(
          function (err) {
            logger.dao(err);
            errorHandler(utils.createErrorResponse(filename, 'dao', err))
          });
      },
      subjects: function (series) {
        taggerDao.findTagsForCollection(collId).then(
          (data) => {
            let tagResult;
            if (data) {
              try {
                tagResult = apiMapper.mapTagList(data)
              } catch (err) {
                logger.map(err);
                errorHandler(utils.createErrorResponse(filename, 'map', err))
              }
            }
            series(null, tagResult);
          }).catch(
          function (err) {
            logger.dao(err);
            errorHandler(utils.createErrorResponse(filename, 'dao', err))
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.repository(err);
        errorHandler(utils.createErrorResponse(filename, 'repo', err))
      } else {
        callback(result);
      }
    }
  );

};

/**
 * Retrieves list of collection by area ID for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.collectionsByArea = function (req, callback, errorHandler) {
  const areaId = req.params.id;


  taggerDao.getCollectionsByArea(areaId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'area')
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);

    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.collectionsBySubjectArea = function (req, callback, errorHandler) {
  const subjectId = req.params.id;
  const areaId = req.params.areaId;

  taggerDao.getCollectionsBySubjectAndArea(areaId, subjectId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'subject');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });

};

/**
 * Retrieves a list of collections by category for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.collectionsByCategory = function (req, callback, errorHandler) {
  const categoryId = req.params.id;

  taggerDao.getCollectionsByCategory(categoryId)
    .then((collections) => {
    let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'category');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.collectionsBySubject = function (req, callback, errorHandler) {
  const subjectId = req.params.id;

  taggerDao.getCollectionsBySubject(subjectId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'subject');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Retrieves collections by content type (from all areas)
 */
exports.collectionsByContentType = function (req, callback, errorHandler) {
  const contentTypeId = req.params.id;

  taggerDao.getCollectionsByContentType(contentTypeId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'subject');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Retrieves collections by content type and area
 */
exports.collectionsByAreaAndContentType = function (req, callback, errorHandler) {
  const areaId = req.params.id;
  const contentTypeId = req.params.typeId;

  taggerDao.getCollectionsByAreaAndContentType(areaId, contentTypeId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'subject');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Retrieves collections by content type and area
 */
exports.collectionsBySubjectAndContentType = function (req, callback, errorHandler) {
  const contentTypeId = req.params.typeId;
  const subjectId = req.params.subjectId;

  taggerDao.getCollectionsBySubjectAndContentType(contentTypeId, subjectId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'subject');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Retrieves collections by content type and area
 */
exports.collectionsByAreaSubjectAndContentType = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;
  const contentTypeId = req.params.typeId;
  const subjectId = req.params.subjectId;

  taggerDao.getCollectionsByAreaSubjectAndContentType(areaId, contentTypeId, subjectId).then(
    (collections) => {
      let data;
      try {
        data = apiMapper.mapCollectionList(collections, 'subject');
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Returns a JSON list of objects retrieved from the
 * external host defined in configuration (externalHostA).
 * The fields returned by the current service are the query
 * term (title) and count. This is not defined in the tagger API.
 *
 * {
 *   item: {
 *     title: "1906",
 *     count: "4"
 * }
 *
 * Introduces a dependency on an external service and
 * confusion about the API contract.
 *
 * TODO: Consider returning external host information to client; remove this proxy to external service.
 *
 *
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.browseList = function (req, res, errorHandler) {
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
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');

      res.end(str);

    });
  }

  const request = http.request(options, handleResponse);

  request.on('error', function (err) {
    logger.image(err);
    errorHandler(utils.createErrorResponse(filename, 'external', err))
    request.end();
  });

  request.end();

};
/**
 * Finds related collections by the list of provided subjects. It would be more efficient
 * to execute a single query with OR operators joining multiple subject IDs if there is a
 * good way to do this with sequelize raw queries.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.findRelatedCollections = function (req, callback, errorHandler) {

  const collId = req.params.id;
  const subjects = req.params.subjects;

  let subjectArray = subjects.split(',');

  let relatedCollections = [];

  for (let i = 0; i < subjectArray.length; i++) {
    taggerDao.findRelatedCollections(collId, subjectArray[i])
      .then((result) => {
        let related;
        try {
          related = apiMapper.mapRelatedCollections(result);
        } catch (err) {
          logger.map(err);
          errorHandler(utils.createErrorResponse(filename, 'map', err))
        }
        relatedCollections.push(related);

        if (i === subjectArray.length - 1) {
          _dedupeRelatedCollections(callback, errorHandler, relatedCollections);
        }

      }).catch(function (err) {
      logger.repository(err);
    });
  }

};

/**
 * Uses lodash to dedupe the result of multiple queries for related collections.
 * The collection count field is set to the number of times that the collection appears
 * in the list. Calls the provides http response callback.
 * @param callback success response callback
 * @param collections
 * @private
 */
function _dedupeRelatedCollections(callback, errorHandler, collections) {

  try {
    // flatten the collections array.
    let intersection = _.flattenDeep(collections);
    // map count values.
    _.map(intersection, (c) => {
      c.count = _countDuplicates(intersection, c.id)
    });
    // get the unique entries in the list.
    let uniqueCollections = _.uniqBy(intersection, function (c) {
      return c.id;
    });

    callback({related: uniqueCollections});

  } catch (err) {

    errorHandler('reduce', err);
  }


}

/**
 * Filters collection array by collection id and returns the length of the
 * resulting array.
 * @param collections
 * @param id
 * @returns {Number}
 * @private
 */
function _countDuplicates(collections, id) {
  return _.filter(collections, function (c) {
    return c.id == id
  }).length;
}
