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


const async = require('async');
const utils = require('../utils/response-utility');
const taggerDao = require('../dao/content-dao');
const logger = require('../utils/error-logger');

/**
 * Retrieves content type by id
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.byId = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.retrieveContentTypeById(id).then(function (type) {
    callback(type);
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};

/**
 * Retrieves list of all content types
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.list = function (req, callback, errorHandler) {

  taggerDao.getContentTypes().then(function (types) {
    callback(types);
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};

/**
 * Returns name and frequency for content types in a single
 * area for use in dashboard.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.countByArea = function (req, callback, errorHandler) {
  const areaId = req.params.areaId;

  taggerDao.getAreaContentTypeSummary(areaId).then(function (types) {
    callback(types);
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};

/**
 * Adds new content type. First checks to see if it exists.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.add = function (req, callback, errorHandler) {
  const name = req.body.title;

  async.parallel(
    {
      // Check to see if content type already exists.
      check: function (parallel) {
        taggerDao.findContentTypeByName(name)
          .then(function (result) {
            parallel(null, result);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
        errorHandler(err);
      }
      if (result.check === null) {
        // Add new content type
        taggerDao.createContentType(name)
          .then(function (result) {
            callback({status: 'success', id: result.id});
          }).catch(function (err) {
          logger.dao(err);
          errorHandler(err);
        });

      } else {
        callback( {status: 'failure'});
      }
    }
  );
};
/**
 * Updates a content type.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.update = function (req, callback, errorHandler) {
  const id = req.body.id;
  const name = req.body.name;
  const icon = req.body.icon;

  taggerDao.updateContentType(name, icon, id).then(function () {
    callback();
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });
};

/**
 * Deletes a content type.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.delete = function (req, callback, errorHandler) {
  const contentId = req.params.id;

  taggerDao.deleteContentType(contentId).then(function () {
    callback({status: 'success'});
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};

