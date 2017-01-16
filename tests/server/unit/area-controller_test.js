/**
 * Created by mspalti on 1/15/17.
 */

import area from '../../../server/api/tagger/controllers/area';
import  areaDao from '../../../server/api/tagger/dao/area-dao';
import utils from '../../../server/api/tagger/utils/response-utility'
import Promise from 'bluebird';
import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

describe('Area controller functions', () => {

  let stubResponseUtility = sinon.stub(utils, 'sendResponse', function (res, area) {console.log(area)});
  let stubSuccess = sinon.stub(utils, 'sendSuccessJson');

  const res = {
    setHeader: () => {
    },
    end: () => {
    }
  };

  afterEach(() => {
    stubResponseUtility.reset();
  });


  it('should add area.', () => {

    let req = {params: {id: 1}};
    let areaResponse = {id: '1', name: 'Duck Pond'};

    sinon.spy(area, 'byId');

    sinon.stub(areaDao, 'findAreaById', () => {
      return new Promise.resolve(areaResponse)
    });

    area.byId(req, res);
    expect(area.byId).calledOnce;
    expect(utils.sendResponse).calledOnce;
    stubResponseUtility.calledWith(res, areaResponse);

  });


  it('get list of areas.', () => {
    let req = {};
    let areasResponse = [{id: '1', name: 'Duck Pond'}];

    sinon.spy(area, 'list');

    sinon.stub(areaDao, 'listAllAreas', () => {
      return new Promise.resolve(areasResponse)
    });

    area.list(req, res);
    expect(area.list).calledOnce;
    expect(areaDao.listAllAreas).calledOnce;
    expect(utils.sendResponse).calledOnce;
   // expect(stubResponseUtility.calledWith(res, areasResponse)).to.be.true;
  });

  it('Add an area.', () => {

    let req = {body: {title: 'Pig Pen'}};
    let newArea = 'Pig Pen';
    let areaCount = 1;

    let addSpy = sinon.spy(area, 'add');

    let areaCountStub = sinon.stub(areaDao, 'getAreaCount', () => {

      return new Promise.resolve([{dataValues: { count: areaCount }}])
    });

    let addAreaStub = sinon.stub(areaDao, 'addArea', (newArea, count) => {
      console.log('call ' + newArea)
      return new Promise.resolve()
    });


    area.add(req, res);
    //expect(area.add).calledOnce;
    expect(areaCountStub).calledOnce;

    expect(addAreaStub).calledOnce;

    var args = addAreaStub.getCall(0);
    console.log('args')
    console.log(args)
   expect(addAreaStub.calledWith(newArea, areaCount + 1 )).to.be.true;
    expect(utils.sendSuccessJson).calledOnce;
  });


});
