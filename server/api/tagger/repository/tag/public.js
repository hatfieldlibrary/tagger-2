/**
 * Created by mspalti on 4/4/17.
 */
'use strict';

const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/tags-dao');
const logger = require('../../utils/error-logger');
const apiMapper = require('../../map/tag');
const path = require('path');
const filename = path.basename(__filename);

/**
 * Retrieves a list of all tags.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectList = function (req, callback, errorHandler) {

  taggerDao.findAllTags()
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "all");
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
 * Retrieves the tags associated with a single collection. Used by
 * both admin interface and public REST API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsForCollection = function (req, callback, errorHandler) {
  const collId = req.params.id;

  taggerDao.findTagsForCollection(collId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "all");
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(utils.createErrorResponse(filename, 'repo', err))
    });

};

/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsByArea = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.findTagsInArea(id)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "all");
      } catch (err) {
        logger.map(err);
        errorHandler(utils.createErrorResponse(filename, 'map', err))
      }
      callback(data);
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(utils.createErrorResponse(filename, 'repo', err))
    });

};
