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
 * @param res
 */
exports.byId = function (req, res) {
  const id = req.params.id;

  taggerDao.retrieveContentTypeById(id).then(function (type) {
    utils.sendResponse(res, type);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Retrieves list of all content types
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.getContentTypes().then(function (types) {
    utils.sendResponse(res, types);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Returns name and frequency for content types in a single
 * area for use in dashboard.
 * @param req
 * @param res
 */
exports.countByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.getAreaContentTypeSummary(areaId).then(function (types) {
    utils.sendResponse(res, types);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Adds new content type. First checks to see if it exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const name = req.body.title;

  async.parallel(
    {
      // Check to see if content type already exists.
      check: function (callback) {
        taggerDao.findContentTypeByName(name)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          logger.dao(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
      }
      if (result.check === null) {
        // Add new content type
        taggerDao.createContentType(name)
          .then(function (result) {
            utils.sendResponse(res, {status: 'success', id: result.id});
          }).catch(function (err) {
          logger.dao(err);
        });

      } else {
        utils.sendResponse(res, {status: 'failure'});
      }
    }
  );
};
/**
 * Updates a content type.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const icon = req.body.icon;

  taggerDao.updateContentType(name, icon, id).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });
};

/**
 * Deletes a content type.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const contentId = req.body.id;

  taggerDao.deleteContentType(contentId).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    logger.dao(err);
  });

};

