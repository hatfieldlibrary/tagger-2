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

taggerDao.addTagToArea = (tagId, areaId) => {

  return taggerSchema.TagAreaTarget.create(
    {
      TagId: tagId,
      AreaId: areaId
    }
  );

};

taggerDao.findAreasForTag = (tagId) => {

  return taggerSchema.TagAreaTarget.findAll({

    where: {
      TagId: tagId
    },
    attributes: ['AreaId']
  });

};

taggerDao.findTagAreaAssociation = (tagId, areaId) => {

  return taggerSchema.TagAreaTarget.find(
    {
      where: {
        TagId: tagId,
        AreaId: areaId
      }
    });

};

taggerDao.listTagAssociations = (tagId) => {

  return taggerSchema.TagAreaTarget.findAll({
    where: {
      TagId: tagId
    },
    attributes: ['AreaId', 'TagId']
  });

};

taggerDao.removeTagFromCollections = (areaId, tagId) => {

  return taggerSchema.sequelize.query('delete tt from TagTargets tt Inner Join Tags t on t.id = tt.TagId ' +
    'inner join TagAreaTargets tat on t.id = tat.TagId inner join Areas a on tat.AreaId = a.id ' +
    'inner join AreaTargets at on a.id=at.AreaId inner join Collections c on at.CollectionId = c.id ' +
    'where tat.AreaId = ' + areaId + ' and tt.TagId = ' + tagId,
    {
      replacements: [areaId, tagId],
      type: taggerSchema.Sequelize.QueryTypes.DELETE
    });

};

taggerDao.removeTagFromArea = (areaId, tagId) => {

  return taggerSchema.TagAreaTarget.destroy(
    {
      where: {
        TagId: tagId,
        AreaId: areaId
      }
    }
  )

};



module.exports = taggerDao;
