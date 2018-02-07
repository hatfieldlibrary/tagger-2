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
const paramTypeErrorMessage = 'A paramenter is of the wrong type';
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

  return taggerSchema.sequelize.query('select t.id, t.name from TagTargets tt JOIN Collections c on tt.CollectionId=c.id ' +
    'JOIN TagAreaTargets at on at.TagID=tt.TagId join Tags t on at.TagId=t.id where ' + areaWhereClause + ' ' +
    'AND c.published=true group by tt.TagId',
    {
      replacements: areaArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets the tags available for a collection list that has been limited content type.
 * @param contentTypeId content type ids as comma separated string or a single value string
 */
taggerDao.findTagsForContentType = (contentTypeId) => {

  if(!contentTypeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let typeArray = contentTypeId.split(',');
  let whereClause = utils.getWhereClauseForContentTypes(typeArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
  'from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id ' +
  'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
  'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
  'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: typeArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets the tags available for a collection list that has been limited by area and content type.
 * @param areaId area ids as comma separated string or a single value string
 * @param contentTypeId content type ids as comma separated string or a single value string
 */
taggerDao.findTagsForAreaAndContentType = (areaId, contentTypeId) => {

  if(!areaId || !contentTypeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if(typeof areaId !== 'string' || typeof contentTypeId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const areaArray = areaId.split(',');
  const typeArray = contentTypeId.split(',');
  const whereClause = utils.getSubjectWhereClauseForAreasAndContentTypes(areaArray, typeArray);

  const queryArray = areaArray.concat(typeArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

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
