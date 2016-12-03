/**
 * Created by mspalti on 12/1/16.
 */

const taggerSchema = require('../models/index');
const taggerDao = {};


taggerDao.retrieveContentTypeById = (id) => {

  return taggerSchema.ItemContent.find({
    where:{
      id: id
    }
  });

};

taggerDao.getContentTypes = () => {

  return taggerSchema.ItemContent.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']]
  });

};

taggerDao.getAreaContentTypeSummary = (areaId) => {

  return taggerSchema.sequelize.query('Select name, COUNT(*) as count from AreaTargets left ' +
    'join Collections on AreaTargets.CollectionId = Collections.id left join ItemContentTargets ' +
    'on ItemContentTargets.CollectionId = Collections.id left join ItemContents on ' +
    'ItemContentTargets.ItemContentId = ItemContents.id ' +
    'where AreaTargets.AreaId = ? group by ItemContents.id order by ' +
    'count DESC',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  );

};

taggerDao.findContentTypeByName = (name) => {

  return taggerSchema.ItemContent.find(
    {
      where: {
        name:  name
      }
    }
  );

};

taggerDao.createContentType = (name) => {

  return taggerSchema.ItemContent.create({
    name: name
  });

};

taggerDao.updateContentType = (name, icon, id) => {

  return taggerSchema.ItemContent.update(
    {
      name: name,
      icon: icon
    },
    {
      where: {
        id: id
      }
    }
  )
};

taggerDao.deleteContentType = (contentId) => {

  return taggerSchema.ItemContent.destroy(
    {
      where: {
        id: contentId
      }
    })
};

module.exports = taggerDao;
