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
import  contentDao from '../../../../server/api/tagger/dao/content-dao';
import collectionDao from  '../../../../server/api/tagger/dao/collection-dao';
import areaDao from  '../../../../server/api/tagger/dao/area-dao';
import {expect} from 'chai';
import async from 'async';

/** Test area names. */
const categoriesInit = [
  'Category Stub One',
  'Category Stub Two'
];

const newTypeTitle = 'new category';


describe('Content type creation', () => {

  // Don't use fat arrow. We need this binding for timeout.
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
            }).catch((err) => {
            callback(err);
          });
        },
        (callback) => {
          db.sequelize.query('SET foreign_key_checks = 1')
            .then(() => {
              callback(null);
            }).catch((err) => {
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


  it('should add content type.', (done) => {
    let _onSuccess = (result) => {
      expect(result.dataValues.name).to.equal(newTypeTitle);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .createContentType(newTypeTitle)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should delete content type with id 1.', (done) => {

    let _onSuccess = (result) => {
      expect(result).to.be.defined;
      expect(result).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .deleteContentType(1)
      .then(_onSuccess)
      .catch(_onError);
  });

});


describe('Content type operations', () => {

// Don't use fat arrow. We need this binding for timeout.
  before(function (done) {

    this.timeout(5000);
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
        },
        (callback) => {
          contentDao
            .createContentType(categoriesInit[0])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          contentDao
            .createContentType(categoriesInit[1])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          areaDao.addArea(1, 1)
            .then(callback(null))
            .catch((err) => callback(err))
        },
        (callback) => {
          collectionDao.addNewCollection('mock collection', 'foo', 'foo', 'foo')
            .then(callback(null))
            .catch((err) => callback(err));
        },
        (callback) => {
          collectionDao.createItemContentTarget(1, 1)
            .then(callback(null))
            .catch((err) => callback(err))
        },
        (callback) => {
          collectionDao.addCollectionToArea(1, 1)
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

  it('should return list of content types.', (done) => {

    let _onSuccess = (types) => {
      expect(types).to.be.defined;
      expect(types.length).to.equal(2);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .getContentTypes()
      .then(_onSuccess)
      .catch(_onError);


  });

  it('should find content type by name.', (done) => {

    let _onSuccess = (type) => {
      expect(type).to.be.defined;
      //expect(type.dataValues.name).to.have.string('New Category');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .findContentTypeByName(categoriesInit[1])
      .then(_onSuccess)
      .catch(_onError);


  });

  it('should find content type by id.', (done) => {

    let _onSuccess = (type) => {

      expect(type).to.be.defined;
      expect(type.dataValues.name).to.have.string(categoriesInit[0]);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .retrieveContentTypeById(1)
      .then(_onSuccess)
      .catch(_onError);

  });


  it('should update content type.', (done) => {

    let _onSuccess = (type) => {
      expect(type).to.be.defined;
      expect(type[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .updateContentType('Updated Content Type', 'balloon', 1)
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should return content type summary for area', (done) => {
    let _onSuccess = (type) => {
      expect(type).to.be.defined;
      expect(type[0].name).to.have.string('Updated Content Type');
      expect(type[0].count).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    contentDao
      .getAreaContentTypeSummary(1)
      .then(_onSuccess)
      .catch(_onError);
  });

});
