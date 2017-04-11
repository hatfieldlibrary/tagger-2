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
const filename = path.basename(__filename);
const paramErrorMessage = 'A parameter for a category (a.k.a group) query is not defined.';
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

taggerDao.findAll = () => {

  return taggerSchema.Category.findAll({
    attributes: ['id', 'title'],
    order: [['title', 'ASC']]
  });

};

// Seems to be collection specific.  Should it be here?
taggerDao.categoryCountByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('select Categories.title, COUNT(*) as count from AreaTargets left join ' +
    'Collections on AreaTargets.CollectionId = Collections.id left join CategoryTargets on ' +
    'CategoryTargets.CollectionId = Collections.id left join Categories on CategoryTargets.CategoryId = Categories.id ' +
    'where AreaTargets.AreaId = ? group by Categories.id order by count DESC;',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  );

};

taggerDao.categoriesByCollectionId = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.CategoryTarget.findAll({
    where: {
           CollectionId: collId
    },
    include: [taggerSchema.Category]
  });

};


taggerDao.listByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Category.findAll({
    where: {
      areaId: areaId
    },
    order: [['title', 'ASC']]
  });

};

taggerDao.byId = (categoryId) => {

  if(!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Category.find({
    where: {
      id: categoryId
    }
  });

};

taggerDao.add = (title) => {

  if(!title) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Category.create({
    title: title
  });
};

taggerDao.update = (data, id) => {

  if(!data | !id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Category.update(
    data,
    {
      where: {
        id: id
      }
    });
};

taggerDao.delete = (catId) => {

  if(!catId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Category.destroy({
    where: {
      id: catId
    }
  });
};

module.exports = taggerDao;
