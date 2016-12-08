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
