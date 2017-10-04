/*
 * Copyright (c) 2017.
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
 * Created by mspalti on 12/6/16.
 */

'use strict';

/*jshint expr: true*/

import db from '../_helpers/db';
import areaDao from '../../../../server/api/tagger/dao/area-dao';
import categoryDao from '../../../../server/api/tagger/dao/category-dao';
import tagDao from  '../../../../server/api/tagger/dao/tags-dao';
import typeDao from  '../../../../server/api/tagger/dao/content-dao';
import collectionDao from  '../../../../server/api/tagger/dao/collection-dao';
import {expect} from 'chai';
import async from 'async';

const initCategories = [
  'Init Category One',
  'Init Category Two'
];

const initAreas = [
  'Init Area One',
  'Init Area Two'
];

const initTypes = [
  'rock',
  'paper'
];

const initTags = [
  'cats',
  'dogs'
];

const initCollections = [
  'Init Collection One',
  'Init Collection Two'
];

const updateCollectionData = {
  title: 'Updated Collection',
  image: 'updated_image.jpg',
  url: 'http://collection.url.com',
  description: 'Updated collection description',
  dates: 'date string',
  items: '10',
  ctype: 'col',
  browseType: 'test',
  repoType: 'search',
  restricted: 1,
  published: 1

};

let count = 2;

describe('Collection init', () => {

  before(function (done) {
    this.timeout(7000);
    async.series(
      [
        (callback) => {
          db.sequelize.query('SET foreign_key_checks = 0')
            .then(() => {
              callback(null);
            }).catch(function (err) {
            console.log(err);
          });
        },
        (callback) => {
          db.sequelize.sync({force: true})
            .then(() => {
              callback(null);
            }).catch(function (err) {
            callback(err);
          });
        },
        (callback) => {
          db.sequelize.query('SET foreign_key_checks = 1')
            .then(() => {
              callback(null);
            }).catch(function (err) {
            callback(err);
          });
        }
      ], (err) => {
        if (err) {
          console.log(err);
        } else {
          done();
        }
      });
  });

  it('should create a collection.', (done) => {

    let _onSuccess = (collection) => {

      expect(collection).to.be.defined;
      expect(collection.dataValues.title).to.have.string(initCollections[0]);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.addNewCollection(initCollections[0], 'foo', 'foo', 'foo')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should update the publication status of the collection', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.setPublicationStatus(true, 1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should get the new publication status for the collection', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.published).to.be.true;
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getPublicationStatus(1)
      .then(_onSuccess)
      .catch(_onError);
  });

});

