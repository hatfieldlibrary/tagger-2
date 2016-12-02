/**
 * Created by mspalti on 12/1/16.
 */
'use strict';

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.byId = (areaId) => {

  return taggerSchema.Area.find({
    where: {
      id: areaId
    },
    order: [['title', 'ASC']]
  });

};

taggerDao.list = () => {

  return taggerSchema.Area.findAll({
    order: [['position', 'ASC']]
  });

};

taggerDao.getAreaCount = () => {

  return taggerSchema.Area.findAll()
    .then(function (currentPosition) {
    });
};

taggerDao.addArea = (title, position) => {

  return taggerSchema.Area.create({
    title: title,
    position: position
  });
};

taggerDao.update = (data, id) => {

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

taggerDao.delete = (id) => {

  return taggerSchema.Area.destroy({
    where: {
      id: id
    }
  });
};

module.exports = taggerDao;
