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

taggerDao.findAllTagsAdmin = () => {
  return taggerSchema.Tag.findAll({
    order: [['name', 'ASC']]
  });

};

taggerDao.findAllTags = () => {

  return taggerSchema.sequelize.query('SELECT t.id, t.name FROM TagAreaTargets at JOIN ' +
    'TagTargets tt on tt.TagId=at.TagId JOIN ' +
    'Tags t on tt.TagId=t.id  JOIN ' +
    'Collections c on c.id=tt.CollectionId ' +
    'WHERE c.published = true group by t.id order by t.name',
    {
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    })

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
  let areaWhereClause = utils.getWhereClauseForAreas(areaArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name FROM TagAreaTargets at JOIN ' +
    'TagTargets tt on tt.TagId=at.TagId JOIN ' +
    'Tags t on tt.TagId=t.id  JOIN ' +
    'Collections c on c.id=tt.CollectionId ' +
    'where  ' + areaWhereClause + ' AND c.published=true  group by t.id order by t.name',
    {
      replacements: areaArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};


taggerDao.findTagsInAreaAdmin = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let areaArray = areaId.split(',');
  let areaWhereClause = utils.getWhereClauseForAreas(areaArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name FROM TagAreaTargets at JOIN ' +
    'Tags t on at.TagId=t.id ' +
    'where  ' + areaWhereClause + ' group by t.id order by t.name',
    {
      replacements: areaArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets the tags available for a collection list that has been limited content type.
 * @param contentTypeId content type ids (single value or comma-separated values)
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
 * Gets the tags available for a collection list that has been limited by subject.
 * This is could be useful when the boolean operator in the main where clause is AND (currently OR).
 * @param contentTypeId content type ids (single value or comma-separated values)
 */
taggerDao.findTagsForSubject = (subjectId) => {

  if(!subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let subjectArray = subjectId.split(',');
  let whereClause = utils.getWhereClauseForSubjects(subjectArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name from TagTargets target JOIN Tags t on target.TagId = t.id ' +
    'JOIN (SELECT tt.CollectionId from TagTargets tt where ' + whereClause + ') sub ON ' +
    'target.CollectionId=sub.CollectionId JOIN Collections c ON target.CollectionId = c.id where ' +
    'c.published = true group by t.id order by t.name',
    {
      replacements: subjectArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 *
 * @param contentTypeId content type ids (single value or comma-separated values)
 */
taggerDao.findTagsForCategory = (categoryId) => {

  if(!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let categoryArray = categoryId.split(',');
  let whereClause = utils.getWhereClauseForCategories(categoryArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name from TagTargets target JOIN Tags t on target.TagId = t.id ' +
    'JOIN (SELECT ct.CollectionId from CategoryTargets ct where ' + whereClause + ') sub ON ' +
    'target.CollectionId=sub.CollectionId JOIN Collections c ON target.CollectionId = c.id where ' +
    'c.published = true group by t.id order by t.name',
    {
      replacements: categoryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};
/**
 * Gets the tags available for a collection list that has been limited by area and content type.
 * @param areaId area ids (single value or comma-separated values)
 * @param contentTypeId content type ids (single value or comma-separated values)
 */
taggerDao.findTagsForAreaAndSubject = (areaId, subjectId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  if(!areaId || !subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if(typeof areaId !== 'string' || typeof subjectId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const areaArray = areaId.split(',');
  const subjectArray = subjectId.split(',');
  const whereClause = utils.getWhereClauseForAreasAndSubjects(areaArray, subjectArray);
  const queryArray = areaArray.concat(subjectArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'JOIN AreaTargets a on a.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets the tags available for a collection list that has been limited by area and content type.
 * @param areaId area ids (single value or comma-separated values)
 * @param contentTypeId content type ids (single value or comma-separated values)
 */
taggerDao.findTagsForAreaAndCategory = (areaId, categoryId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  if(!areaId || !categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if(typeof areaId !== 'string' || typeof categoryId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const areaArray = areaId.split(',');
  const categoryArray = categoryId.split(',');
  const whereClause = utils.getWhereClauseForAreasAndCategories(areaArray, categoryArray);
  const queryArray = areaArray.concat(categoryArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'JOIN AreaTargets a on a.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets the tags available for a collection list that has been limited by area and content type.
 * @param areaId area ids (single value or comma-separated values)
 * @param contentTypeId content type ids (single value or comma-separated values)
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
 // const whereClause = utils.getSubjectWhereClauseForAreasAndContentTypes(areaArray, typeArray);
//  const queryArray = areaArray.concat(areaArray).concat(typeArray);
  const whereClause = utils.getWhereClauseForAreasAndContentTypes(areaArray, typeArray);
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

/**
 * Gets the tags available for a collection list that has been limited by subject and content type.
 * @param subjectId subject ids (single value or comma-separated values)
 * @param typeId content type ids (single value or comma-separated values)
 */
taggerDao.findTagsForSubjectAndContentType = (subjectId, typeId) => {



  if(!typeId || ! subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if(typeof subjectId !== 'string' || typeof typeId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const typeArray = typeId.split(',');
  const subjectArray = subjectId.split(',');

  const whereClause = utils.getWhereClauseForContentTypesAndSubjects(typeArray, subjectArray);
  const queryArray = typeArray.concat(subjectArray);

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

/**
 * Gets the tags available for a collection list that has been limited by area, subject and content type.
 * @param areaId area ids (single value or comma-separated values)
 * @param subjectId subject ids (single value or comma-separated values)
 * @param contentTypeId content type ids (single value or comma-separated values)
 */
taggerDao.findTagsForAreaSubjectAndContentType = (areaId, subjectId, typeId) => {

  if(!areaId || !typeId || ! subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if(typeof areaId !== 'string' || typeof subjectId !== 'string' || typeof typeId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const areaArray = areaId.split(',');
  const typeArray = typeId.split(',');
  const subjectArray = subjectId.split(',');

  const whereClause = utils.getWhereClauseForAreasSubjectsAndContentTypes(areaArray, subjectArray, typeArray);
  const queryArray = areaArray.concat(subjectArray).concat(typeArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'JOIN AreaTargets a on a.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findTagsForCategoryAndSubject = (categoryId, subjectId) => {

  const categoryArray = categoryId.split(',');
  const subjectArray = subjectId.split(',');
  const whereClause = utils.getWhereClauseForCategoriesAndSubjects(categoryArray, subjectArray);
  const queryArray = categoryArray.concat(subjectArray);
  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'JOIN CategoryTargets ct on ct.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findTagsForAreaCategoryAndContentType = (areaId, categoryId, typeId) => {

  const categoryArray = categoryId.split(',');
  const typeArray = typeId.split(',');
  const areaArray = areaId.split(',');
  const whereClause = utils.getWhereClauseForAreasCategoriesAndContentTypes(areaArray, categoryArray, typeArray);
  const queryArray = areaArray.concat(categoryArray).concat(typeArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'JOIN CategoryTargets ct on ct.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};


taggerDao.findTagsForAreaCategoryAndSubject = (areaId, categoryId, subjectId) => {

  const categoryArray = categoryId.split(',');
  const subjectArray = subjectId.split(',');
  const areaArray = areaId.split(',');
  const whereClause = utils.getWhereClauseForAreasCategoriesAndContentTypes(areaArray, categoryArray, subjectArray);
  const queryArray = areaArray.concat(categoryArray).concat(subjectArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +

    'JOIN CategoryTargets ct on ct.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};


taggerDao.findTagsForCategoryAndContentType = (categoryId, typeId) => {

  const categoryArray = categoryId.split(',');
  const typeArray = typeId.split(',');
  const whereClause = utils.getWhereClauseForCategoriesAndContentTypes(categoryArray, typeArray);
  const queryArray = categoryArray.concat(typeArray);

  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'JOIN CategoryTargets ct on ct.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

taggerDao.findTagsForCategorySubjectAndContentType = (categoryId, subjectId, typeId) => {

  const categoryArray = categoryId.split(',');
  const subjectArray = subjectId.split(',');
  const typeArray = typeId.split(',');
  const whereClause =
    utils.getWhereClauseForCategoriesSubjectsAndContentTypes(categoryArray, subjectArray, typeArray);
  const queryArray = categoryArray.concat(subjectArray).concat(typeArray);
  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'JOIN CategoryTargets ct on ct.CollectionId=c.id ' +
    'where ' + whereClause + ' AND c.published = true group by t.id order by t.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findTagsForAreaCategorySubjectAndContentType = (areaId, categoryId, subjectId, typeId) => {

  const areaArray = areaId.split(',');
  const categoryArray = categoryId.split(',');
  const subjectArray = subjectId.split(',');
  const typeArray = typeId.split(',');
  const whereClause =
    utils.getWhereClauseForAreaCategoriesSubjectsAndContentTypes(areaArray, categoryArray, subjectArray, typeArray);
  const queryArray = areaArray.concat(categoryArray).concat(subjectArray).concat(typeArray);
  return taggerSchema.sequelize.query('SELECT t.id, t.name ' +
    'from TagAreaTargets at LEFT JOIN Tags t on at.TagId = t.id  ' +
    'LEFT JOIN TagTargets tt on at.TagId = tt.TagId ' +
    'LEFT JOIN Collections c on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on at.CollectionId = c.id ' +
    'JOIN CategoryTargets ct on ct.CollectionId=c.id ' +
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
