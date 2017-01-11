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

'use strict';

const taggerDao = require('../dao/category-dao');
const utils = require('../utils/response-utility');
const logger = require('../utils/error-logger');

/**
 * Retrieves the list of all collection groups.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.findAll().then(function (categories) {
    utils.sendResponse(res, categories);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Returns collection group title and usage count for dashboard.
 * @param req
 * @param res
 */
exports.categoryCountByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.categoryCountByArea(areaId).then(function (categories) {
    utils.sendResponse(res, categories);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Requests the category associated with a collection. The model allows
 * for many-to-many relationships between collections and categories.
 * This is incorrect.  The relationship should be one-to-many.
 *
 * The method returns an array of length one if the collection exists.
 * The join will return Category information or null.
 *
 * TODO: The model could be refactored for one-to-many. Dangerous for existing data, however.
 *
 * @param req
 * @param res
 */
exports.collectionsByCategory = function (req, res) {
  const collId = req.params.collId;
  taggerDao.categoriesByCollectionId(collId).then(function (categories) {
    utils.sendResponse(res, categories);
  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Retrieves list of collection groups by area.
 * @param req
 * @param res
 */
exports.listByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.listByArea(areaId).then(function (categories) {
    utils.sendResponse(res, categories);
  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Retrieves single collection group information by category id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  const categoryId = req.params.id;

  taggerDao.byId(categoryId).then(function (category) {
    utils.sendResponse(res, category);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Adds a new collection group with title.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const title = req.body.title;

  taggerDao.add(title).then(function (result) {
    utils.sendResponse(res, {status: 'success', id: result.id});
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Updates collection group.
 * @param req
 * @param res
 */
exports.update = function (req, res) {

  const title = req.body.title;
  const url = req.body.url;
  const description = req.body.description;
  const linkLabel = req.body.linkLabel;
  const id = req.body.id;
  const areaId = req.body.areaId;

  const data = {
    title: title,
    url: url,
    linkLabel: linkLabel,
    description: description,
    areaId: areaId
  };

  taggerDao.update(data, id).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Deletes collection group.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {

  const catId = req.body.id;

  taggerDao.delete(catId).then(function () {
    utils.sendResponse(res, {status: 'success', id: catId});
  }).catch(function (err) {
    logger.dao(err);
  });

};







