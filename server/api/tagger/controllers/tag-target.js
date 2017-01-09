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
const taggerDao = require('../dao/tag-target-dao');

/**
 * Private function for adding association between tag and area.
 * @param tagId   the id of the tag
 * @param areaId   the id of the area
 * @param res      response object
 */
function _addArea(tagId, areaId, res) {

  async.series(
    {
      create: function (callback) {
        taggerDao.addTagToArea(tagId, areaId)
          .then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });

      },
      areaList: function (callback) {
        taggerDao.findAreasForTag(tagId).then(function (result) {
          callback(null, result);
        })
          .error(function (err) {
            console.log(err);
          });
      }
    },

    function (err, result) {
      utils.sendAreaTargetsReponse(res, err, result);

    }
  );
}

/**
 * Retrieves list of subject areas associated with a tag.
 * @param req
 * @param res
 */
exports.getAreaTargets = function (req, res) {
  const tagId = req.params.tagId;

  taggerDao.findAreasForTag(tagId)
    .then(function (areas) {
      utils.sendResponse(res, areas);
    }).catch(function (err) {
    console.log(err);
  });
};

/**
 * Creates association between a subject tag and an area
 * if that association does not already exist.
 * @param req
 * @param res
 */
exports.addTarget = function (req, res) {
  const tagId = req.params.tagId;
  const areaId = req.params.areaId;

  async.series(
    {
      // Check to see if tag is already associated
      // with area.
      check: function (callback) {

        taggerDao.findTagAreaAssociation(tagId, areaId)
          .then(function (result) {
            callback(null, result);
          })
          .catch(function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      // if new
      if (result.check === null) {
        _addArea(tagId, areaId, res);

      }
      // if not new, just return the current list.
      else {
        taggerDao.listTagAssociations(tagId).then(function (areas) {
          utils.sendResponse(res, {status: 'exists', areaTargets: areas});
        }).catch(function (err) {
          console.log(err);
        });
      }

    });
};

/**
 * Removes an association between a subject tag and an area.
 * @param req
 * @param res
 */
exports.removeTarget = function (req, res) {
  const tagId = req.params.tagId;
  const areaId = req.params.areaId;

  async.series(
    {
      // Remove current associations between the tag and collections in the area.
      removeSubjects: function (callback) {
        taggerDao.removeTagFromCollections(areaId, tagId)
          .then(function (result) {
            callback(null, result);
          });
      },
      // Remove the tag from the area.
      delete: function (callback) {
        taggerDao.removeTagFromArea(areaId, tagId)
          .then(function (result) {
            callback(null, result);
          })
          .error(function (err) {
            console.log(err);
          });
      },
      // Get the updated tag list for the area
      areaList: function (callback) {
        taggerDao.findAreasForTag(tagId).then(function (result) {
          callback(null, result);
        })
          .error(function (err) {
            console.log(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      utils.sendResponse(res, {
        status: 'success',
        areaTargets: result.areaList,
        removedTags: result.removeSubjects
      });

    }
  );

};
