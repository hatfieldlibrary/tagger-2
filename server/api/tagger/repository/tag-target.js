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

const async = require('async');
const utils = require('../utils/response-utility');
const taggerDao = require('../dao/tag-target-dao');
const logger = require('../utils/error-logger');

/**
 * Private function for adding association between tag and area.
 * @param tagId   the id of the tag
 * @param areaId   the id of the area
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
function _addArea(tagId, areaId, callback, errorHandler) {

  async.series(
    {
      create: (series) => {
        taggerDao.addTagToArea(tagId, areaId)
          .then((result) => {
            series(null, result);
          });
      },
      areaList: (series) => {
        taggerDao.findAreasForTag(tagId)
          .then((result) => {
            series(null, result);
          });
      }
    },
    (err, result) => {
      if (err) {
        logger.repository(err);
        errorHandler(err);

      }
      callback(result);

    }
  );
}

/**
 * Retrieves list of subject areas associated with a tag.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.getAreaTargets = function (req, callback, errorHandler) {
  const tagId = req.params.tagId;

  taggerDao.findAreasForTag(tagId)
    .then((areas) => {
      callback(areas);
    }).catch((err) => {
    logger.repository(err);
    errorHandler(err);
  });
};

/**
 * Creates association between a subject tag and an area
 * if that association does not already exist.
 * @param req
 * @param callback success response callback
 * @param jsonSuccessCallback special json callback success response
 * @param errorHandler failure response callback
 */
exports.addTarget = function (req, callback, jsonSuccessCallback, errorHandler) {
  const tagId = req.body.tagId;
  const areaId = req.body.areaId;

  async.series(
    {
      // Check to see if tag is already associated
      // with area.
      check: (series) => {
        taggerDao.findTagAreaAssociation(tagId, areaId)
          .then((result) => {
            series(null, result);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.repository(err);
      }
      // if new
      if (result.check === null) {
        _addArea(tagId, areaId, jsonSuccessCallback, errorHandler);

      }
      // if not new, just return the current list.
      else {
        taggerDao.listTagAssociations(tagId)
          .then((areas) => {
            callback({status: 'exists', areaTargets: areas});
          })
          .catch((err) => {
            logger.repository(err);
            errorHandler(err);
          });
      }

    });
};

/**
 * Removes an association between a subject tag and an area.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.removeTarget = function (req, callback, errorHandler) {
  const tagId = req.params.tagId;
  const areaId = req.params.areaId;

  async.series(
    {
      // Remove current associations between the tag and collections in the area.
      removeSubjects: (series) => {
        taggerDao.removeTagFromCollections(areaId, tagId)
          .then((result) => {
            series(null, result);
          });
      },
      // Remove the tag from the area.
      delete: (series) => {
        taggerDao.removeTagFromArea(areaId, tagId)
          .then((result) => {
            series(null, result);
          });
      },
      // Get the updated tag list for the area
      areaList: (series) => {
        taggerDao.findAreasForTag(tagId)
          .then((result) => {
            series(null, result);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.repository(err);
        errorHandler(err);
      }
      callback({
        status: 'success',
        areaTargets: result.areaList,
        removedTags: result.removeSubjects
      });

    }
  );

};
