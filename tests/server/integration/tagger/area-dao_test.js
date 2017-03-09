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

'use strict';

/*jshint expr: true*/

import db from '../_helpers/db';
import  areaDao from '../../../../server/api/tagger/dao/area-dao';
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

let count = 2;

describe('Area creation', () => {

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

  it('should add area.', (done) => {
    let _onSuccess = (result) => {
      expect(result.dataValues.title).to.equal(areas[0]);
      done();
    };

    let _onError = (err) => {
      console.log(err);
      expect(true).to.be.false; // should not come here
    };

    areaDao
      .addArea(areas[0],1)
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

describe('Area operations', () => {

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
        },
        (callback) => {
          areaDao
            .addArea(areas[0], count++)
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          areaDao
            .addArea(areas[1], count++)
            .then(callback(null))
            .catch((err) => callback(err));

        },
        (callback) => {
          areaDao
            .addArea(areas[2], count++)
            .then(callback(null))
            .catch((err) => callback(err));

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

  it('should list three areas.', (done) => {

    let _onSuccess = (areas) => {
      expect(areas).to.be.defined;
      expect(areas.length).to.equal(3);
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
      expect(result[0].dataValues.count).to.equal(3);
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

});

