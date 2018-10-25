


'use strict';

const repository = require('../../repository/category/public');
const utils = require('../../utils/response-utility');


/**
 * Retrieves the list of all collection groups (categories).
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  repository.list(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoriesByArea = (req, res) => {
  repository.categoriesByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoryByContentType = (req, res) => {
  repository.categoryByContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoryBySubject = (req, res) => {
  repository.categoryBySubject (
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoryByAreaAndContentType = (req, res) => {
  repository.categoryByAreaAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoryByAreaAndSubject = (req, res) => {
  repository.categoryByAreaAndSubject(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoryBySubjectAndContentType = (req, res) => {
  repository.categoryBySubjectAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

exports.categoryByAreaSubjectAndContentType = (req, res) => {
  repository.categoryByAreaSubjectAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
