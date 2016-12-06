/**
 * Created by mspalti on 12/3/16.
 */

import db from '../_helpers/db';
import  areaDao from '../../../server/api/tagger/dao/area-dao'
import {expect} from 'chai';
import async from 'async';

describe('area.dao', () => {

  before((done) => {

    async.series(
      {
        removeChecks: function (callback) {
          db.sequelize.query('SET foreign_key_checks = 0')
            .then(function () {
              callback(null);
            }).catch(function (err) {
            console.log(err);
          });
        },
        syncDb: function (callback) {
          db.sequelize.sync({force: true})
            .then(function () {
              callback(null);
            }).catch(function (err) {
            callback(err);
          });
        },
        addChecks: function (callback) {
          db.sequelize.query('SET foreign_key_checks = 1')
            .then(function () {
              callback(null,);
            }).catch(function (err) {
            callback(err);
          });
        }
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          done();
        }
      })
  });


  describe('Area operations', () => {

    it("should create a new area.", (done) => {

      let _onSuccess = (area) => {
        expect(area).to.be.defined;
        expect(area.dataValues.title).to.have.string('Item One');
        done();
      };

      let _onError = (err) => {
        console.log(err)
        expect(true).to.be.false; // should not come here
      };

      areaDao
        .addArea('Item One', '1')
        .then(_onSuccess)
        .catch(_onError);

    });

    // it("should insert a new collection into the Collections table", (done) => {
    //   request(app)
    //     .post('/rest/collection/add')
    //     .type('form')
    //     .send({title: 'Test One'})
    //     .send({areaId: '1'})
    //     .expect(200)
    //     .end((err, res) => {
    //       should.not.exist(err);
    //       res.text.should.have.string('Test One');
    //       done()
    //     });
    // });

    // it("should retrieve the new collection", (done) => {
    //   request(server.app)
    //     .get("/admin/form/collection")
    //     .expect(200)
    //     .expect('Content-Type', /html/)
    //     .end((err, res) => {
    //       should.not.exist(err);
    //       res.text.should.have.string('Test One');
    //       done();
    //     });
    // });
    //
    // it("should create a tag", (done)=> {
    //   request(server.app)
    //     .post('/admin/tag/create')
    //     .type('form')
    //     .send({name:'Summer'})
    //     .expect(200)
    //     .end((err,res) => {
    //       should.not.exist(err);
    //       res.text.should.have.string('Summer');
    //       done();
    //     });
    // });
    //
    // it("should add tag to collection", (done) => {
    //   request(server.app)
    //     .post('/admin/collection/tag')
    //     .type('form')
    //     .send({collid: '1'})
    //     .send({tagid: "1"})
    //     .expect(302)
    //     .end((err,res) => {
    //       should.not.exist(err);
    //       done();
    //     });
    // });
    //
    // it("should create a category", (done) => {
    //   request(server.app)
    //     .post('/admin/category/create')
    //     .type('form')
    //     .send({title: 'Category One'})
    //     .send({url: 'http://localhost:3000'})
    //     .send({description: 'This is a test Category.'})
    //     .expect(200)
    //     .end((err, res) => {
    //       should.not.exist(err);
    //       res.text.should.have.string('Category One');
    //       done()
    //     });
    // });
    //
    // it("should update a category", (done) => {
    //   request(server.app)
    //     .post('/admin/category/create')
    //     .type('form')
    //     .send({id: '1'})
    //     .send({title: 'Category Two'})
    //     .send({url: 'http://localhost:3000'})
    //     .send({description: 'This is a test Category.'})
    //     .expect(200)
    //     .end((err, res) =>
    //     {
    //       should.not.exist(err);
    //       res.text.should.have.string('Category Two');
    //       done()
    //     });
    // });
  });
});
