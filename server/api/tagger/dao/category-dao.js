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

// jshint strict:false

const taggerSchema = require('../schema/index');
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

taggerDao.categoriesByCollectionId = (collId) => {

  return taggerSchema.CategoryTarget.findAll({
    where: {
           CollectionId: collId
    },
    include: [taggerSchema.Category]
  });

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
