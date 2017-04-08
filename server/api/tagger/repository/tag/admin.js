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
const taggerDao = require('../../dao/tags-dao');
const logger = require('../../utils/error-logger');

/**
 * Retrieves tag information by tag id.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.byId = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.findTagById(id).then(function (tag) {
    callback(tag);
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};

/**
 * Retrieves list of tags associated with an area. Query
 * by area id.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.tagByArea = function (req, callback, errorHandler) {

  const areaId = req.params.areaId;

  taggerDao.findTagsInArea(areaId).then(function (tags) {
    callback(tags);
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });
};


/**
 * Retrieves tag name and use count by area id.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.tagByAreaCount = function (req, callback, errorHandler) {

  const areaId = req.params.areaId;

  taggerDao.getTagCountByArea(areaId)
    .then(function (tags) {
      callback(tags);
    })
    .catch(function (err) {
      logger.dao(err);
      errorHandler(err);
    });
};


/**
 * Adds a new tag.  First checks to see if tag with this name already
 * exists.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.add = function (req, callback, errorHandler) {
  const name = req.body.name;

  async.parallel(
    {
      // Check to see if content type already exists.
      check: function (parallel) {
        taggerDao.findTagByName(name)
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
        taggerDao.createTag(name)
          .then(function (result) {
            callback({status: 'success', id: result.id});
          })
          .catch(function (err) {
            errorHandler(err);
            logger.dao(err);
          });

      } else {
        errorHandler({message: 'Tag already exists.'});
      }
    }
  );
};

/**
 * Update the tag name.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.update = function (req, callback, errorHandler) {
  const id = req.body.id;
  const name = req.body.name;

  taggerDao.updateTag(name, id).then(function () {
    callback();
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};

/**
 * Delete the tag.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.delete = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.deleteTag(id).then(function () {
    callback();
  }).catch(function (err) {
    logger.dao(err);
    errorHandler(err);
  });

};



