/**
 * Controllers for collection information available via the public API.
 * Created by mspalti on 1/9/17.
 */

'use strict';

const publicApiRepository = require('../../repository/collection/public');

/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.typesForCollection = function (req, res) {
  publicApiRepository.typesForCollection(req, res);
};

/**
 * Retrieves a list of all collections for the public API.
 * @param req
 * @param res
 */
exports.allCollections = function (req, res) {
  publicApiRepository.allCollections(req, res);

};

/**
 * Retrieves single collection information for the public API.
 * @param req
 * @param res
 */
exports.collectionById = function (req, res) {
  publicApiRepository.collectionById(req, res);

};

/**
 * Retrieves list of collection by area ID for the public API.
 * @param req
 * @param res
 */
exports.collectionsByArea = function (req, res) {
  publicApiRepository.collectionsByArea(req, res);
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param res
 */
exports.collectionsBySubjectArea = function (req, res) {
  publicApiRepository.collectionsBySubjectArea(req, res);

};

/**
 * Retrieves a list of collections by category for the public API.
 * @param req
 * @param res
 */
exports.collectionsByCategory = function (req, res) {
  publicApiRepository.collectionsByCategory(req, res);

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.collectionsBySubject = function (req, res) {
  publicApiRepository.collectionsBySubject(req, res);
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
exports.browseList = function (req, res) {
  publicApiRepository.browseList(req, res);

};
