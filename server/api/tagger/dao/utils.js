/**
 * Created by mspalti on 6/26/17.
 */

const utils = {};

const areaField = ' at.AreaId = ? ';
const itemTypeField = ' it.ItemContentId = ? ';
const subjectField = ' tt.TagId = ? ';

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
 * Returns the where clause for areas.
 * @param areaArray list of areas
 */
utils.getWhereClauseForMultipleAreas = (areaArray) => {

  return _getWhereClause(areaArray, areaField)

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
utils.getWhereClauseForMultipleAreasAndContentTypes = (areaArray, itemArray) => {
  const areasClause = _getWhereClause(areaArray, areaField);
  const itemTypeClause = _getWhereClause(itemArray, itemTypeField);

  return areasClause + ' AND ' + itemTypeClause;

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
