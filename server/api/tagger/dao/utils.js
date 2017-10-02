/**
 * Created by mspalti on 6/26/17.
 */

const utils = {};

const areaField = ' at.AreaId = ? ';
const itemTypeField = ' it.ItemContentId = ? ';

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
 * @param areaArray
 */
utils.getWhereClauseForMultipleAreas = (areaArray) => {

  return _getWhereClause(areaArray, areaField)

};
/**
 * Gets collections for one or more areas and one or more content types.
 * @param areaArray the list of areas to query
 * @param itemArray the list if content types to query
 * @returns {string}
 */
utils.getWhereClauseForMultipleAreasAndContentTypes = (areaArray, itemArray) => {
  const areasClause = _getWhereClause(areaArray, areaField);
  const itemTypeClause = _getWhereClause(itemArray, itemTypeField);

  return areasClause + ' AND ' + itemTypeClause;

};

module.exports =  utils;
