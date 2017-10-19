'use strict';

const repository = require('../../repository/content-type/public');
const utils = require('../../utils/response-utility');

/**
 * Retrieves collections by area, content type and subject.
 */
exports.contentTypes = function (req, res, next) {
  repository.contentTypes(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

exports.contentTypesByArea = function (req, res, next) {
  repository.contentTypesByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

exports.contentTypesBySubject = function (req, res, next) {
  repository.contentTypesBySubject(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

exports.contentTypesByContentType = function (req, res, next) {
  repository.contentTypesByContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

exports.contentTypesByAreaAndContentType = function (req, res, next) {
  repository.contentTypesByAreaAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
exports.contentTypesByAreaAndSubject = function (req, res, next) {
  repository.contentTypesByAreaAndSubject(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

exports.contentTypesBySubjectAndContentType = function (req, res, next) {
  repository.contentTypesBySubjectAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

exports.contentTypesByAreaAndSubjectAndContentType = function (req, res, next) {
  repository.contentTypesByAreaAndSubjectAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
