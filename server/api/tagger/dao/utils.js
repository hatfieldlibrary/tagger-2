/**
 * Created by mspalti on 6/26/17.
 */

const utils = {};


utils.getWhereClauseForMultipleAreas = (areaArray) => {

  let areaWhereClause = '';

  for (let i = 0; i < areaArray.length; i++) {
    areaWhereClause += ' at.AreaId = ? ';
    if (i < areaArray.length - 1) {
      areaWhereClause += ' OR ';
    }
  }
  if (areaArray.length > 1) {
    areaWhereClause = '(' + areaWhereClause + ')';
  }

  return areaWhereClause;

};

module.exports =  utils;
