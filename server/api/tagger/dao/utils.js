/**
 * Created by mspalti on 6/26/17.
 */

const utils = {};

const areaField = ' at.AreaId = ? ';
const itemTypeField = ' it.ItemContentId = ? ';
const subjectField = ' tt.TagId = ? ';
const areaField2 = ' a.AreaId = ? ';
const categoryField = ' ct.CategoryId = ? ';

/**
 * Generates where clause from input values and field string.
 * @param inputArray
 * @param field
 * @returns {string}
 * @private
 */
const _getWhereClause = (inputArray, field) =>  {

  let whereClause = '';

  for (let i = 0; i < inputArray.length; i++) {
    whereClause += field;
    if (i < inputArray.length - 1) {
      whereClause += ' OR ';
    }
  }
  if (inputArray.length > 1) {
    whereClause = '(' + whereClause + ')';
  }

  return whereClause;

};

/**
 * Generates where clause from input values and field string.
 * @param inputArray
 * @param field
 * @returns {string}
 * @private
 */
const _getWhereAndClause = (inputArray, field) =>  {

  let whereClause = '';

  for (let i = 0; i < inputArray.length; i++) {
    whereClause += field;
    if (i < inputArray.length - 1) {
      whereClause += ' OR ';
    }
  }
  if (inputArray.length > 1) {
    whereClause = '(' + whereClause + ')';
  }

  return whereClause;

};

/**
 * Returns the where clause for areas.
 * @param areaArray list of areas
 */
utils.getWhereClauseForAreas = (areaArray) => {
  return _getWhereClause(areaArray, areaField)

};
/**
 * Returns the where clause for subject queries that include one or more subject id.
 * @param subjectsArray
 * @returns {string}
 */
utils.getWhereClauseForSubjects = (subjectsArray) => {
  return _getWhereClause(subjectsArray, subjectField);
};
/**
 * Returns the where clause for subject queries that include one or more subject id.
 * @param subjectsArray
 * @returns {string}
 */
utils.getWhereClauseForCategories = (categoriesArray) => {
  return _getWhereClause(categoriesArray, categoryField);
};

utils.getWhereClauseForContentTypes = (itemTypeArray) => {
  return _getWhereClause(itemTypeArray, itemTypeField);
};
/**
 * Constructs the where clause for one or more content types and one or more subjects.
 * @param typeArray list of content types to query
 * @param subjectArray list of subjects to query
 * @returns {string}
 */
utils.getWhereClauseForContentTypesAndSubjects = (typeArray, subjectArray) => {
  const typeClause = _getWhereClause(typeArray, itemTypeField);
  const subjectsClause = _getWhereClause(subjectArray, subjectField);

  return typeClause + ' AND ' + subjectsClause;
};
/**
 * Constructs the where clause for one or more areas and one or more subjects.
 * @param areaArray list of areas to query
 * @param subjectArray list of subjects to query
 * @returns {string}
 */
utils.getWhereClauseForAreasAndSubjects = (areaArray, subjectArray) => {
  const areasClause = _getWhereClause(areaArray, areaField);
  const subjectsClause = _getWhereClause(subjectArray, subjectField);

  return areasClause + ' AND ' + subjectsClause;
};

/**
 * Constructs the where clause for one or more areas and one or more content types.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasAndContentTypes = (areaArray, itemArray) => {
  const areasClause = _getWhereClause(areaArray, areaField);
  const itemTypeClause = _getWhereClause(itemArray, itemTypeField);

  return areasClause + ' AND ' + itemTypeClause;

};

/**
 * Constructs the where clause for one or more areas and one or more content types.
 * @param areaArray the list of areas for query
 * @param categoryArray the list if categories for query
 * @returns {string}
 */
utils.getWhereClauseForAreasAndCategories = (areaArray, categoryArray) => {
  const areasClause = _getWhereClause(areaArray, areaField);
  const categoryClause = _getWhereClause(categoryArray, categoryField);

  return areasClause + ' AND ' + categoryClause;

};

