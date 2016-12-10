/**
 * Created by mspalti on 12/1/16.
 */
'use strict';

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.findAll = () => {

  return taggerSchema.Category.findAll({
    attributes: ['id', 'title'],
    order: [['title', 'ASC']]
  });

};

// Seems to be collection specific.  Should it be here?
taggerDao.categoryCountByArea = (areaId) => {

  return taggerSchema.sequelize.query('select Categories.title, COUNT(*) as count from AreaTargets left join ' +
    'Collections on AreaTargets.CollectionId = Collections.id left join CategoryTargets on ' +
    'CategoryTargets.CollectionId = Collections.id left join Categories on CategoryTargets.CategoryId = Categories.id ' +
    'where AreaTargets.AreaId = ? group by Categories.id order by count DESC;',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  );

};


taggerDao.listByArea = (areaId) => {

  return taggerSchema.Category.findAll({
    where: {
      areaId: areaId
    },
    order: [['title', 'ASC']]
  });

};

taggerDao.byId = (categoryId) => {
  return taggerSchema.Category.find({
    where: {
      id: categoryId
    }
  });

};

taggerDao.add = (title) => {

  return taggerSchema.Category.create({
    title: title
  });
};

taggerDao.update = (data, id) => {

  return taggerSchema.Category.update(
    data,
    {
      where: {
        id: id
      }
    });
};

taggerDao.delete = (catId) => {

  return taggerSchema.Category.destroy({
    where: {
      id: catId
    }
  });
};

module.exports = taggerDao;
