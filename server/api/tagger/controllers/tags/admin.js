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

/**
 * Created by mspalti on 5/23/14.
 */

const async = require('async');
const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/tags-dao');
const logger = require('../../utils/error-logger');

/**
 * Retrieves tag information by tag id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  const id = req.params.id;

  taggerDao.findTagById(id).then(function (tag) {
    utils.sendResponse(res, tag);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Retrieves list of tags associated with an area. Query
 * by area id.
 * @param req
 * @param res
 */
exports.tagByArea = function (req, res) {

  var areaId = req.params.areaId;

  taggerDao.findTagsInArea(areaId).then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    logger.dao(err);
  });
};


/**
 * Retrieves tag name and use count by area id.
 * @param req
 * @param res
 */
exports.tagByAreaCount = function (req, res) {

  var areaId = req.params.areaId;

  taggerDao.getTagCountByArea(areaId).then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    logger.dao(err);
  });
};


/**
 * Adds a new tag.  First checks to see if tag with this name already
 * exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const name = req.body.name;

  async.parallel(
    {
      // Check to see if content type already exists.
      check: function (callback) {
        taggerDao.findTagByName(name).then(function (result) {
          callback(null, result);
        })
          .catch(function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        utils.sendErrorJson(res, err);
        logger.dao(err);
      }
      if (result.check === null) {
        // Add new content type
        taggerDao.createTag(name).then(function (result) {
          utils.sendResponse(res, {status: 'success', id: result.id});
        })
          .catch(function (err) {
            utils.sendErrorJson(res, err);
            logger.dao(err);
          });

      } else {
        utils.sendErrorJson(res, {message: 'Unable to add tag.'});
      }
    }
  );
};

/**
 * Update the tag name.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const id = req.body.id;
  const name = req.body.name;

  taggerDao.updateTag(name, id).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

/**
 * Delete the tag.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.params.id;

  taggerDao.deleteTag(id).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};



