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
 * Created by mspalti on 12/6/16.
 */
import db from '../_helpers/db';
import areaDao from '../../../server/api/tagger/dao/area-dao';
import tagDao from  '../../../server/api/tagger/dao/tags-dao';
import collectionDao from  '../../../server/api/tagger/dao/collection-dao';
import tagAreaDao from '../../../server/api/tagger/dao/tag-target-dao';
import {expect} from 'chai';
import async from 'async';

describe('Tag area target operations', () => {

// Don't use fat arrow. We need this binding for timeout.
  before(function (done) {

    this.timeout(6000);
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
              callback(null,);
            }).catch(function (err) {
            callback(err);
          });
        },
        (callback) => {
          areaDao
            .addArea('mock area', 1)
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          collectionDao.addNewCollection('mock collection')
            .then(callback(null))
            .catch((err) => callback(err))
        },
        (callback) => {
          collectionDao
            .addCollectionToArea(1, 1)
            .then(callback(null))
            .catch((err) => callback(err));
        },
        (callback) => {
          tagDao
            .createTag('mock tag')
            .then(callback(null))
            .catch((err) => callback(err));
        },
        (callback) => {
          collectionDao.addTagTarget(1, 1)
            .then(callback(null))
            .catch((err) => callback(err))
        }
      ],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          done();
        }
      })
  });

  it('should add tag area target.', (done) => {

    let _onSuccess = (tag) => {
      expect(tag).to.be.defined;
      expect(tag.dataValues.TagId).to.equal(1);
      expect(tag.dataValues.AreaId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagAreaDao.addTagToArea(1, 1)
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should find areas for tag.', (done) => {

    let _onSuccess = (areas) => {
      expect(areas).to.be.defined;
      expect(areas[0].dataValues.AreaId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagAreaDao.findAreasForTag(1)
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should find relationship between tag and area.', (done) => {
    let _onSuccess = (match) => {
      expect(match).to.be.defined;
      expect(match.dataValues.AreaId).to.equal(1);
      expect(match.dataValues.TagId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagAreaDao.findTagAreaAssociation(1, 1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should list area relationships for tag.', (done) => {
    let _onSuccess = (matches) => {
      expect(matches).to.be.defined;
      expect(matches[0].dataValues.AreaId).to.equal(1);
      expect(matches[0].dataValues.TagId).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagAreaDao.listTagAssociations(1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should remove tag from collection.', (done) => {
    let _onSuccess = (result) => {
      expect(result).to.be.defined;
      // No return values provided.  We just know that it didn't fail in
      // an obvious way.
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagAreaDao.removeTagFromCollections(1, 1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should remove tag from area.', (done) => {
    let _onSuccess = (result) => {
      expect(result).to.be.defined;
      expect(result).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    tagAreaDao.removeTagFromArea(1, 1)
      .then(_onSuccess)
      .catch(_onError);
  });

});
