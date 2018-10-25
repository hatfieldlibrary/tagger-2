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

'use strict';

const taggerSchema = require('../schema/index');
const utils = require('./utils');
const logger = require('../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);
const paramErrorMessage = 'A parameter for a collection query is not defined.';
const paramTypeErrorMessage = 'A parameter is not of the correct type.';
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

taggerDao.retrieveAllCollections = () => {

  return taggerSchema.Collection.findAll({
    order: [['title', 'ASC']]
  });

};

taggerDao.countCTypesByArea = (areaId) => {

  if (!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT ctype, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY ctype',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getContentTypesForCollection = (collectionId) => {
  if (!collectionId) {
    logger.dao(paramErrorMessage);
  }
  return taggerSchema.sequelize.query('SELECT i.name from Collections c JOIN ItemContentTargets it ' +
    'on c.id=it.CollectionId JOIN ItemContents i on it.ContentId=i.id where c.id=?',
    { replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

  };

taggerDao.browseTypesByArea = (areaId) => {

  if (!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT Collections.browseType, COUNT(Collections.id) as count from AreaTargets ' +
    'join Collections on AreaTargets.CollectionId=Collections.id where AreaTargets.AreaId = ? group by Collections.browseType',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.repoTypesByArea = (areaId) => {

  if (!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT repoType, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY repoType',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findCollectionsInArea = (areaId) => {

  if (!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.findAll({
    where: {
      AreaId: areaId
    },
    order: [[taggerSchema.Collection, 'title', 'ASC']],
    include: [taggerSchema.Collection]

  });

};

taggerDao.findAreasForCollection = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.findAll({
    where: {
      CollectionId: collId
    }
  });

};

taggerDao.findItemContentTarget = (collId, typeId) => {

  if (!collId || !typeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContentTarget.find(
    {
      where: {
        CollectionId: collId,
        ItemContentId: typeId
      }
    });

};

taggerDao.createItemContentTarget = (collId, typeId) => {

  if (!collId || !typeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContentTarget.create(
    {
      CollectionId: collId,
      ItemContentId: typeId
    }
  );

};

taggerDao.deleteItemContentTarget = (collId, typeId) => {

  if (!collId || !typeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContentTarget.destroy(
    {
      where: {
        ItemContentId: typeId,
        CollectionId: collId
      }
    }
  );

};

taggerDao.findContentTypesForCollection = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContentTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.ItemContent],
      order: [[taggerSchema.ItemContent, 'name', 'ASC']],
    }
  );

};

taggerDao.checkForExistingTagTarget = (collId, tagId) => {

  if (!collId || !tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.TagTarget.find(
    {
      where: {
        CollectionId: collId,
        TagId: tagId
      }
    });

};

taggerDao.addTagTarget = (collId, tagId) => {

  if (!collId || !tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagTarget.create(
    {
      CollectionId: collId,
      TagId: tagId
    }
  );

};

taggerDao.deleteTagTarget = (collId, tagId) => {

  if (!collId || !tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagTarget.destroy(
    {
      where: {
        TagId: tagId,
        CollectionId: collId
      }
    }
  );

};

taggerDao.addCollectionToArea = (collId, areaId) => {

  if (!collId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.create(
    {
      CollectionId: collId,
      AreaId: areaId
    }
  );
};

taggerDao.getAreaIdsForCollection = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.AreaTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      attributes: ['AreaId']
    }
  );

};

taggerDao.checkAreaAssociation = (collId, areaId) => {

  if (!collId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.AreaTarget.find(
    {
      where: {
        CollectionId: collId,
        AreaId: areaId
      }
    });

};

taggerDao.removeCollectionFromArea = (areaId, collId) => {

  if (!collId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.destroy({
    where: {
      AreaId: areaId,
      CollectionId: collId
    }

  });

};

taggerDao.findCollectionById = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.find(
    {
      where: {
        id: collId
      }
    });
};

taggerDao.findCategoryAssociation = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.find(
    {
      where: {
        CollectionId: collId
      }
    });

};

taggerDao.getCategoryForCollection = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.find(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Category]
    });

};

taggerDao.setPublicationStatus = (status, collId) => {

  if (!collId || !status) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.update({
      published: status
    },
    {
      where: {
        id: collId
      }
    });
};

taggerDao.updateParentCollection = (collId, parent) => {

  if (!collId || !parent) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Collection.update({
      parent: parent
    },
    {
      where: {
        id: collId
      }
    });
};

taggerDao.getPublicationStatus = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.find(
    {
      where: {
        id: collId
      },
      attributes: ['published']
    });
};

taggerDao.updateCollection = (update, id) => {

  if (!update || !id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.update(update,
    {
      where: {
        id: id
      }
    });

};

taggerDao.addCollectionToCategory = (id, category) => {

  if (!id || !category) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.CategoryTarget.create({CollectionId: id, CategoryId: category});

};

taggerDao.updateCollectionCategory = (id, category) => {

  if (!id || !category) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.update({
      CategoryId: category
    },
    {
      where: {
        CollectionId: id
      }
    });

};

taggerDao.deleteCategoryFromCollection = (id, category) => {
  if (!id || !category) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.CategoryTarget.destroy({
    where: {
      CategoryId: category,
      CollectionId: id
    }
  });
};

taggerDao.deleteCollection = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Collection.destroy({
    where: {
      id: collId
    }
  });

};

taggerDao.addNewCollection = (title, browseType, repoType, ctype, parent) => {

  if (!title || !browseType || !repoType || !ctype) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Collection.create({
    title: title,
    browseType: browseType,
    repoType: repoType,
    ctype: ctype,
    parent: parent
  });

};

taggerDao.updateCollectionImage = (collId, imageName) => {

  if (!collId || !imageName) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Collection.update(
    {
      image: imageName
    },
    {
      where: {
        id: collId
      }
    }
  );

};


taggerDao.retrieveAllPublishedCollections = () => {
  return taggerSchema.sequelize.query('select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.ctype, c.published, c.parent from  Collections c ' +
    'where c.published = true ' +
    'order by c.title',
    {
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};


/**
 * Gets the collections for one or more areas.
 * @param areaId string containing a single or comma-separated area ids
 */
taggerDao.getCollectionsByArea = (areaId) => {

  if (!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let areaArray = areaId.split(',');
  let areaWhereClause = utils.getWhereClauseForAreas(areaArray);

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from Collections c LEFT JOIN AreaTargets at on c.id=at.CollectionId where ' + areaWhereClause + ' AND c.published = true order by c.title',
    {
      replacements: areaArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets the collections assigned to areas and subjects
 * @param areaId area ids as comma separated string or a single value string
 * @param subjectId subject ids as comma separated string or a single value string
 */
taggerDao.getCollectionsBySubjectAndArea = (areaId, subjectId) => {

  if (!areaId || !subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const areaArray = areaId.split(',');
  const subjectArray = subjectId.split(',');

  const combinedWhereClause = utils.getWhereClauseForAreasAndSubjects(areaArray, subjectArray);
  const queryArray = areaArray.concat(subjectArray);

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id ' +
    'JOIN Collections c on tt.CollectionId = c.id ' +
    'JOIN AreaTargets at on c.id=at.CollectionId ' +
    'where ' + combinedWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets list of collections assigned to areas and content types.
 * @param areaId area ids as comma separated string or a single value string
 * @param contentTypeId tiem ids as comma separated string or single value string
 */
taggerDao.getCollectionsByAreaAndContentType = (areaId, contentTypeId) => {

  if (!areaId || !contentTypeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  if (typeof areaId !== 'string' && typeof contentTypeId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }

  let areaArray = areaId.split(',');
  let typeArray = contentTypeId.split(',');

  // Pass arrays to method, area array first then type array.
  let combinedWhereClause = utils.getWhereClauseForAreasAndContentTypes(areaArray, typeArray);
  // concat arrays, adding type array to area array.
  const queryArray = areaArray.concat(typeArray);

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, c.searchUrl, ' +
    'c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from ItemContentTargets it JOIN Collections c on it.CollectionId = c.id ' +
    'JOIN AreaTargets at on at.CollectionId = c.id ' +
    'where ' + combinedWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets collections assigned to areas, content types, and subjects.
 * @param areaId a string containing comma separated area ids or a single area id
 * @param contentTypeId a string containing comma separated content type ids or a single content type id
 * @param subjectId a string containing comma separated subject ids or a single subject id
 */
taggerDao.getCollectionsBySubjectAndContentType = (contentTypeId, subjectId) => {

  if (!contentTypeId || !subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  if (typeof contentTypeId !== 'string' || typeof subjectId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  let typeArray = contentTypeId.split(',');
  let subjectArray = subjectId.split(',');

  // Pass arrays to method, area array first then type array.
  let combinedWhereClause = utils.getWhereClauseForContentTypesAndSubjects(typeArray, subjectArray);
  // concat arrays, adding type array to area array.
  const queryArray = typeArray.concat(subjectArray);

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from Collections c LEFT JOIN ItemContentTargets ict on ict.CollectionId = c.id ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'JOIN ItemContentTargets it on c.id=it.CollectionId ' +
    'JOIN ItemContents i on it.ItemContentId=i.id ' +
    'where ' + combinedWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets collections assigned to areas, content types, and subjects.
 * @param areaId a string containing comma separated area ids or a single area id
 * @param contentTypeId a string containing comma separated content type ids or a single content type id
 * @param subjectId a string containing comma separated subject ids or a single subject id
 */
taggerDao.getCollectionsByAreaSubjectAndContentType = (areaId, contentTypeId, subjectId) => {

  if (!areaId || !contentTypeId || !subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  if (typeof areaId !== 'string' || typeof contentTypeId !== 'string' || typeof subjectId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }

  let areaArray = areaId.split(',');
  let typeArray = contentTypeId.split(',');
  let subjectArray = subjectId.split(',');

  // Pass arrays to method, area array first then type array.
  let combinedWhereClause = utils.getWhereClauseForAllFields(areaArray, typeArray, subjectArray);
  // concat arrays, adding type array to area array.
  const queryArray = areaArray.concat(typeArray).concat(subjectArray);

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from Collections c LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on at.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on it.ItemContentId=i.id ' +
    'where ' + combinedWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets collections assigned to a subject tag.  Supports single or multiple
 * subject id input.
 * @param subjectId string containing comma separated or single subject id.
 */
taggerDao.getCollectionsBySubject = (subjectId) => {

  if (!subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if (typeof subjectId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const subjectArray = subjectId.split(',');
  const subjectWhereClause = utils.getWhereClauseForSubjects(subjectArray);

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from Collections c LEFT JOIN TagTargets tt on c.id=tt.CollectionId where ' + subjectWhereClause + ' AND c.published = true ' +
    'group by c.id order by c.title',
    {
      replacements: [subjectArray],
      type: taggerSchema.Sequelize.QueryTypes.SELECT

    });

};

/**
 * Gets collections assigned to a single category or content group.
 * @param categoryId the category id.
 */
taggerDao.getCollectionsByCategory = (categoryId) => {

  if (!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent ' +
    'from Collections c LEFT JOIN CategoryTargets ct on c.id=ct.CollectionId ' +
    ' where ct.CategoryId=? AND c.published = true group by c.id order by c.title',
    {
      replacements: [categoryId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets collections assigned to categories and content types.
 * @param categoryId the category id (can be comma-separated).
 * @param areaId the area id (can be comma-separated).
 */
taggerDao.getCollectionsByCategoryArea = (categoryId, areaId) => {

  if (!categoryId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const areasArray = areaId.split(',');
  const categoryArray = categoryId.split(',');

  const categoriesWhereClause = utils.getWhereClauseForAreasAndCategories(areasArray, categoryArray);
  const queryArray = areasArray.concat(categoryArray);
  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from ' +
    'Collections c LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'LEFT JOIN AreaTargets at on at.CollectionId = c.id where ' +
    categoriesWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });


};

/**
 * Gets collections assigned to categories and content types.
 * @param categoryId the category id (can be comma-separated).
 * @param typeId the content type id (can be comma-separated).
 */
taggerDao.getCollectionsByCategoryAndType = (categoryId, typeId) => {

  if (!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const typesArray = typeId.split(',');
  const categoryArray = categoryId.split(',');

  const categoriesWhereClause = utils.getWhereClauseForCategoriesAndContentTypes(categoryArray, typesArray);
  const queryArray = categoryArray.concat(typesArray);
  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from ' +
    'Collections c LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id where ' +
    categoriesWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });


};

/**
 * Gets collections assigned to categories and content types.
 * @param categoryId the category id (can be comma-separated).
 * @param typeId the content type id (can be comma-separated).
 */
taggerDao.getCollectionsByCategoryAndSubject = (categoryId, subjectId) => {

  if (!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const subjectsArray = subjectId.split(',');
  const categoryArray = categoryId.split(',');

  const categoriesWhereClause = utils.getWhereClauseForCategoriesAndSubjects(categoryArray, subjectsArray);
  const queryArray = categoryArray.concat(subjectsArray);
  return taggerSchema.sequelize.query('Select c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from ' +
    'Collections c LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'JOIN TagTargets tt on tt.CollectionId = c.id where ' +
    categoriesWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });


};

/**
 * Gets collections assigned to areas, categories, and content types.
 * @param areaId the area id (can be comma-separated).
 * @param categoryId the category id (can be comma-separated).
 * @param typeId the content type id (can be comma-separated).
 *
 */
taggerDao.getCollectionsByAreaCategoryAndType = (areaId, categoryId, typeId) => {

  if (!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const typesArray = typeId.split(',');
  const categoryArray = categoryId.split(',');
  const areaArray = areaId.split(',');

  const categoriesWhereClause =
    utils.getWhereClauseForAreasCategoriesAndContentTypes(areaArray, categoryArray, typesArray);
  const queryArray = areaArray.concat(categoryArray).concat(typesArray);

  return taggerSchema.sequelize.query('Select c.id, it.ItemContentId, i.name AS typeName, c.title AS title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from Collections c ' +
    'LEFT JOIN AreaTargets at on c.id = at.CollectionId ' +
    'LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on it.ItemContentId=i.id  where ' +
    categoriesWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets collections assigned to areas, categories, and content types.
 * @param areaId the area id (can be comma-separated).
 * @param categoryId the category id (can be comma-separated).
 * @param subjectId the content type id (can be comma-separated).
 *
 */
taggerDao.getCollectionsByAreaCategoryAndSubject = (areaId, categoryId, subjectId) => {

  if (!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const subjectsArray = subjectId.split(',');
  const categoryArray = categoryId.split(',');
  const areaArray = areaId.split(',');

  const categoriesWhereClause =
    utils.getWhereClauseForAreasCategoriesAndSubjects(areaArray, categoryArray, subjectsArray);
  const queryArray = areaArray.concat(categoryArray).concat(subjectsArray);

  return taggerSchema.sequelize.query('Select c.id, c.title AS title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from Collections c ' +
    'LEFT JOIN AreaTargets at on c.id = at.CollectionId ' +
    'LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN Tags t on tt.TagId=t.id where ' +
    categoriesWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};


/**
 * Gets collections assigned to areas, categories, and content types.
 * @param areaId the area id (can be comma-separated).
 * @param categoryId the category id (can be comma-separated).
 * @param subjectId the content type id (can be comma-separated).
 *
 */
taggerDao.getCollectionsByAreaCategorySubjectAndType = (areaId, categoryId, subjectId, typeId) => {

  if (!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  const subjectsArray = subjectId.split(',');
  const categoryArray = categoryId.split(',');
  const areaArray = areaId.split(',');
  const typesArray = typeId.split(',');

  const categoriesWhereClause =
    utils.getWhereClauseForAreasCategoriesSubjectsAndTypes(areaArray, categoryArray, subjectsArray, typesArray);
  const queryArray = areaArray.concat(categoryArray).concat(subjectsArray).concat(typesArray);

  return taggerSchema.sequelize.query('Select c.id, c.title AS title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from Collections c ' +
    'LEFT JOIN AreaTargets at on c.id = at.CollectionId ' +
    'LEFT JOIN CategoryTargets ct on ct.CollectionId = c.id ' +
    'LEFT JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'LEFT JOIN ItemContents i on it.ItemContentId=i.id ' +
    'LEFT JOIN TagTargets tt on tt.CollectionId = c.id ' +
    'LEFT JOIN Tags t on tt.TagId=t.id where ' +
    categoriesWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: queryArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

/**
 * Gets collections assigned to the item type. To provide functionality consistent
 * with other methods, this may need to be modified to support multiple, comma-separated
 * item type ids.
 * @param itemTypeId
 */
taggerDao.getCollectionsByContentType = (itemTypeId) => {

  if (!itemTypeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  if (typeof itemTypeId !== 'string') {
    logger.dao(paramTypeErrorMessage);
    throw _errorResponse();
  }
  const typeArray = itemTypeId.split(',');
  const typeWhereClause = utils.getWhereClauseForContentTypes(typeArray);

  return taggerSchema.sequelize.query('SELECT c.id, c.title, c.image, c.url, ' +
    'c.searchUrl, c.description, c.dates, c.items, c.browseType, c.repoType, c.restricted, c.published, c.ctype, c.parent from Collections c ' +
    'JOIN ItemContentTargets it on it.CollectionId = c.id ' +
    'where ' + typeWhereClause + ' and c.published = true group by c.id order by c.title',
    {
      replacements: typeArray,
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

/**
 * Gets the subject tags that have been assigned to a collection.
 * @param collId the collection id.
 * @returns {Promise.<Array.<Model>>}
 */
taggerDao.findTagsForCollection = (collId) => {

  if (!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.TagTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Tag],
      attributes: ['Tag.id', 'Tag.name']
    });

};

/**
 * Finds related collections based on the collection id and subject id. Finds
 * all collections with given subject id, excluding the current collection id.
 * @param collId
 * @param subjectId
 */
taggerDao.findRelatedCollections = (collId, subjectId) => {

  if (!subjectId || !collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select c.title, c.id, c.image ' +
    'from Collections c left join TagTargets t on t.CollectionId = c.id ' +
    'where t.TagId = ? and t.CollectionId != ? and c.published = true order by c.id limit 6',
    {
      replacements: [subjectId, collId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

module.exports = taggerDao;
