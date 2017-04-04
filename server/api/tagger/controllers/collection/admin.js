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

/**
 * Returns ctype (item type) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.countCTypesByArea = function (req, res) {
  collectionRepository.countCTypesByArea(req, res);
};
/**
 * Gets browse type (search option types) by area for overview dashboard.
 * @param req
 * @param res
 */
exports.browseTypesByArea = function (req, res) {
  collectionRepository.browseTypesByArea(req, res);
};
/**
 * Sets the publication status of the collection.
 * @param req
 * @param res
 */
exports.setPublicationStatus = function (req, res) {
  collectionRepository.setPublicationStatus(req, res);
};
/**
 * Returns the publication status of the collection.
 * @param req
 * @param res
 */
exports.getPublicationStatus = function (req, res) {
 collectionRepository.getPublicationStatus(req, res);

};
/**
 * Returns repoType (search option) counts for the overview
 * dashboard.
 * @param req
 * @param res
 */
exports.repoTypesByArea = function (req, res) {
  collectionRepository.repoTypesByArea(req, res);
};
/**
 * Retrieves the collections by area id for the administrative
 * collection panel.
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  collectionRepository.list(req, res);
};
/**
 * Returns the first collection for the area.
 * @param req
 * @param res
 */
exports.getFirstCollectionInArea = function (req, res) {
 collectionRepository.getFirstCollectionInArea(req, res);
};
/**
 * Retrieves data for a single collection by collection id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  collectionRepository.byId(req, res);

};
/**
 * Updates metadata and associations for a single collection.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  collectionRepository.update(req, res);

};
/**
 * Deletes a collection.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  collectionRepository.delete(req, res);

};
/**
 * Adds a new collection with title field metadata
 * and creates the collection association with the
 * collection area.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
 collectionRepository.add(req, res);

};

/**
 * Retrieves areas by collection id for the administrative
 * collections panel.
 * @param req
 * @param res
 */
exports.areas = function (req, res) {
  areaRepository.areas(req, res);

};
/**
 * Adds collection to a collection area after first
 * checking for a existing association then returns
 * new area list.
 * @param req
 * @param res
 */
exports.addAreaTarget = function (req, res) {
  areaRepository.addAreaTarget(req, res);
};
/**
 * Removes the association between a collection and a collection
 * area.  Also removes the category (collection group) from the collection,
 * Returns new area list after completion.
 * @param req
 * @param res
 */
exports.removeAreaTarget = function (req, res) {
  areaRepository.removeAreaTarget(req, res);
};
/**
 * Image upload. Reads multipart form data and creates
 * thumbnail image. Writes thumbnail and full size image to
 * directories in the configuration's image path directory.
 * @param req
 * @param res
 * @param config
 */
exports.updateImage = function (req, res, config) {
  imageRepository.updateImage(req, res, config);
};
/**
 * Add a subject tag to the collection after first checking
 * whether the association already exists.
 * @param req
 * @param res
 */
exports.addTagTarget = function (req, res) {
  tagRepository.addTagTarget(req, res);
};
/**
 * Removes a subject tag from the collection.
 * @param req
 * @param res
 */
exports.removeTagTarget = function (req, res) {
  tagRepository.removeTagTarget(req, res);
};
/**
 * Adds a content type to the collection metadata after first
 * checking whether the association already exists.
 * @param req
 * @param res
 */
exports.addTypeTarget = function (req, res) {
  typeRepository.addTypeTarget(req, res);
};

/**
 * Removes a content type association from the collection.
 * @param req
 * @param res
 */
exports.removeTypeTarget = function (req, res) {
  typeRepository.removeTypeTarget(req, res);
};
