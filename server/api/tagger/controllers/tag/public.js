/**
 * Created by mspalti on 1/9/17.
 */

'use strict';

const publicApiRepository = require('../../repository/tag/public');
const utils = require('../../utils/response-utility');

/**
 * Retrieves a list of all tags.
 * @param req
 * @param res
 * @param next
 */
exports.subjectList = function (req, res, next) {
  publicApiRepository.subjectList(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 * @param next
 */
exports.subjectsForCollection = function (req, res, next) {
  publicApiRepository.subjectsForCollection(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param res
 * @param next
 */
exports.subjectsByArea = function (req, res, next) {
  publicApiRepository.subjectsByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
