/*
 * Copyright (c) 2018.
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

'use strict';

const utils = require('../../utils/response-utility');
const apiMapper = require('../../map/category');
const taggerDao = require('../../dao/category-dao');
const logger = require('../../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);

function _mapTypeList(categories, errorHandler) {
  let data;
  try {
    data = apiMapper.mapCategories(categories);
  } catch (err) {
    logger.map(err);
    errorHandler(utils.createErrorResponse(filename, 'map', err))
  }
  return data;

}

exports.list = (req, callback, errorHandler) => {
  taggerDao.findAll().then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoriesByArea = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;

  taggerDao.categoriesByArea(areaId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoryByContentType = (req, callback, errorHandler) => {
  const typeId = req.params.typeId;

  taggerDao.categoryByContentType(typeId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoryBySubject = (req, callback, errorHandler) => {
  const subjectId = req.params.subjectId;

  taggerDao.categoryBySubject(subjectId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoryByAreaAndContentType = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const typeId = req.params.typeId;

  taggerDao.categoryByAreaAndContentType(areaId, typeId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoryByAreaAndSubject = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const subjectId = req.params.subjectId;

  taggerDao.categoryByAreaAndSubject(areaId, subjectId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoryBySubjectAndContentType = (req, callback, errorHandler) => {
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.categoryBySubjectAndContentType(subjectId, typeId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.categoryByAreaSubjectAndContentType = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;


  taggerDao.categoryByAreaSubjectAndContentType(areaId, subjectId, typeId).then(
    (categories) => {
      callback(_mapTypeList(categories, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });

};
