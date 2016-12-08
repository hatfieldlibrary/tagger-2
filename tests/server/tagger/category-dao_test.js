/**
 * Created by mspalti on 12/6/16.
 */
import db from '../_helpers/db';
import  areaDao from '../../../server/api/tagger/dao/area-dao';
import categoryDao from '../../../server/api/tagger/dao/category-dao'
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


describe('Category operations', () => {

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
        catOne: (callback) => {
          categoryDao
            .add(initCategories[0])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        catTwo: (callback) => {
          categoryDao
            .add(initCategories[1])
            .then(callback(null))
            .catch((err) => callback(err));

        },
        catThree: (callback) => {
          categoryDao
            .add(initCategories[2])
            .then(callback(null))
            .catch((err) => callback(err));

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

  it('should delete category 1', (done) => {

    let _onSuccess = (category) => {
      expect(category).to.be.defined;
      expect(category).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    categoryDao.delete(1)
      .then(_onSuccess)
      .catch(_onError);
  });



});

