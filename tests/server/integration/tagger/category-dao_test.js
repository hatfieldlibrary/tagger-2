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

'use strict';

/*jshint expr: true*/

import db from '../_helpers/db';
import  areaDao from '../../../../server/api/tagger/dao/area-dao';
import categoryDao from '../../../../server/api/tagger/dao/category-dao';
import collectionDao from '../../../../server/api/tagger/dao/collection-dao';
import {expect} from 'chai';
import async from 'async';


let newCategoryId = 0;

const categoryOne =
  {
    title: 'Category Init One',
    url: 'http//category.one.org',
    description: 'Category one test.',
    labeLLink: 'Go to category one',
    areaId: 1
  };

const categoryTwo = {
  title: 'Category Init Two',
  url: 'http//category.two.org',
  description: 'Category two test.',
  labeLLink: 'Go to category two',
  areaId: 1
};

const categoryThree = {
  title: 'Category Init Three',
  url: 'http//category.three.org',
  description: 'Category three test.',
  labeLLink: 'Go to category three',
  areaId: 2
};


const initCategories = [
  'Category One',
  'Category Two',
  'Category Three'
];

const initAreas = [
  'Area One',
  'Area Two'
];

let count = 2;


describe('Category creation', () => {

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


  it('should add category.', (done) => {
    let _onSuccess = (result) => {
      expect(result.dataValues.title).to.equal(initCategories[0]);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao
      .add(initCategories[0])
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should delete category with id 1.', (done) => {

    let _onSuccess = (result) => {
      expect(result).to.be.defined;
      // Returns id of the deleted area.
      expect(result).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao
      .delete(1)
      .then(_onSuccess)
      .catch(_onError);
  });

});


describe('Category operations', () => {

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
              callback(null);
            }).catch(function (err) {
            callback(err);
          });
        },
        (callback) => {
          areaDao
            .addArea(initAreas[0], count++)
            .then(callback(null))
            .catch((err) => callback(err));

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
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          categoryDao
            .add(initCategories[1])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          categoryDao
            .add(initCategories[2])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          collectionDao
            .addNewCollection('test collection')
            .then(callback(null))
            .catch((err) => callback(err));
        },
        (callback) => {
          collectionDao.addCollectionToCategory(1, 1)
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


  it('should update category one with area id one.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category[0]).to.equal(1);

      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao.update(categoryOne, 1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should update category three with area id two.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category[0]).to.equal(1);

      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao.update(categoryThree, 2)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should update category two with area id two.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category[0]).to.equal(1);

      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao.update(categoryTwo, 3)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should list three catgories.', (done) => {

    let _onSuccess = (categories) => {

      expect(categories).to.be.defined;
      expect(categories.length).to.equal(3);
      expect(categories[0].dataValues.title).to.have.string('Category Init One');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao.findAll()
      .then(_onSuccess)
      .catch(_onError);

  });


  it('should return something.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category.length).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao
      .categoriesByCollectionId(1)
      .then(_onSuccess)
      .catch(_onError);
  });


  // Currently returns empty array.  More setup is required to
  // see result.  Pausing here since the query involves joining
  // to the collections table via bridge tables.  Need to consider
  // moving this to collection-dao.
  it('should return count for categories in area one.', (done) => {
    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao.categoryCountByArea(1)
      .then(_onSuccess)
      .catch(_onError);
  });


});

