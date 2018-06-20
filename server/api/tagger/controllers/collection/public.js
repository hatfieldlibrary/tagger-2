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
 * Controllers for collection information available via the public API.
 * Created by mspalti on 1/9/17.
 */

'use strict';

const publicApiRepository = require('../../repository/collection/public');
const utils = require('../../utils/response-utility');

/**
 * Retrieves the types associated with a single collection.  Used by
 * both admin interface and public REST API.
 * @param req
 * @param res
 */
exports.typesForCollection = function (req, res, next) {
  publicApiRepository.typesForCollection(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves a list of all collections for the public API.
 * @param req
 * @param res
 */
exports.allCollections = function (req, res, next) {
  publicApiRepository.allCollections(
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves single collection information for the public API.
 * @param req
 * @param res
 */
exports.collectionById = function (req, res, next) {
  publicApiRepository.collectionById(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves list of collection by area ID for the public API.
 * @param req
 * @param res
 */
exports.collectionsByArea = function (req, res, next) {
  publicApiRepository.collectionsByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves a list of collections by subject and area for the public API.
 * @param req
 * @param res
 */
exports.collectionsBySubjectArea = function (req, res, next) {
  publicApiRepository.collectionsBySubjectArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves a list of collections by category for the public API.
 * @param req
 * @param res
 */
exports.collectionsByCategory = function (req, res, next) {
  publicApiRepository.collectionsByCategory(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves a list of collections by category and content types for the public API.
 * @param req
 * @param res
 */
exports.collectionsByCategoryAndType = function (req, res, next) {
  publicApiRepository.collectionsByCategoryAndType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves a list of collections by category and subjects for the public API.
 * @param req
 * @param res
 */
exports.collectionsByCategoryAndSubject = function (req, res, next) {
  publicApiRepository.collectionsByCategoryAndSubject(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};


/**
 * Retrieves a list of collections by area, category and content types for the public API.
 * @param req
 * @param res
 */
exports.collectionsByAreaCategoryAndType = function (req, res, next) {
  publicApiRepository.collectionsByAreaCategoryAndType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.collectionsBySubject = function (req, res, next) {
  publicApiRepository.collectionsBySubject(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};


/**
 * Retrieves a list of collections by area, category and subjects for the public API.
 * @param req
 * @param res
 */
exports.collectionsByAreaCategoryAndSubject = function (req, res, next) {
  publicApiRepository.getCollectionsByAreaCategoryAndSubject(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves a list of collections by area, category and subjects for the public API.
 * @param req
 * @param res
 */
exports.collectionsByAreaCategorySubjectAndType = function (req, res, next) {
  publicApiRepository.getCollectionsByAreaCategorySubjectAndType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};

/**
 * Retrieves collections by subject (from all areas)
 */
exports.collectionsByContentType = function (req, res, next) {
  publicApiRepository.collectionsByContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Retrieves collections by subject and area
 */
exports.collectionsByAreaAndContentType = function (req, res, next) {
  publicApiRepository.collectionsByAreaAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Retrieves collections by area, content type and subject.
 */
exports.collectionsBySubjectAndContentType = function (req, res, next) {
  publicApiRepository.collectionsBySubjectAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Retrieves collections by area, content type and subject.
 */
exports.collectionsByAreaSubjectAndContentType = function (req, res, next) {
  publicApiRepository.collectionsByAreaSubjectAndContentType(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
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
exports.browseList = function (req, res, next) {
  publicApiRepository.browseList(
    req,
    res, // the response object is needed by the repository method.
    (err) => {
      return next(err);
    });


};

exports.findRelatedCollections = function (req, res, next) {
  publicApiRepository.findRelatedCollections(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