describe('Collection operations', () => {

  // Don't use fat arrow. We need this binding for timeout.
  before(function (done) {

    this.timeout(11000);
    async.series(
      [
        (callback) => {
          db.sequelize.query('SET foreign_key_checks = 0')
            .then(() => callback(null));
        },
        (callback) => {
          db.sequelize.sync({force: true})
            .then(() => callback(null));
        },
        (callback) => {
          db.sequelize.query('SET foreign_key_checks = 1')
            .then(() => callback(null));
        },
        (callback) => {
          areaDao
            .addArea(initAreas[0], count++)
            .then(callback(null));

        },
        (callback) => {
          areaDao
            .addArea(initAreas[1], count++)
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          categoryDao
            .add(initCategories[0])
            .then(callback(null));

        },
        (callback) => {
          categoryDao
            .add(initCategories[1])
            .then(callback(null));

        },
        (callback) => {
          typeDao
            .createContentType(initTypes[0])
            .then(callback(null));

        },
        (callback) => {
          typeDao
            .createContentType(initTypes[1])
            .then(callback(null));

        },
        (callback) => {
          tagDao
            .createTag(initTags[0])
            .then(callback(null));

        },
        (callback) => {
          tagDao
            .createTag(initTags[1])
            .then(callback(null));

        },
        (callback) => {
          collectionDao
            .addNewCollection(initCollections[0], 'foo', 'foo', 'foo')
            .then(() => {
              collectionDao.setPublicationStatus(true, 1)
                .then(callback(null));
            });

        },
        (callback) => {
          collectionDao
            .addNewCollection(initCollections[1], 'foo', 'foo', 'foo')
            .then(() => {
              collectionDao.setPublicationStatus(true, 2)
                .then(callback(null));
            });
        }
      ],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          done();
        }
      });
  });


  it('should find collection with id 1.', (done) => {

    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections.dataValues.title).to.have.string(initCollections[0]);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findCollectionById(1)
      .then(_onSuccess)
      .catch(_onError);
  });


  it('should add collection to area one', (done) => {

    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.CollectionId).to.equal(2);
      expect(collection.dataValues.AreaId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.addCollectionToArea(2, 1)
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should add collection to category one', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.CollectionId).to.equal(1);
      expect(collection.dataValues.CategoryId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.addCollectionToCategory(1, 1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should add content type to collection', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.CollectionId).to.equal(1);
      expect(collection.dataValues.ItemContentId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.createItemContentTarget(1, 1)
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should add subject tag to collection', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.CollectionId).to.equal(2);
      expect(collection.dataValues.TagId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.addTagTarget(2, 1)
      .then(_onSuccess)
      .catch(_onError);
  });


  it('should retrieve all collections', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections[1].dataValues.title).to.have.string('Init Collection Two');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.retrieveAllCollections()
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should update collection with id 2', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.updateCollection(updateCollectionData, '2')
      .then(_onSuccess)
      .catch(_onError);
  });


  it('should return collections for area.', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections.length).to.equal(1);
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsByArea('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should get the publication status of the collection', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.published).to.be.true;
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getPublicationStatus('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find collection types for area one', (done) => {
    let _onSuccess = (count) => {
      expect(count).to.be.defined;
      expect(count[0].ctype).to.have.string('col');
      expect(count[0].count).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.countCTypesByArea('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find browse types for area 1', (done) => {
    let _onSuccess = (count) => {
      expect(count).to.be.defined;
      expect(count[0].browseType).to.have.string('test');
      expect(count[0].count).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.browseTypesByArea('1')
      .then(_onSuccess)
      .catch(_onError);
  });


  it('should find repo types for area 1', (done) => {
    let _onSuccess = (count) => {
      expect(count).to.be.defined;
      expect(count[0].repoType).to.have.string('search');
      expect(count[0].count).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.repoTypesByArea('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find collections in area 1', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections[0].dataValues.CollectionId).to.equal(2);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findCollectionsInArea('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find areas for collection 2', (done) => {
    let _onSuccess = (areas) => {
      expect(areas).to.be.defined;
      expect(areas[0].dataValues.AreaId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findAreasForCollection('2')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should check for existing association between collection and content type', (done) => {
    let _onSuccess = (type) => {
      expect(type).to.be.defined;
      expect(type.dataValues.ItemContentId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findItemContentTarget('1', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find content types for collection.', (done) => {
    let _onSuccess = (type) => {
      expect(type).to.be.defined;
      expect(type[0].dataValues.ItemContentId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findContentTypesForCollection('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should retrieve collections for content type 1', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection[0].title).to.equal('Init Collection One');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsByContentType('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should retrieve collections for content type 1 and area 2', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      // should return no collection
      expect(collection.length).to.equal(0);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsByAreaAndContentType('2', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should retrieve zero collections for content type 1 and area 1 and subject 1', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      // should return no collection
      expect(collection.length).to.equal(0);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsByAreaSubjectAndContentType('1', '1', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should check for existing association between tag and collection.', (done) => {
    let _onSuccess = (tag) => {
      expect(tag).to.be.defined;
      expect(tag.dataValues.TagId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    collectionDao.checkForExistingTagTarget('2', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find areas for collection.', (done) => {
    let _onSuccess = (areas) => {
      expect(areas).to.be.defined;
      expect(areas[0].dataValues.AreaId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getAreaIdsForCollection('2')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should check for association between area and collection.', (done) => {
    let _onSuccess = (areas) => {
      expect(areas).to.be.defined;
      expect(areas.dataValues.AreaId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.checkAreaAssociation('2', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find collection by collection id', (done) => {
    let _onSuccess = (collection) => {
      expect(collection).to.be.defined;
      expect(collection.dataValues.title).to.have.string('Updated Collection');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findCollectionById('2')
      .then(_onSuccess)
      .catch(_onError)
  });

  it('should find category for collection.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category.dataValues.CategoryId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findCategoryAssociation('1')
      .then(_onSuccess)
      .catch(_onError);
  });


  it('should update the collection category.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.updateCollectionCategory('1', '2')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should update the collection image name.', (done) => {
    let _onSuccess = (image) => {
      expect(image).to.be.defined;
      expect(image[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.updateCollectionImage(1, 'image_for_coll_1.jpg')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find subject tags for collection.', (done) => {
    let _onSuccess = (tags) => {
      expect(tags).to.be.defined;
      expect(tags[0].dataValues.TagId).to.equal(1);
      expect(tags[0].dataValues.Tag).to.be.an('object');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.findTagsForCollection('2')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find related collections.', (done) => {
    let _onSuccess = (related) => {
      expect(related).to.be.defined;
      expect(related[0].title).to.have.string('Updated Collection');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };
    // The collection id must not be identical to test collection. Using 2.
    collectionDao.findRelatedCollections('1', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should return collections for area.', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections[0].title).to.have.string('Updated Collection');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsByArea('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should return collection in subject and area.', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections[0].title).to.have.string('Updated Collection');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsBySubjectAndArea('1', '1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should get collections by subject tag.', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections[0].CollectionId).to.equal(2);
      expect(collections[0].title).to.have.string('Updated Collection');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsBySubject('1')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should get collections by category.', (done) => {
    let _onSuccess = (collections) => {
      expect(collections).to.be.defined;
      expect(collections[0].CollectionId).to.equal(1);
      expect(collections[0].title).to.have.string('Init Collection One');
      done();
    };

    let _onError = (err) => {
      expect(true).to.be.false; // should not come here
    };

    collectionDao.getCollectionsByCategory('2')
      .then(_onSuccess)
      .catch(_onError);
  });


});
