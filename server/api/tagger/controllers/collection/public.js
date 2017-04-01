/**
 * Public API endpoints for collection information.
 * Created by mspalti on 1/9/17.
 */

'use strict';

const async = require('async');
const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/collection-dao');
const apiMapper = require('../../map/collection');
const config = require('../../../../config/environment');
const logger = require('../../utils/error-logger');



/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.typesForCollection = function (req, res) {
  var collId = req.params.id;
  taggerDao.findContentTypesForCollection(collId).then(function (types) {
    utils.sendResponse(res, apiMapper.mapContentTypeList(types));
  }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });

};

/**
 * Retrieves a list of all collections for the public API.
 * @param req
 * @param res
 */
exports.allCollections = function (req, res) {
  taggerDao.retrieveAllCollections().then(function (collections) {

    utils.sendResponse(res, apiMapper.mapCollectionList(collections, 'all'));

  }).catch(function (err) {
    logger.repository(err);
    utils.sendErrorJson(res, err);
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
            callback(null, apiMapper.mapSingleCollection(data));
          }).catch(
          function (err) {
            // trigger  error callback
            callback(err);
          });

      },
      category: function (callback) {

        taggerDao.getCategoryForCollection(collId).then(
          function (data) {
            callback(null, apiMapper.mapCategory(data));
          }).catch(
          function (err) {
            callback(err);
          });

      },
      items: function (callback) {

        taggerDao.findContentTypesForCollection(collId).then(
          function (data) {
            callback(null, apiMapper.mapContentTypeList(data));
          }).catch(
          function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
        utils.sendErrorJson(res, err);
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
      utils.sendResponse(res, apiMapper.mapCollectionList(collections, 'area'));

    }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param res
 */
exports.collectionsBySubjectArea = function (req, res) {
  const subjectId = req.params.id;
  const areaId = req.params.areaId;

  taggerDao.getCollectionsBySubjectAndArea(subjectId, areaId).then(
    function (collections) {
      utils.sendResponse(res, apiMapper.mapCollectionList(collections, 'subject'));
    }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });

};

/**
 * Retrieves a list of collections by category for the public API.
 * @param req
 * @param res
 */
exports.collectionsByCategory = function (req, res) {
  const categoryId = req.params.id;

  taggerDao.getCollectionsByCategory(categoryId).then(function (collections) {
    utils.sendResponse(res, apiMapper.mapCollectionList(collections, 'category'));
  }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.collectionsBySubject = function (req, res) {
  const subjectId = req.params.id;

  taggerDao.getCollectionsBySubject(subjectId).then(
    function (collections) {
      utils.sendResponse(res, apiMapper.mapCollectionList(collections, 'subject'));
    }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
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
 * TODO: Consider returning external host information only; remove the proxy to external service.
 *
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
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(str);

    });
  }

  const request = http.request(options, handleResponse);

  request.on('error', function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
    request.end();
  });

  request.end();
};
