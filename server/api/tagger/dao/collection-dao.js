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
const logger = require('../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);
const paramErrorMessage = 'A parameter for a collection query is not defined.';
const taggerDao = {};

/**
 * Returns 500 error for missing parameter. This error is thrown
 * before the dao promise is returned.
 * @returns {Error}
 * @private
 */
function _errorResponse() {
  let error = new Error('Error: missing query parameter - ' + filename);
  error.status = 500;
  return error;
}

taggerDao.retrieveAllCollections = () => {

  return taggerSchema.Collection.findAll({
    order: [['title', 'ASC']]
  });

};

taggerDao.countCTypesByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT ctype, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY ctype',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.browseTypesByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT Collections.browseType, COUNT(Collections.id) as count from AreaTargets ' +
    'join Collections on AreaTargets.CollectionId=Collections.id where AreaTargets.AreaId = ? group by Collections.browseType',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.repoTypesByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('SELECT repoType, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY repoType',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findCollectionsInArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.findAll({
    where: {
      AreaId: areaId
    },
    order: [[taggerSchema.Collection, 'title', 'ASC']],
    include: [taggerSchema.Collection]

  });

};

taggerDao.findAreasForCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.findAll({
    where: {
      CollectionId: collId
    }
  });

};

taggerDao.findItemContentTarget = (collId, typeId) => {

  if(!collId || !typeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContentTarget.find(
    {
      where: {
        CollectionId: collId,
        ItemContentId: typeId
      }
    });

};

taggerDao.createItemContentTarget = (collId, typeId) => {

  if(!collId || !typeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.ItemContentTarget.create(
    {
      CollectionId: collId,
      ItemContentId: typeId
    }
  );

};

taggerDao.deleteItemContentTarget = (collId, typeId) => {

  if(!collId || !typeId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

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

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

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

  if(!collId || !tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.TagTarget.find(
    {
      where: {
        CollectionId: collId,
        TagId: tagId
      }
    });

};

taggerDao.addTagTarget = (collId, tagId) => {

  if(!collId || !tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.TagTarget.create(
    {
      CollectionId: collId,
      TagId: tagId
    }
  );

};

taggerDao.deleteTagTarget = (collId, tagId) => {

  if(!collId || !tagId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

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

  if(!collId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.create(
    {
      CollectionId: collId,
      AreaId: areaId
    }
  );
};

taggerDao.getAreaIdsForCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


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

  if(!collId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.AreaTarget.find(
    {
      where: {
        CollectionId: collId,
        AreaId: areaId
      }
    });

};

taggerDao.removeCollectionFromArea = (areaId, collId) => {

  if(!collId || !areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.AreaTarget.destroy({
    where: {
      AreaId: areaId,
      CollectionId: collId
    }

  });

};

taggerDao.findCollectionById = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.find(
    {
      where: {
        id: collId
      }
    });
};

taggerDao.findCategoryAssociation = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.find(
    {
      where: {
        CollectionId: collId
      }
    });

};

taggerDao.getCategoryForCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.find(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Category]
    });

};

taggerDao.setPublicationStatus = (status, collId) => {

  if(!collId || !status) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.update({
      published: status
    },
    {
      where: {
        id: collId
      }
    });
};

taggerDao.getPublicationStatus = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.find(
    {
      where: {
        id: collId
      },
      attributes: ['published']
    });
};

taggerDao.updateCollection = (update, id) => {

  if(!update || !id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.Collection.update(update,
    {
      where: {
        id: id
      }
    });

};

taggerDao.addCollectionToCategory = (id, category) => {

  if(!id || !category) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.create({CollectionId: id, CategoryId: category});

};

taggerDao.updateCollectionCategory = (id, category) => {

  if(!id || !category) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.CategoryTarget.update({
      CategoryId: category
    },
    {
      where: {
        CollectionId: id
      }
    });

};

taggerDao.deleteCategoryFromCollection = (id, category) => {

  if(!id || !category) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.CategoryTarget.destroy({
   where: {
     CategoryId: category,
     CollectionId: id
   }
 });
};

taggerDao.deleteCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Collection.destroy({
    where: {
      id: collId
    }
  });

};

taggerDao.addNewCollection = (title, browseType, repoType, ctype) => {

  if(!title || !browseType || !repoType || !ctype) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Collection.create({
    title: title,
    browseType: browseType,
    repoType: repoType,
    ctype: ctype
  });

};

taggerDao.updateCollectionImage = (collId, imageName) => {

  if(!collId || !imageName) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

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

taggerDao.getCollectionsByArea = (areaId) => {

  if(!areaId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.sequelize.query('Select * from Collections c LEFT JOIN AreaTargets at on c.id=at.CollectionId where at.AreaId = ? AND c.published = true order by c.title',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getCollectionsBySubjectAndArea = (subjectId, areaId) => {

  if(!areaId || !subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select * from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id LEFT JOIN Collections c ' +
    'on tt.CollectionId = c.id LEFT JOIN AreaTargets at on c.id=at.CollectionId where tt.TagId = ? and at.AreaId = ? and c.published = true ' +
    'order by c.title',
    {
      replacements: [subjectId, areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.getCollectionsBySubject = (subjectId) => {

  if(!subjectId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select * from TagTargets tt LEFT JOIN Tags t on tt.TagId = t.id LEFT JOIN Collections c ' +
    'on tt.CollectionId = c.id where tt.TagId = ? and c.published = true order by c.title',
    {
      replacements: [subjectId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT

    });

};

taggerDao.getCollectionsByCategory = (categoryId) => {

  if(!categoryId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select * from Collections c left join CategoryTargets ct on ct.CollectionId = c.id where ct.CategoryId = ? and c.published = true order by c.title',
    {
      replacements: [categoryId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });

};

taggerDao.findTagsForCollection = (collId) => {

  if(!collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }


  return taggerSchema.TagTarget.findAll(
    {
      where: {
        CollectionId: collId
      },
      include: [taggerSchema.Tag],
      attributes: ['TagId']
    });

};

taggerDao.findRelatedCollections = (collId, subjectId) => {

  if(!subjectId || !collId) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.sequelize.query('Select c.title, c.id, c.image from Collections c left join TagTargets t on t.CollectionId = c.id where t.TagId = ? and t.CollectionId != ? and c.published = true order by c.id',
    {
      replacements: [subjectId, collId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    });
};

module.exports = taggerDao;
