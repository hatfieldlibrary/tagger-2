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

const taggerDao = require('../dao/category-dao');
const utils = require('../utils/response-utility');
const logger = require('../utils/error-logger');

/**
 * Retrieves the list of all collection groups.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.list = function (req, callback, errorHandler) {

  taggerDao.findAll()
    .then((categories) => {
      callback(categories);
    })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });

};

/**
 * Returns collection group title and usage count for dashboard.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.categoryCountByArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.categoryCountByArea(areaId)
    .then((categories) => {
      callback(categories);
    })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
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
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.categoryByCollection = function (req, callback, errorHandler) {
  const collId = req.params.collId;
  taggerDao.categoriesByCollectionId(collId)
    .then((categories) => {
      callback(categories);
    })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });
};

/**
 * Retrieves list of collection groups by area.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.listByArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.listByArea(areaId)
    .then((categories) => {
      callback(categories);
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(err);
    });
};

/**
 * Retrieves single collection group information by category id.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.byId = function (req, callback, errorHandler) {
  const categoryId = req.params.id;

  taggerDao.byId(categoryId)
    .then((category) => {
      callback(category);
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(err);
    });

};

/**
 * Adds a new collection group with title.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.add = function (req, callback, errorHandler) {
  const title = req.body.title;

  taggerDao.add(title)
    .then((result) => {
      callback({status: 'success', id: result.id});
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(err);
    });

};

/**
 * Updates collection group.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.update = function (req, callback, errorHandler) {

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

  taggerDao.update(data, id)
    .then(() => {
      callback();
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(err);
    });

};

/**
 * Deletes collection group.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.delete = function (req, callback, errorHandler) {

  const catId = req.params.id;

  taggerDao.delete(catId)
    .then(() => {
      callback({status: 'success', id: catId});
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(err);
    });

};







