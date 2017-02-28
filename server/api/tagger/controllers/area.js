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

const taggerDao = require('../dao/area-dao');
const utils = require('../utils/response-utility');
const logger = require('../utils/error-logger');

exports.listAreasWithCount = function (req, res) {
  taggerDao.areaListWithCollectionCounts()
    .then(function(areas) {
      utils.sendResponse(res, areas);
    }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Retrieves area information by area id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  const areaId = req.params.id;
  taggerDao.findAreaById(areaId).then(function (areas) {
    utils.sendResponse(res, areas);
  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Retrieves a list of all areas.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.listAllAreas().then(function (areas) {
    utils.sendResponse(res, areas);

  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Adds new area. Sets the area position to be at the
 * end of the list.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const title = req.body.title;

  // the area count function has been changed to return the count.
  taggerDao.getAreaCount()
    .then(function (result) {
      taggerDao.addArea(title, result[0].dataValues.count + 1)
        .then(
          function () {
            utils.sendSuccessJson(res);
          }).catch(function (err) {
        utils.sendErrorJson(res, err);
        logger.dao(err);
      });
    })
    .catch(function (err) {
      utils.sendErrorJson(res, err);
      logger.dao(err);

    });
};

/**
 * Updates an existing area.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const title = req.body.title;
  const url = req.body.url;
 // const searchUrl = req.body.searchUrl;
  const description = req.body.description;
  const linkLabel = req.body.linkLabel;
  const id = req.body.id;

  const data = {
    title: title,
    url: url,
    linkLabel: linkLabel,
   // searchUrl: searchUrl,
    description: description
  };

  taggerDao.updateArea(data, id)
    .then(function (result) {
      utils.sendResponse(res, {status: 'success', id: result.id});
    }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Updates area position attribute in the database to a new value based on the
 * order of the new areas array array.
 * @param req
 * @param res
 */
exports.reorder = function (req, res) {
  const areas = req.body.areas;
  const areaCount = areas.length;

  taggerDao.reorder(areas, areaCount)
    .then(function () {
      utils.sendResponse(res, {status: 'success'});
    }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Delete an area.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.body.id;

  taggerDao.deleteArea(id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    logger.dao(err);
  });

};