/**
 * Constructs the where clause for one or more areas and one or more content types.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getSubjectWhereClauseForAreasAndContentTypes = (areaArray, itemArray) => {
  const areasTargetClause = _getWhereAndClause(areaArray, areaField);
  const subjectsClause = _getWhereAndClause(itemArray, itemTypeField);
  const areasClause = _getWhereAndClause(areaArray, areaField2);

  return areasTargetClause + ' AND ' + areasClause + 'AND' + subjectsClause;

};

/**
 * Constructs the where clause for one or more categories and subjects.
 * @param categoryArray the list of areas to query
 * @param subjectArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasAndCategories = (areaArray, categoryArray) => {
  const areaClause = _getWhereClause(areaArray, areaField);
  const categoryClause = _getWhereClause(categoryArray, categoryField);

  return areaClause + ' AND ' + categoryClause;

};

/**
 * Constructs the where clause for one or more categories and content types.
 * @param categoryArray the list of areas to query
 * @param typeArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForCategoriesAndContentTypes = (categoryArray, typeArray) => {
  const categoryClause = _getWhereClause(categoryArray, categoryField);
  const itemTypeClause = _getWhereClause(typeArray, itemTypeField);

  return categoryClause + ' AND ' + itemTypeClause;

};

/**
 * Constructs the where clause for one or more categories and content types.
 * @param categoryArray the list of areas to query
 * @param Array the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForCategoriesAndSubjects = (categoryArray, subjectArray) => {
  const categoryClause = _getWhereClause(categoryArray, categoryField);
  const subjectClause = _getWhereClause(subjectArray, subjectArray);

  return categoryClause + ' AND ' + subjectClause;

};

/**
 * Constructs the where clause for one or more categories and subjects.
 * @param categoryArray the list of areas to query
 * @param subjectArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasCategoriesAndSubjects = (areaArray, categoryArray, subjectArray) => {
  const areaClause = _getWhereClause(areaArray, areaField);
  const categoryClause = _getWhereClause(categoryArray, categoryField);
  const subjectClause = _getWhereClause(subjectArray, subjectField);

  return areaClause + ' AND ' + categoryClause + ' AND ' + subjectClause;

};

/**
 * Constructs the where clause for one or more categories and subjects.
 * @param categoryArray the list of areas to query
 * @param subjectArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasCategoriesSubjectsAndTypes = (areaArray, categoryArray, subjectArray, typeArray) => {
  const areaClause = _getWhereClause(areaArray, areaField);
  const categoryClause = _getWhereClause(categoryArray, categoryField);
  const subjectClause = _getWhereClause(subjectArray, subjectField);
  const typeClause = _getWhereClause(typeArray, itemTypeField);

  return areaClause + ' AND ' + categoryClause + ' AND ' + subjectClause + ' AND ' + typeClause;

};

/**
 * Constructs the where clause for one or more categories, subjects and content types.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForCategoriesSubjectsAndContentTypes = (categoryArray, subjectArray, typeArray) => {
  const categoryClause = _getWhereClause(categoryArray, categoryField);
  const subjectClause = _getWhereClause(subjectArray, subjectField);
  const typeClause = _getWhereClause(typeArray, itemTypeField);

  return categoryClause + ' AND ' + subjectClause + ' AND ' + typeClause;

};

/**
 * Constructs the where clause for one or more categories and one or more content types.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasCategoriesAndContentTypes = (areaArray, categoryArray, typeArray) => {
  const areaClause = _getWhereClause(areaArray, areaField);
  const categoryClause = _getWhereClause(categoryArray, categoryField);
  const itemTypeClause = _getWhereClause(typeArray, itemTypeField);

  return areaClause + ' AND ' + categoryClause + ' AND ' + itemTypeClause;

};
/**
 * Constructs the where clause for one or more areas, subjects and content types.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasSubjectsAndContentTypes = (areaArray, subjectArray, typeArray) => {
  const areaClause = _getWhereClause(areaArray, areaField);
  const subjectClause = _getWhereClause(subjectArray, subjectField);
  const itemTypeClause = _getWhereClause(typeArray, itemTypeField);

  return areaClause + ' AND ' + subjectClause + ' AND ' + itemTypeClause;

};
/**
 * Constructs the where clause for one or more areas and subjects.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForAreasAndSubjects = (areaArray, subjectArray) => {
  const areaClause = _getWhereClause(areaArray, areaField);
  const subjectClause = _getWhereClause(subjectArray, subjectField);


  return areaClause + ' AND ' + subjectClause;

};
/**
 * Gets collections  where clause elements for one or more of areas, content types and subjects.
 * @param areaArray the list of area ids
 * @param itemArray the list of item type ids
 * @param subjectArray the list of subject ids
 * @returns {string}
 */
utils.getWhereClauseForAllFields = (areaArray, itemArray, subjectArray) => {
  const areasClause = _getWhereClause(areaArray, areaField);
  const itemTypeClause = _getWhereClause(itemArray, itemTypeField);
  const subjectClause = _getWhereClause(subjectArray, subjectField);

  return areasClause + ' AND ' + itemTypeClause + ' AND ' + subjectClause;

};


module.exports =  utils;
