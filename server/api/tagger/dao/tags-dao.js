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
const utils = require('./utils');
const paramErrorMessage = 'A parameter for a subject tag query is not defined.';
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

taggerDao.findAllTags = () => {

  return taggerSchema.Tag.findAll({
    order: [['name', 'ASC']]

  });

};

taggerDao.createTag = (name) => {

  if(!name) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Tag.create({
    name: name
  });

};

taggerDao.updateTag = (name, id) => {

  if(!name || !id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Tag.update(
    {
      name: name
    },
    {
      where: {
        id: id
      }
    });
};

taggerDao.deleteTag = (tagId) => {

  if(!tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Tag.destroy({
    where: {
      id: tagId
    }
  });

};

taggerDao.findTagById = (tagId) => {

  if(!tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Tag.find( {
    where: {
      id:  tagId
    },
    order: [['name', 'ASC']]
  });

};


taggerDao.findTagsInArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let areaArray = areaId.split(',');
  let areaWhereClause = utils.getWhereClauseForMultipleAreas(areaArray);

  return taggerSchema.sequelize.query('Select t.id, t.name from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  where ' + areaWhereClause + ' group by t.id order by t.name',
    {
      replacements: areaArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

  // return taggerSchema.TagAreaTarget.findAll( {
  //   where: {
  //     AreaId: {
  //       $or: [
  //         areaArray
  //       ]
  //     }
  //   },
  //   attributes: ['TagId', '"Tag.name"'],
  //   order: [[taggerSchema.Tag, 'name', 'ASC']],
  //   group: [['TagId']],
  //   include: [{ model: taggerSchema.Tag, attributes: id, name}]
  // });

};



taggerDao.getTagCountByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT name, COUNT(*) as count from TagTargets left join Tags on ' +
    'TagTargets.TagId = Tags.id left join TagAreaTargets on TagAreaTargets.TagId = Tags.id  ' +
    'WHERE TagAreaTargets.AreaId = ? group by TagTargets.TagId order by Tags.name',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  );
};

taggerDao.findTagByName = (name) => {

  if(!name) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Tag.find(
    {
      where: {
        name: name
      }
    }
  );

};

taggerDao.findTagsForCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Tag],
      attributes: ['"Tags.name"', 'id']
    });

};



module.exports = taggerDao;
