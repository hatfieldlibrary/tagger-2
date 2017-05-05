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
 * Created by mspalti on 12/1/16.
 */

// jshint strict:false

const taggerSchema = require('../schema/index');
const logger = require('../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);
const paramErrorMessage = 'A parameter for a tag-target query is not defined.';
const taggerDao = {};

/**
 * Returns 500 error for missing parameter. This error is thrown
 * before the dao promise is returned.
 * @returns {Error}
 * @private
 */
function _errorResponse() {
  let error = new Error('Error: missing query parameter - ' + filename);
  error.status = 500;
  return error;
}

taggerDao.addTagToArea = (tagId, areaId) => {

  if(!tagId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagAreaTarget.create(
    {
      TagId: tagId,
      AreaId: areaId
    }
  );

};

taggerDao.findAreasForTag = (tagId) => {

  if(!tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagAreaTarget.findAll({

    where: {
      TagId: tagId
    },
    attributes: ['AreaId']
  });

};

taggerDao.findTagAreaAssociation = (tagId, areaId) => {

  if(!tagId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagAreaTarget.find(
    {
      where: {
        TagId: tagId,
        AreaId: areaId
      }
    });

};

taggerDao.listTagAssociations = (tagId) => {

  if(!tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagAreaTarget.findAll({
    where: {
      TagId: tagId
    },
    attributes: ['AreaId', 'TagId']
  });

};

taggerDao.removeTagFromCollections = (areaId, tagId) => {

  if(!tagId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('delete tt from TagTargets tt Inner Join Tags t on t.id = tt.TagId ' +
    'inner join TagAreaTargets tat on t.id = tat.TagId inner join Areas a on tat.AreaId = a.id ' +
    'inner join AreaTargets at on a.id=at.AreaId inner join Collections c on at.CollectionId = c.id ' +
    'where tat.AreaId = ' + areaId + ' and tt.TagId = ' + tagId,
    {
      replacements: [areaId, tagId],
      type: taggerSchema.Sequelize.QueryTypes.DELETE
    });

};

taggerDao.removeTagFromArea = (areaId, tagId) => {

  if(!tagId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagAreaTarget.destroy(
    {
      where: {
        TagId: tagId,
        AreaId: areaId
      }
    }
  );

};



module.exports = taggerDao;
