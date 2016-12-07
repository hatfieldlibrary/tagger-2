/**
 * Created by mspalti on 12/1/16.
 */
'use strict';

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.retrieveAllCollections = () => {

  return taggerSchema.Collection.findAll({
    order: [['title', 'ASC']]
  });

};

taggerDao.countCTypesByArea = (areaId) => {

  return taggerSchema.sequelize.query('SELECT ctype, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY ctype',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.browseTypesByArea = (areaId) => {

  return taggerSchema.sequelize.query('SELECT Collections.browseType, COUNT(Collections.id) as count from AreaTargets ' +
    'join Collections on AreaTargets.CollectionId=Collections.id where AreaTargets.AreaId = ? group by Collections.browseType',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.repoTypeByArea = (areaId) => {

  return taggerSchema.sequelize.query('SELECT repoType, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY repoType',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findCollectionsInArea = (areaId) => {

  return taggerSchema.AreaTarget.findAll({
    where: {
      AreaId: areaId
    },
    order: [[taggerSchema.Collection, 'title', 'ASC']],
    include: [taggerSchema.Collection]

  });

};

taggerDao.findAreasForCollection = (collId) => {

  return taggerSchema.AreaTarget.findAll({
    where: {
      CollectionId: collId
    }
  });

};

taggerDao.findItemContentTarget = (collId, typeId) => {

  return taggerSchema.ItemContentTarget.find(
    {
      where: {
        CollectionId: collId,
        ItemContentId: typeId
      }
    });

};

taggerDao.createItemContentTarget = (collId, typeId) => {

  return taggerSchema.ItemContentTarget.create(
    {
      CollectionId: collId,
      ItemContentId: typeId
    }
  );

};

taggerDao.deleteItemContentTarget = (collId, typeId) => {

  return taggerSchema.ItemContentTarget.destroy(
    {
      where: {
        ItemContentId: typeId,
        CollectionId: collId
      }
    }
  );

};

taggerDao.findContentTypesForCollection = (collId) => {

  return taggerSchema.ItemContentTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.ItemContent]
    }
  );

};

taggerDao.checkForExistingTagTarget = (collId, tagId) => {

  return taggerSchema.TagTarget.find(
    {
      where: {
        CollectionId: collId,
        TagId: tagId
      }
    });

};

taggerDao.addTagTarget = (collId, tagId) => {

  return taggerSchema.TagTarget.create(
    {
      CollectionId: collId,
      TagId: tagId
    }
  );

};

taggerDao.deleteTagTarget = (collId, tagId) => {

  return taggerSchema.TagTarget.destroy(
    {
      where: {
        TagId: tagId,
        CollectionId: collId
      }
    }
  );

};

taggerDao.addCollectionToArea = (collId, areaId) => {

  return taggerSchema.AreaTarget.create(
    {
      CollectionId: collId,
      AreaId: areaId
    }
  );
};

taggerDao.getAreaIdsForCollection = (collId) => {

  return taggerSchema.AreaTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      attributes: ['AreaId']
    }
  );

};

taggerDao.checkAreaAssociation = (collId, areaId) => {

  return taggerSchema.AreaTarget.find(
    {
      where: {
        CollectionId: collId,
        AreaId: areaId
      }
    });

};

taggerDao.removeCollectionFromArea = (areaId, collId) => {

  return taggerSchema.AreaTarget.destroy({
    where: {
      AreaId: areaId,
      CollectionId: collId
    }

  });

};

taggerDao.findCollectionById = (collId) => {

  return taggerSchema.Collection.find(
    {
      where: {
        id: collId
      }
    });
};

taggerDao.findCategoryAssociation = (collId) => {

  return taggerSchema.CategoryTarget.find(
    {
      where: {
        CollectionId: collId
      }
    });

};

taggerDao.getCategoryForCollection = (collId) => {

  return taggerSchema.CategoryTarget.find(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Category]
    });

};



taggerDao.updateCollection = (update, id) => {

  return taggerSchema.Collection.update(update,
    {
      where: {
        id: id
      }
    });

};

taggerDao.addCollectionToCategory = (id, category) => {

  return taggerSchema.CategoryTarget.create({CollectionId: id, CategoryId: category});

};

taggerDao.updateCollectionCategory = (id, category) => {

  return taggerSchema.CategoryTarget.update({
      CategoryId: category
    },
    {
      where: {
        CollectionId: id
      }
    });

};

taggerDao.deleteCollection = (collId) => {

  return taggerSchema.Collection.destroy({
    where: {
      id: collId
    }
  });

};

taggerDao.addNewCollection = (title) => {

  return taggerSchema.Collection.create({
    title: title
  });

};

taggerDao.updateCollectionImage = (collId, imageName) => {

  return taggerSchema.Collection.update(
    {
      image: imageName
    },
    {
      where: {
        id: collId
      }
    }
  );

};

taggerDao.findTagsForCollection = (collId) => {

  return taggerSchema.TagTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Tag],
      attributes: ['"Tags.name"', 'id']
    });

};

taggerDao.getCollectionsByArea = (areaId) => {

  return taggerSchema.sequelize.query('Select * from Collections c LEFT JOIN AreaTargets at on c.id=at.CollectionId where at.AreaId = ? order by c.title',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getCollectionsBySubjectAndArea = (subjectId, areaId) => {

  return taggerSchema.sequelize.query('Select * from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id LEFT JOIN Collections c ' +
    'on tt.CollectionId = c.id LEFT JOIN AreaTargets at on c.id=at.CollectionId where tt.TagId = ? and at.AreaId = ? ' +
    'order by c.title',
    {
      replacements: [subjectId, areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getCollectionsBySubject = (subjectId) => {

  return taggerSchema.sequelize.query('Select * from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id LEFT JOIN Collections c ' +
    'on tt.CollectionId = c.id where tt.TagId = ? order by c.title',
    {
      replacements: [subjectId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT

    });

};

taggerDao.getCollectionsByCategory = (categoryId) => {

  return taggerSchema.sequelize.query('Select * from Collections c left join CategoryTargets ct on ct.CollectionId = c.id where ct.CategoryId = ? order by c.title',
    {
      replacements: [categoryId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

module.exports = taggerDao;
