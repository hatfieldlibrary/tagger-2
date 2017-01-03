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

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.findAllTags = () => {

  return taggerSchema.Tag.findAll({
    order: [['name', 'ASC']]

  });

};

taggerDao.createTag = (name) => {

  return taggerSchema.Tag.create({
    name: name
  });

};

taggerDao.updateTag = (name, id) => {

  return taggerSchema.Tag.update(
    {
      name: name
    },
    {
      where: {
        id: id
      }
    });
};

taggerDao.deleteTag = (tagId) => {

  return taggerSchema.Tag.destroy({
    where: {
      id: tagId
    }
  });

};

taggerDao.findTagById = (tagId) => {

  return taggerSchema.Tag.find( {
    where: {
      id:  tagId
    },
    order: [['name', 'ASC']]
  });

};


taggerDao.findTagsInArea = (areaId) => {

  return taggerSchema.TagAreaTarget.findAll( {
    where: {
      AreaId: areaId
    },

    attributes: ['"Tags.name"', 'TagId'],
    order: [[taggerSchema.Tag, 'name', 'ASC']],
    include: [taggerSchema.Tag]
  })

};



taggerDao.getTagCountByArea = (areaId) => {

  return taggerSchema.sequelize.query('SELECT name, COUNT(*) as count from TagTargets left join Tags on ' +
    'TagTargets.TagId = Tags.id left join TagAreaTargets on TagAreaTargets.TagId = Tags.id  ' +
    'WHERE TagAreaTargets.AreaId = ? group by TagTargets.TagId order by Tags.name',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  )
};

taggerDao.findTagByName = (name) => {

  return taggerSchema.Tag.find(
    {
      where: {
        name: name
      }
    }
  );

};



module.exports = taggerDao;
