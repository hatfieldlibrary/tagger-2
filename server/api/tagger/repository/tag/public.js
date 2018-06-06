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
        data = apiMapper.mapTags(tags, "collection");
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
        data = apiMapper.mapTags(tags, "area");
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
 * Retrieves a list of subjects by content type for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsByContentType = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.findTagsForContentType(id)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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
 * Retrieves a list of subjects by content type for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsBySubject = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.findTagsForSubject(id)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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
 * Retrieves a list of subjects by area and content type for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsByAreaAndSubject = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;
  const subjectId = req.params.subjectId;

  taggerDao.findTagsForAreaAndSubject(areaId, subjectId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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
 * Retrieves a list of subjects by area and content type for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsByAreaAndContentType = function (req, callback, errorHandler) {
  const areaId = req.params.id;
  const contentTypeId = req.params.typeId;

  taggerDao.findTagsForAreaAndContentType(areaId, contentTypeId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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
 * Retrieves a list of subjects by area and content type for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsBySubjectAndContentType = function (req, callback, errorHandler) {
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.findTagsForSubjectAndContentType(subjectId, typeId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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
 * Retrieves a list of subjects by area and content type for the public API.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.subjectsByAreaSubjectAndContentType = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.findTagsForAreaSubjectAndContentType(areaId, subjectId, typeId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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

exports.subjectsByCategoryAndSubject = (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  const subjectId = req.params.subjectId;

  taggerDao.findTagsForCategoryAndSubject(categoryId, subjectId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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

exports.subjectsByCategoryAndContentType = (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  const typeId = req.params.typeId;

  taggerDao.findTagsForCategoryAndContentType(categoryId, typeId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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

exports.subjectsByCategorySubjectAndContentType = (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.findTagsForCategorySubjectAndContentType(categoryId, subjectId, typeId)
    .then((tags) => {
      let data;
      try {
        data = apiMapper.mapTags(tags, "area");
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
