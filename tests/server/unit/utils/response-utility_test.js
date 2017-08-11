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
 * Created by mspalti on 1/16/17.
 */
'use strict';

import utils from '../../../../server/api/tagger/utils/response-utility';
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
