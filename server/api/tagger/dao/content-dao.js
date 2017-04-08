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

/**
 * Created by mspalti on 12/1/16.
 */

// jshint strict:false

const taggerSchema = require('../schema/index');
const logger = require('../utils/error-logger');
const path = require('path');
const paramErrorMessage = 'A parameter for a content type query is not defined.';
const filename = path.basename(__filename);
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

taggerDao.retrieveContentTypeById = (id) => {

  if(!id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.find({
    where:{
      id: id
    }
  });

};

taggerDao.getContentTypes = () => {

  return taggerSchema.ItemContent.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']]
  });

};

taggerDao.getAreaContentTypeSummary = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select name, COUNT(*) as count from AreaTargets left ' +
    'join Collections on AreaTargets.CollectionId = Collections.id left join ItemContentTargets ' +
    'on ItemContentTargets.CollectionId = Collections.id left join ItemContents on ' +
    'ItemContentTargets.ItemContentId = ItemContents.id ' +
    'where AreaTargets.AreaId = ? group by ItemContents.id order by ' +
    'count DESC',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  );

};

taggerDao.findContentTypeByName = (name) => {

  if(!name) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.find(
    {
      where: {
        name:  name
      }
    }
  );

};

taggerDao.createContentType = (name) => {

  if(!name) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.create({
    name: name
  });

};

taggerDao.updateContentType = (name, icon, id) => {

  if(!name || !icon || !id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.update(
    {
      name: name,
      icon: icon
    },
    {
      where: {
        id: id
      }
    }
  );
};

taggerDao.deleteContentType = (contentId) => {

  if(!contentId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.destroy(
    {
      where: {
        id: contentId
      }
    });
};

module.exports = taggerDao;
