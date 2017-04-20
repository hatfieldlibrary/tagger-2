/*
 * Copyright (c) 2016.
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
 * Controllers for the collection administration API.
 *
 * @author Michael Spalti
 */

'use strict';

const collectionRepository = require('../../repository/collection/collection');
const areaRepository = require('../../repository/collection/area');
const imageRepository = require('../../repository/collection/image');
const tagRepository = require('../../repository/collection/tag');
const typeRepository = require('../../repository/collection/type');
const utils = require('../../utils/response-utility');

/**
 * Returns ctype (item type) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.countCTypesByArea = function (req, res, next) {
  collectionRepository.countCTypesByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Gets browse type (search option types) by area for overview dashboard.
 * @param req
 * @param res
 */
exports.browseTypesByArea = function (req, res, next) {
  collectionRepository.browseTypesByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Sets the publication status of the collection.
 * @param req
 * @param res
 */
exports.setPublicationStatus = function (req, res, next) {
  collectionRepository.setPublicationStatus(
    req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Returns the publication status of the collection.
 * @param req
 * @param res
 */
exports.getPublicationStatus = function (req, res, next) {
  collectionRepository.getPublicationStatus(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
/**
 * Returns repoType (search option) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.repoTypesByArea = function (req, res, next) {
  collectionRepository.repoTypesByArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Retrieves the collections by area id for the administrative
 * collection panel.
 * @param req
 * @param res
 */
exports.list = function (req, res, next) {
  collectionRepository.list(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Returns the first collection for the area.
 * @param req
 * @param res
 */
exports.getFirstCollectionInArea = function (req, res, next) {
  collectionRepository.getFirstCollectionInArea(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Retrieves data for a single collection by collection id.
 * @param req
 * @param res
 */
exports.byId = function (req, res, next) {
  collectionRepository.byId(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Updates metadata and associations for a single collection.
 * @param req
 * @param res
 */
exports.update = function (req, res, next) {
  collectionRepository.update(req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Deletes a collection.
 * @param req
 * @param res
 */
exports.delete = function (req, res, next) {
  collectionRepository.delete(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Adds a new collection with title field metadata
 * and creates the collection association with the
 * collection area.
 * @param req
 * @param res
 */
exports.add = function (req, res, next) {
  collectionRepository.add(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Retrieves areas by collection id for the administrative
 * collections panel.
 * @param req
 * @param res
 */
exports.areas = function (req, res, next) {
  areaRepository.areas(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Adds collection to a collection area after first
 * checking for a existing association then returns
 * new area list.
 * @param req
 * @param res
 */
exports.addAreaTarget = function (req, res, next) {
  areaRepository.addAreaTarget(
    req,
    (data) => {
      utils.sendSuccessAndDataJson(res, data);
    },
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });

};
/**
 * Removes the association between a collection and a collection
 * area.  Also removes the category (collection group) from the collection,
 * Returns new area list after completion.
 * @param req
 * @param res
 */
exports.removeAreaTarget = function (req, res, next) {
  areaRepository.removeAreaTarget(
    req,
    (data) => {
      utils.sendSuccessAndDataJson(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Image upload. Reads multipart form data and creates
 * thumbnail image. Writes thumbnail and full size image to
 * directories in the configuration's image path directory.
 * @param req
 * @param res
 * @param config
 */
exports.updateImage = function (req, res, config, next) {
  imageRepository.updateImage(
    req,
    config,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Add a subject tag to the collection after first checking
 * whether the association already exists.
 * @param req
 * @param res
 */
exports.addTagTarget = function (req, res, next) {
  tagRepository.addTagTarget(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Removes a subject tag from the collection.
 * @param req
 * @param res
 */
exports.removeTagTarget = function (req, res, next) {
  tagRepository.removeTagTarget(req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });
};
/**
 * Adds a content type to the collection metadata after first
 * checking whether the association already exists.
 * @param req
 * @param res
 */
exports.addTypeTarget = function (req, res, next) {
  typeRepository.addTypeTarget(
    req,
    (data) => {
      utils.sendResponse(res, data);
    },
    (err) => {
      return next(err);
    });
};

/**
 * Removes a content type association from the collection.
 * @param req
 * @param res
 */
exports.removeTypeTarget = function (req, res, next) {
  typeRepository.removeTypeTarget(req,
    () => {
      utils.sendSuccessJson(res);
    },
    (err) => {
      return next(err);
    });
};
