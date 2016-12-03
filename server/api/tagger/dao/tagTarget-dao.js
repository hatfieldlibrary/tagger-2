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
