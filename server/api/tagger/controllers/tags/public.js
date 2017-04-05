/**
 * Created by mspalti on 1/9/17.
 */

'use strict';

const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/tags-dao');
const logger = require('../../utils/error-logger');
const apiMapper = require('../../map/tag');

/**
 * Retrieves a list of all tags.
 * @param req
 * @param res
 */
exports.subjectList = function (req, res) {

  taggerDao.findAllTags().then(function (tags) {
    utils.sendResponse(res, apiMapper.mapTags(tags, "all"));
  }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });
};

/**
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.subjectsForCollection = function (req, res) {
  var collId = req.params.id;

  taggerDao.findTagsForCollection(collId).then(function (tags) {
    utils.sendResponse(res, apiMapper.mapTags(tags, "collection"));
  }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });

};

/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param res
 */
exports.subjectsByArea = function (req, res) {
  const id = req.params.id;

  taggerDao.findTagsInArea(id).then(function (tags) {
    utils.sendResponse(res, apiMapper.mapTags(tags));
  }).catch(function (err) {
    logger.dao(err);
    utils.sendErrorJson(res, err);
  });

};
