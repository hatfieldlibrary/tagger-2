/**
 * Created by mspalti on 1/9/17.
 */

'use strict';

const publicApiRepository = require('../../repository/tag/public');

/**
 * Retrieves a list of all tags.
 * @param req
 * @param res
 */
exports.subjectList = function (req, res) {
  publicApiRepository.subjectList(req, res);
};

/**
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.subjectsForCollection = function (req, res) {
  publicApiRepository.subjectsForCollection(req, res);

};

/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param res
 */
exports.subjectsByArea = function (req, res) {
  publicApiRepository.subjectsByArea(req, res);

};
