/**
 * Created by mspalti on 1/16/17.
 */
'use strict';

import utils from '../../../server/api/tagger/utils/response-utility';
import chai from 'chai';
import sinon from 'sinon';
const assert = chai.assert;

describe('The API response', () => {

  let sendResponseStub;

  const res = {
    setHeader: () => {
    },
    end: () => {
    }
  };

  beforeEach(() => {
    sendResponseStub = sinon.stub(utils, 'sendResponse');
  });

  afterEach(() => {
    sendResponseStub.restore();
  });


  it('should send error response', () => {

    let err = new Error('something went wrong.');

    let message = {status: 'Server Error', reason: 'something went wrong.'};

    utils.sendErrorJson(res, err);

    assert.isTrue(sendResponseStub.calledWith(res, message));

  });

  it('should send success response.', () => {

    let message = {status: 'success'};

    utils.sendSuccessJson(res);
    assert.isTrue(sendResponseStub.calledWith(res, message));

  });

  it('should send success response with data.', () => {

    let data = ['it worked'];
    let message = {status: 'success', data: data};


    utils.sendSuccessAndDataJson(res, data);
    assert.isTrue(sendResponseStub.calledWith(res, message));

  });

});
