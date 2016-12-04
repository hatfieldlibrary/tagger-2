/**
 * Created by mspalti on 12/3/16.
 */

import db from '../../../server/api/tagger/models/index';
import TaggerDAO from '../../../server/api/tagger/dao/area-dao';
import request from 'supertest';
import {sequelize} from '../_helpers/db';
import {should} from 'chai';
import {app} from '../../../server/server';


describe('area.dao', () => {

  before((done) => {
    sequelize.sync({force: true}).complete((err) => {
      if (err) {
        throw err
      }
      else {
        done();
      }
    });
  });

  describe('Tagger CRUD operations', function() {

    it("should insert a new collection into the Collections table", (done) => {
      request(app)
        .post('/admin/collection/create')
        .type('form')
        .send({name: 'Test One'})
        .send({url: 'http://localhost:3000'})
        .send({description: 'This is a test collection.'})
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.text.should.have.string('Test One');
          done()
        });
    });

    it("should retrieve the new collection", function(done) {
      request(server.app)
        .get("/admin/form/collection")
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          should.not.exist(err);
          res.text.should.have.string('Test One');
          done();
        });
    });

    it("should create a tag", function(done) {
      request(server.app)
        .post('/admin/tag/create')
        .type('form')
        .send({name:'Summer'})
        .expect(200)
        .end(function(err,res) {
          should.not.exist(err);
          res.text.should.have.string('Summer');
          done();
        });
    });

    it("should add tag to collection", function(done) {
      request(server.app)
        .post('/admin/collection/tag')
        .type('form')
        .send({collid: '1'})
        .send({tagid: "1"})
        .expect(302)
        .end(function(err,res) {
          should.not.exist(err);
          done();
        });
    });

    it("should create a category", function(done) {
      request(server.app)
        .post('/admin/category/create')
        .type('form')
        .send({title: 'Category One'})
        .send({url: 'http://localhost:3000'})
        .send({description: 'This is a test Category.'})
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.text.should.have.string('Category One');
          done()
        });
    });

    it("should update a category", function(done) {
      request(server.app)
        .post('/admin/category/create')
        .type('form')
        .send({id: '1'})
        .send({title: 'Category Two'})
        .send({url: 'http://localhost:3000'})
        .send({description: 'This is a test Category.'})
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.text.should.have.string('Category Two');
          done()
        });
    });
  });
});
