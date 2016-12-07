/**
 * Created by mspalti on 12/3/16.
 */

import db from '../_helpers/db';
import  areaDao from '../../../server/api/tagger/dao/area-dao'
import {expect} from 'chai';
import async from 'async';

/** Test area names. */
const areas = [
  'Area Stub One',
  'Area Stub Two',
  'Area Stub Three'
];
/**
 * Area array with reordered ids.  This is
 * used to change position attributes in the Areas table.
 * */
const reorderedAreas = [
  {
    id: 3
  },
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 4
  },

];

/** Adds test areas. */
const areasSetup = (callback,) => {

  let count = 2;

  async.series(
    {
      areaOne: (callback) => {
        areaDao
          .addArea(areas[0], count++)
          .then(callback(null))
          .catch((err) => callback(err));

      },
      areaTwo: (callback) => {
        areaDao
          .addArea(areas[1], count++)
          .then(callback(null))
          .catch((err) => callback(err));

      },
      areaThree: (callback) => {
        areaDao
          .addArea(areas[2], count++)
          .then(callback(null))
          .catch((err) => callback(err));

      }
    }, (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });

};


describe('Area operations', () => {

  // Don't use fat arrow. We need this binding for timeout.
  before(function (done) {

    this.timeout(5000);
    async.series(
      {
        removeChecks: (callback) => {
          db.sequelize.query('SET foreign_key_checks = 0')
            .then( () => {
              callback(null);
            }).catch(function (err) {
            console.log(err);
          });
        },
        syncDb: (callback) => {
          db.sequelize.sync({force: true})
            .then( () => {
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
        addAreas: (callback) => {
          areasSetup(callback)
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



  it('should create a new area.', (done) => {

    let _onSuccess = (area) => {
      expect(area).to.be.defined;
      expect(area.dataValues.title).to.have.string('New Area One');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao
      .addArea('New Area One', '1')
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should list four areas.', (done) => {

    let _onSuccess = (areas) => {
      expect(areas).to.be.defined;
      expect(areas.length).to.equal(4);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao.listAllAreas()
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should return the area count.', (done) => {


    let _onSuccess = (result) => {
      expect(result[0].dataValues.count).to.be.defined;
      expect(result[0].dataValues.count).to.equal(4);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao
      .getAreaCount()
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should update the area with id 1.', (done) => {

    let data = {
      title: 'Updated Area',
      url: 'http://some.url.com',
      searchUrl: 'http:/search.com',
      description: 'This is an updated area.',
      linkLabel: 'Go to area'
    };

    let _onSuccess = (result) => {
      expect(result[0]).to.equal(1);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao
      .updateArea(data, 1)
      .then(_onSuccess)
      .catch(_onError);

  });

  it('should return area with the updated title.', (done) => {

    let _onSuccess = (result) => {
      expect(result.dataValues.title).to.equal('Updated Area');
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao
      .findAreaById(1)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should reorder the areas.', (done) => {

    let _onSuccess = (result) => {
      expect(result).to.be.defined;
      // The reorder function returns the area count.
      expect(result).to.equal(4);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao
      .reorder(reorderedAreas, 4)
      .then(_onSuccess)
      .catch(_onError);
  });

  it('should delete area with id 1.', (done) => {

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

    areaDao
      .deleteArea(1)
      .then(_onSuccess)
      .catch(_onError);
  });

});

