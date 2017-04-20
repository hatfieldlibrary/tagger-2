/**
 * Created by mspalti on 1/15/17.
 */

'use strict';

import area from '../../../../server/api/tagger/controllers/area/admin';
import  taggerDao from '../../../../server/api/tagger/dao/area-dao';
import utils from '../../../../server/api/tagger/utils/response-utility'
import Promise from 'bluebird';
require('sinon-as-promised')(Promise);
import sinon from 'sinon';
import chai from 'chai';
// import chaiAsPromised from 'chai-as-promised';
// chai.use(chaiAsPromised);
const assert = chai.assert;


describe('The areas controller', () => {

  let stubResponseUtility,
    findAreaByIdStub,
    listAllAreasStub,
    areaCountStub,
    addAreaStub,
    updateAreaStub,
    reorderAreasStub,
    deleteAreaStub,
    successResponseStub;

  let areaResponse = {id: '1', name: 'Duck Pond'};
  let multipleAreas = [{id: '1', name: 'Duck Pond'}, {id: '2', name: 'Chicken Coop'}];
  let addedArea = 'Pig Pen';
  let areaCount = 1;
  let areaCountResponse = [{dataValues: {count: areaCount}}];


  const res = {
    setHeader: () => {
    },
    end: () => {
    }
  };

  beforeEach(() => {

    // Stub the response functions.
    successResponseStub = sinon.stub(utils, 'sendSuccessJson');
    stubResponseUtility = sinon.stub(utils, 'sendResponse', (res, area) => {});

    // Stub the dao functions. These are promises.
    findAreaByIdStub = sinon.stub(taggerDao, 'findAreaById');
    findAreaByIdStub.resolves(areaResponse);
    listAllAreasStub = sinon.stub(taggerDao, 'listAllAreas');
    listAllAreasStub.resolves(areaResponse);
    areaCountStub = sinon.stub(taggerDao, 'getAreaCount');
    areaCountStub.resolves(areaCountResponse);
    addAreaStub = sinon.stub(taggerDao, 'addArea');
    addAreaStub.resolves();
    updateAreaStub = sinon.stub(taggerDao,'updateArea');
    updateAreaStub.resolves([1]);
    reorderAreasStub = sinon.stub(taggerDao, 'reorder');
    reorderAreasStub.resolves();
    deleteAreaStub = sinon.stub(taggerDao, 'deleteArea');
    deleteAreaStub.resolves();

  });

  afterEach(() => {

    successResponseStub.restore();
    findAreaByIdStub.restore();
    stubResponseUtility.restore();
    listAllAreasStub.restore();
    areaCountStub.restore();
    addAreaStub.restore();
    updateAreaStub.restore();
    reorderAreasStub.restore();
    deleteAreaStub.restore();

  });

  it('should find area by id.', () => {

    let req = {params: {id: 1}};

    area.byId(req, res);

    assert.isTrue(findAreaByIdStub.calledWith(1));

    findAreaByIdStub().then((areas) => {
      utils.sendResponse(res, areas);
      assert.isAbove(stubResponseUtility.callCount, 0);
      assert.isTrue(stubResponseUtility.calledWith(res, areaResponse))
    });

  });


  it('should get list of areas.', () => {

    let req = {};

    area.list(req, res);
    listAllAreasStub().then((areas) => {
      utils.sendResponse(res, areas);
      assert.isAbove(stubResponseUtility.callCount, 0);
      assert.isTrue(stubResponseUtility.calledWith(res, areaResponse))
    });

  });

  it('should add an area.', (done) => {

    let req = {body: {title: 'Pig Pen'}};

    area.add(req, res);

    areaCountStub().then((areaCountResponse) => {
      taggerDao.addArea(addedArea, areaCountResponse + 1);
    });

    addAreaStub().then(() => {
      utils.sendSuccessJson(res);
      assert.isAbove(successResponseStub.callCount, 0);
      assert.isTrue(successResponseStub.calledWith(res));
      assert.isTrue(addAreaStub.calledWith(addedArea, areaCountResponse + 1));
    done();
    });

  });

  it('should update the area.', (done) => {
    let req =
      {
        body:
          { id: 3,
            title: 'Chicken Coop',
            description: null,
            linkLabel: null,
            url: null
        }
      };

    const data = {
      title: 'Chicken Coop',
      url: null,
      linkLabel: null,
      description: null
    };

    area.update(req, res);

    updateAreaStub().then((result) => {
      utils.sendResponse(result,  {status: 'success', id: result.id});
        assert.isTrue(updateAreaStub.calledWith(data, 3));
        assert.isAbove(stubResponseUtility.callCount, 0);
        done();

    });

  });

  it('should reorder the areas.', (done) => {

    let req = {body: {areas: multipleAreas}};

    area.reorder(req, res);

    reorderAreasStub().then(() => {
      assert.isTrue(reorderAreasStub.calledWith(multipleAreas, 2));
      assert.isAbove(stubResponseUtility.callCount, 0);
      done();
    });

  });

  it('should delete area.', (done) => {
    let req = {body: {id: 2}};

    area.delete(req, res);

    deleteAreaStub().then(() => {
      assert.isTrue(deleteAreaStub.calledWith(2));
      assert.isAbove(stubResponseUtility.callCount, 0);
      done();
    });

  });


});
