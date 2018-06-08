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
const utils = require('./utils');
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

  if (!id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.find({
    where: {
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

/**
 * Gets the content types that are available for collections that have been limited by area.
 * @param areaId area ids as comma separated string or a single value string
 */
taggerDao.getContentTypesForArea = (areaId) => {

  const areaArray = areaId.split(',');

  const combinedWhereClause = utils.getWhereClauseForAreas(areaArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on c.id=at.CollectionId ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: areaArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

/**
 * Gets the content types that are available for collections that have been limited by subject.
 * @param subjectId subject ids as comma separated string or a single value string
 */
taggerDao.getContentTypesForSubject = (subjectId) => {

  const subjectArray = subjectId.split(',');

  const combinedWhereClause = utils.getWhereClauseForSubjects(subjectArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: subjectArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

/**
 * Gets the content types that are available for collections that have been limited by content type.
 * This is could be useful when the boolean operator in the main where clause is AND (currently OR).
 */
taggerDao.getContentTypesForContentType = (contentTypeId) => {

  const typeArray = contentTypeId.split(',');
  const whereClause = utils.getWhereClauseForContentTypes(typeArray);

  return taggerSchema.sequelize.query('SELECT i.id, i.name from ItemContentTargets target JOIN ItemContents i ' +
    'on target.ItemContentId = i.id JOIN (SELECT it.CollectionId from ItemContentTargets it where ' +
    whereClause + ') sub ON target.CollectionId=sub.CollectionId JOIN Collections c ON target.CollectionId = c.id ' +
    'where c.published = true group by i.id order by i.name',
    {
      replacements: typeArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

/**
 * Gets the content types that are available for collections that have been limited by area and content type.
 * @param areaId area ids as comma separated string or a single value string
 * @param contentTypeId content type ids as comma separated string or a single value string
 */
taggerDao.getContentTypesForAreaContentTypeQuery = (areaId, contentTypeId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  const areaArray = areaId.split(',');
  const typeArray = contentTypeId.split(',');

  const combinedWhereClause = utils.getWhereClauseForAreasAndContentTypes(areaArray, typeArray);
  const queryArray = areaArray.concat(typeArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on c.id=at.CollectionId ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};
/**
 * Gets the content types that are available for collections that have been limited by content type and subject.
 * @param areaId area ids as comma separated string or a single value string
 * @param contentTypeId content type ids as comma separated string or a single value string
 */
taggerDao.getContentTypesForSubjectContentTypeQuery = (subjectId, contentTypeId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  const typeArray = contentTypeId.split(',');
  const subjectArray = subjectId.split(',');

  const combinedWhereClause = utils.getWhereClauseForContentTypesAndSubjects(typeArray, subjectArray);

  const queryArray = typeArray.concat(subjectArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};
/**
 * Gets the content types that are available for collections that have been limited by area and subject.
 * @param areaId area ids as comma separated string or a single value string
 * @param subjectId subject tag ids as comma separated string or a single value string
 */
taggerDao.getContentTypesForAreaSubjectQuery = (areaId, subjectId) => {

  const areaArray = areaId.split(',');
  const subjectArray = subjectId.split(',');

  const combinedWhereClause = utils.getWhereClauseForAreasAndSubjects(areaArray, subjectArray);

  const queryArray = areaArray.concat(subjectArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on c.id=at.CollectionId ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

/**
 * Gets the content types that are available for collections that have been limited by area, item type, and subject.
 * @param areaId area ids as comma separated string or a single value string
 * @param contentTypeId content type ids as comma separated string or single value string
 * @param subjectId subject tag ids as comma separated string or a single value string
 */
taggerDao.getContentTypesForAreaSubjectContentTypeQuery = (areaId, subjectId, contentTypeId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  const areaArray = areaId.split(',');
  const typeArray = contentTypeId.split(',');
  const subjectArray = subjectId.split(',');

  const combinedWhereClause = utils.getWhereClauseForAllFields(areaArray, typeArray, subjectArray);

  const queryArray = areaArray.concat(typeArray).concat(subjectArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on c.id=at.CollectionId ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

taggerDao.getContentTypesForCategoryAndContentType = (categoryId, typeId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  const categoryArray = categoryId.split(',');
  const typeArray = typeId.split(',');

  const queryArray = categoryArray.concat(typeArray);
  const combinedWhereClause = utils.getWhereClauseForCategoriesAndContentTypes(categoryArray, typeArray);

  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN CategoryTargets ct on c.id=ct.CollectionId ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getContentTypesForCategoryAndSubject = (categoryId, subjectId) => {

  const categoryArray = categoryId.split(',');
  const subjectArray = subjectId.split(',');

  const queryArray = categoryArray.concat(subjectArray);
  const combinedWhereClause = utils.getWhereClauseForMultipleCategoriesAndSubjects(categoryArray, subjectArray);
  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN CategoryTargets ct on c.id=ct.CollectionId ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getContentTypesForCategorySubjectAndContentType = (categoryId, subjectId, typeId) => {

  // TODO: Use subquery in join with ItemContentTargets to make use query useful.

  const categoryArray = categoryId.split(',');
  const typeArray = typeId.split(',');
  const subjectArray = subjectId.split(',');

  const queryArray = categoryArray.concat(subjectArray).concat(typeArray);
  const combinedWhereClause =
    utils.getWhereClauseForMultipleCategoriesSubjectsAndContentTypes(categoryArray, subjectArray, typeArray);
  return taggerSchema.sequelize.query('Select i.id, i.name ' +
    'from ItemContentTargets it LEFT JOIN Collections c on it.CollectionId = c.id ' +
    'LEFT JOIN CategoryTargets ct on c.id=ct.CollectionId ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on i.id = it.ItemContentId ' +
    'where (' + combinedWhereClause + ') group by i.id order by i.name',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getAreaContentTypeSummary = (areaId) => {

  if (!areaId) {
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

  if (!name) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.find(
    {
      where: {
        name: name
      }
    }
  );

};

taggerDao.createContentType = (name) => {

  if (!name) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContent.create({
    name: name
  });

};

taggerDao.updateContentType = (name, icon, id) => {

  if (!name || !id) {
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

  if (!contentId) {
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
