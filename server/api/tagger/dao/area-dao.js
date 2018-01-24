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
const logger = require('../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);
const paramErrorMessage = 'A parameter for an area query is not defined.';
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

taggerDao.findAreaById = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  let areaArray = areaId.split(',');

  return taggerSchema.Area.findAll({
    where: {
      id: {
        $or: [
          areaArray
        ]
      }
    },
    order: [['title', 'ASC']]
  });

};

taggerDao.listAllAreas = () => {

  return taggerSchema.Area.findAll({
    order: [['position', 'ASC']]
  });

};

taggerDao.findAreasForCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.findAll({
    where: {
      CollectionId: collId
    }
  });

};

taggerDao.listAreasByContentType = (typeId) => {
  return taggerSchema.sequelize.query('select count(*), a.id, a.title from Areas a join AreaTarget at on a.id = at.AreaId ' +
    'join Collections c on c.id = at.CollectionId join ItemContentTargets t on t.CollectionId = c.id where t.ItemContentId = ? ' +
    'group by (a.id) order by position;',
    {
      replacements: [typeId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    })
};

taggerDao.listAreasBySubject = (subjectId) => {
  return taggerSchema.sequelize.query('select count(*), a.id, a.title from Areas a join AreaTarget at on a.id = at.AreaId ' +
    'join Collections c on c.id = at.CollectionId join TagTargets tt on tt.CollectionId = c.id where tt.TagId = ? ' +
    'group by (a.id) order by position;',
    {
      replacements: [subjectId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

taggerDao.listAreasByTypeAndSubject = (subjectId, typeId) => {
  return taggerSchema.sequelize.query('select count(*), a.id, a.title from Areas a join AreaTarget at on a.id = at.AreaId ' +
    'join Collections c on c.id = at.CollectionId join TagTargets tt on tt.CollectionId = c.id join ItemContentTargets t ' +
    'on t.CollectionId = c.id where tt.TagId = ? AND t.ItemContentId = ? group by (a.id) order by position;',
    {
      replacements: [subjectId, typeId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

taggerDao.areaListWithCollectionCounts = () => {


  return taggerSchema.sequelize.query('select count(*), a.title, a.id from Areas a join AreaTargets at on a.id = at.AreaId ' +
    'join Collections c on c.id = at.CollectionId group by (a.id) order by position;',
    {
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

  // return taggerSchema.Area.findAll( {
  //   attributes: ['Area.id', 'Area.title',
  //     taggerSchema.sequelize.fn('count', taggerSchema.sequelize.col('Area.id'))],
  //   group: ["Area.id"],
  //   include: [taggerSchema.Collection]
  // })

};

taggerDao.getAreaCount = () => {

  return taggerSchema.Area.findAll(
    {
      attributes: [[taggerSchema.sequelize.fn('count', taggerSchema.sequelize.col('id')), 'count']],
    });

};

taggerDao.addArea = (title, position) => {

  if(!title || !position) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Area.create({
    title: title,
    position: position
  });
};

taggerDao.updateArea = (data, id) => {

  if(!data || !id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }
  return taggerSchema.Area.update(data,
    {
      where: {
        id: id
      }
    });

};

taggerDao.reorder = (areas, areaCount) => {

  if(!areas || !areaCount) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  /**
   * Promise method that returns the count value if the
   * limit condition has not been reached.
   */
  var promiseFor = taggerSchema.sequelize.Promise.method(function (condition, action, value) {
    // limit reached
    if (!condition(value)) {
      return value;
    }
    // continue with action
    return action(value).then(promiseFor.bind(null, condition, action));

  });

  return promiseFor(function (count) {
      // Test for limit (condition)
      return count < areaCount;
    },
    // Do update (action)
    function (count) {
      return taggerSchema.Area.update(
        {
          // position attribute based on current array index
          position: count + 1
        },
        {
          where: {
            id: areas[count].id
          }
        })
        .then(function () {
          // Return the incremented count value
          return ++count;
        });
    },
    // initialize count value
    0);

};

taggerDao.deleteArea = (id) => {

  if(!id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Area.destroy({
    where: {
      id: id
    }
  });
};

module.exports = taggerDao;
