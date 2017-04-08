/**
 * Created by mspalti on 4/4/17.
 */
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

const taggerDao = require('../../dao/area-dao');
const logger = require('../../utils/error-logger');


/**
 * Adds new area. Sets the area position to be at the
 * end of the list.
 * @param req
 * @param callback
 * @param errorHandler failure response callback
 */
exports.add = function (req, callback, errorHandler) {
  const title = req.body.title;

  // the area count function has been changed to return the count.
  taggerDao.getAreaCount()
    .then(function (result) {
      taggerDao.addArea(title, result[0].dataValues.count + 1)
        .then(() => {
            callback()
          }
        ).catch(function (err) {
        errorHandler(err);
        logger.dao(err);
      });
    })
    .catch(function (err) {
      errorHandler(err);
      logger.dao(err);

    });
};

/**
 * Updates an existing area.
 * @param req
 * @param callback
 * @param errorHandler failure response callback
 */
exports.update = function (req, callback, errorHandler) {
  const title = req.body.title;
  const url = req.body.url;
  const searchUrl = req.body.searchUrl;
  const description = req.body.description;
  const linkLabel = req.body.linkLabel;
  const id = req.body.id;

  const data = {
    title: title,
    url: url,
    linkLabel: linkLabel,
    searchUrl: searchUrl,
    description: description
  };

  taggerDao.updateArea(data, id)
    .then((result) => {
      callback({status: 'success', id: result.id});
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });
};

/**
 * Updates area position attribute in the database to a new value based on the
 * order of the new areas array array.
 * @param req
 * @param callback
 * @param errorHandler failure response callback
 */
exports.reorder = function (req, callback, errorHandler) {
  const areas = req.body.areas;
  const areaCount = areas.length;

  taggerDao.reorder(areas, areaCount)
    .then(() => {
      callback({status: 'success'});
    })
    .catch((err) => {
      errorHandler(err);
      logger.dao(err);
    });
};

/**
 * Delete an area.
 * @param req
 * @param callback
 * @param errorHandler failure response callback
 */
exports.delete = function (req, callback, errorHandler) {
  const id = req.params.areaId;

  taggerDao.deleteArea(id)
    .then(() => {
      callback({status: 'success'});
    })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });

};




