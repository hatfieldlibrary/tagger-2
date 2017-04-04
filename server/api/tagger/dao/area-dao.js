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

'use strict';

const taggerSchema = require('../schema/index');
const taggerDao = {};

taggerDao.findAreaById = (areaId) => {

  return taggerSchema.Area.find({
    where: {
      id: areaId
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

  return taggerSchema.AreaTarget.findAll({
    where: {
      CollectionId: collId
    }
  });

};

taggerDao.areaListWithCollectionCounts = () => {


  return taggerSchema.sequelize.query('select count(*), a.title, a.id from Areas a join AreaTargets at on a.id = at.AreaId ' +
    'join Collections c on c.id = at.CollectionId group by (a.id);',
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

  return taggerSchema.Area.create({
    title: title,
    position: position
  });
};

taggerDao.updateArea = (data, id) => {

  return taggerSchema.Area.update(data,
    {
      where: {
        id: id
      }
    });

};

taggerDao.reorder = (areas, areaCount) => {

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

  return taggerSchema.Area.destroy({
    where: {
      id: id
    }
  });
};

module.exports = taggerDao;
