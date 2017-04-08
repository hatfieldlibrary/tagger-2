/**
 * Controllers for collection information available via the public API.
 * Created by mspalti on 1/9/17.
 */

'use strict';

const publicApiRepository = require('../../repository/collection/public');
const utils = require('../../utils/response-utility');

/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.typesForCollection = function (req, res, next) {
  publicApiRepository.typesForCollection(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );
};

/**
 * Retrieves a list of all collections for the public API.
 * @param req
 * @param res
 */
exports.allCollections = function (req, res, next) {
  publicApiRepository.allCollections(
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );

};

/**
 * Retrieves single collection information for the public API.
 * @param req
 * @param res
 */
exports.collectionById = function (req, res, next) {
  publicApiRepository.collectionById(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );

};

/**
 * Retrieves list of collection by area ID for the public API.
 * @param req
 * @param res
 */
exports.collectionsByArea = function (req, res, next) {
  publicApiRepository.collectionsByArea(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param res
 */
exports.collectionsBySubjectArea = function (req, res, next) {
  publicApiRepository.collectionsBySubjectArea(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );

};

/**
 * Retrieves a list of collections by category for the public API.
 * @param req
 * @param res
 */
exports.collectionsByCategory = function (req, res, next) {
  publicApiRepository.collectionsByCategory(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.collectionsBySubject = function (req, res, next) {
  publicApiRepository.collectionsBySubject(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );
};

/**
 * Returns a JSON list of objects retrieved from the
 * external host defined in configuration (externalHostA).
 * The fields returned by the current service are the query
 * term (title) and count. This is not defined in the tagger API.
 *
 * @param req
 * @param res
 */
exports.browseList = function (req, res, next) {
  publicApiRepository.browseList(
    req,
    res,
    utils.errorHandler(next, err) );


};

exports.findRelatedCollections = function (req, res, next) {
  publicApiRepository.findRelatedCollections(
    req,
    utils.responseCallback(res, data),
    utils.errorHandler(next, err) );

};
