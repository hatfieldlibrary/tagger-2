/**
 * Created by mspalti on 12/6/16.
 */
import areaDao from '../../../server/api/tagger/dao/area-dao';
import tagDao from  '../../../server/api/tagger/dao/tags-dao';
import targetDao from '../../../server/api/tagger/dao/tagtarget-dao';
import collectionDao from '../../../server/api/tagger/dao/collection-dao';
import db from '../_helpers/db';
import {expect} from 'chai';
import async from 'async';

const initAreas = [
  'Init Area One',
  'Init Area Two'
];

const initTags = [
  'cats',
  'dogs'
];

let count = 1;

describe('Tag operations', () => {

  // Don't use fat arrow. We need this binding for timeout.
  before(function (done) {

    this.timeout(6000);
    async.series(
      {
        removeChecks: (callback) => {
          db.sequelize.query('SET foreign_key_checks = 0')
            .then(() => {
              callback(null);
            }).catch(function (err) {
            console.log(err);
          });
        },
        syncDb: (callback) => {
          db.sequelize.sync({force: true})
            .then(() => {
              callback(null);
            }).catch(function (err) {
            callback(err);
          });
        },
        addChecks: (callback) => {
          db.sequelize.query('SET foreign_key_checks = 1')
            .then(() => {
              callback(null,);
            }).catch(function (err) {
            callback(err);
          });
        },
        tagOne: (callback) => {
          tagDao
            .createTag(initTags[0])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        tagTwo: (callback) => {
          tagDao
            .createTag(initTags[1])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        areaOne: (callback) => {
          areaDao
            .addArea(initAreas[0], count++)
            .then(callback(null))
            .catch((err) => callback(err));

        },
        areaTwo: (callback) => {
          areaDao
            .addArea(initAreas[1], count++)
            .then(callback(null))
            .catch((err) => callback(err));

        },
        mockCollection: (callback) => {
          collectionDao.addNewCollection('mock collection')
            .then(callback(null))
            .catch((err) => callback(err))
        },
        mockTagAreaTarget: (callback) => {
          targetDao.addTagToArea(1, 1)
            .then(callback(null))
            .catch((err) => callback(err))
        },
        mockTagTarget: (callback) => {
          collectionDao.addTagTarget(1, 1)
            .then(callback(null))
            .catch((err) => callback(err))
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          done();
        }
      })
  });

  it('should find all tags', (done) => {
    let _onSuccess = (tags) => {
      expect(tags).to.be.defined;
      expect(tags[1].dataValues.name).to.have.string('dogs');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.findAllTags()
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find tag by tag id.', (done) => {
    let _onSuccess = (tag) => {
      expect(tag).to.be.defined;
      expect(tag.dataValues.name).to.have.string('cats');

      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.findTagById(1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find tags associated with area.', (done) => {
    let _onSuccess = (tags) => {
      expect(tags).to.be.defined;
      expect(tags[0].dataValues.Tag).to.be.an('object');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.findTagsInArea(1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should get tag count by area.', (done) => {
    let _onSuccess = (count) => {
      expect(count).to.be.defined;
      expect(count[0].name).to.have.string('cats');
      expect(count[0].count).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.getTagCountByArea(1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should find tag by name.', (done) => {
    let _onSuccess = (tag) => {
      expect(tag).to.be.defined;
      expect(tag.name).to.have.string('cats');

      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.findTagByName('cats')
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should update tag one', (done) => {
    let _onSuccess = (tag) => {
      expect(tag).to.be.defined;
      expect(tag[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.updateTag('mice', 1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should delete tag one', (done) => {
    let _onSuccess = (tag) => {
      expect(tag).to.be.defined;
      expect(tag).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagDao.deleteTag(1)
      .then(_onSuccess)
      .catch(_onError);
  });

});
