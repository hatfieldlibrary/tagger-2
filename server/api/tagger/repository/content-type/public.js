'use strict';

const utils = require('../../utils/response-utility');
const apiMapper = require('../../map/content-type');
const taggerDao = require('../../dao/content-dao');
const logger = require('../../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);

function _mapTypeList(types, errorHandler) {
  let data;
  try {
    data = apiMapper.mapTypes(types);
  } catch (err) {
    logger.map(err);
    errorHandler(utils.createErrorResponse(filename, 'map', err))
  }
  return data;
}

exports.contentTypes = (req, callback, errorHandler) => {
  taggerDao.getContentTypes().then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByArea = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  taggerDao.getContentTypesForArea(areaId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByCategory= (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  taggerDao.getContentTypesForCategory(categoryId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesBySubject = (req, callback, errorHandler) => {
  const subjectId = req.params.subjectId;

  taggerDao.getContentTypesForSubject(subjectId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByContentType = (req, callback, errorHandler) => {
  const id = req.params.id;

  taggerDao.getContentTypesForContentType(id).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByAreaAndSubject = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const subjectId = req.params.subjectId;

  taggerDao.getContentTypesForAreaSubjectQuery(areaId, subjectId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByAreaAndCategory = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const categoryId = req.params.categoryId;

  taggerDao.getContentTypesForAreaCategoryQuery(areaId, categoryId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByAreaCategoryAndContentType = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const categoryId = req.params.categoryId;
  const typeId = req.params.typeId;

  taggerDao.getContentTypesForAreaCategoryTypeQuery(areaId, categoryId, typeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByAreaCategoryAndSubject = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const categoryId = req.params.categoryId;
  const subjectId = req.params.subjectId;

  taggerDao.getContentTypesForAreaCategorySubjectQuery(areaId, categoryId, subjectId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByAreaCategorySubjectAndContentType = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const categoryId = req.params.categoryId;
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.getContentTypesForAreaCategorySubjectTypeQuery(areaId, categoryId, subjectId, typeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};
exports.contentTypesBySubjectAndContentType = (req, callback, errorHandler) => {
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.getContentTypesForAreaSubjectQuery(subjectId, typeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByAreaAndSubjectAndContentType = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.getContentTypesForAreaSubjectContentTypeQuery(areaId, subjectId, typeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByCategoryAndContentType = (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  const typeId = req.params.typeId;

  taggerDao.getContentTypesForCategoryAndContentType(categoryId, typeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByCategoryAndSubject = (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  const subjectId = req.params.subjectId;

  taggerDao.getContentTypesForCategoryAndSubject(categoryId, subjectId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

exports.contentTypesByCategorySubjectAndContentType = (req, callback, errorHandler) => {
  const categoryId = req.params.categoryId;
  const subjectId = req.params.subjectId;
  const typeId = req.params.typeId;

  taggerDao.getContentTypesForCategorySubjectAndContentType(categoryId, subjectId, typeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};

/**
 * Retrieves list of content types by area and content type
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.contentTypesByAreaAndContentType = (req, callback, errorHandler) => {
  const areaId = req.params.areaId;
  const contentTypeId = req.params.typeId;

  taggerDao.getContentTypesForAreaContentTypeQuery(areaId, contentTypeId).then(
    (types) => {
      callback(_mapTypeList(types, errorHandler));
    }).catch(function (err) {
    logger.repository(err);
    errorHandler(utils.createErrorResponse(filename, 'repo', err))
  });
};


