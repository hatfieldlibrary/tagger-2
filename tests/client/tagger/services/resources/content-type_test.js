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
 * Created by mspalti on 2/2/17.
 */
'use strict';

/*jshint expr: true*/

describe('tag resources', () => {

  let $httpBackend,
    $rootScope,
    ContentTypeCount,
    ContentType,
    ContentTypeList,
    ContentTypeAdd,
    ContentTypeDelete,
    ContentTypeUpdate,
    typeName,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _ContentTypeCount_,
                     _ContentType_,
                     _ContentTypeList_,
                     _ContentTypeAdd_,
                     _ContentTypeDelete_,
                     _ContentTypeUpdate_,
                     _TagUpdate_,
                     _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    ContentTypeCount = _ContentTypeCount_;
    ContentType = _ContentType_;
    ContentTypeList = _ContentTypeList_;
    ContentTypeAdd = _ContentTypeAdd_;
    ContentTypeDelete = _ContentTypeDelete_;
    ContentTypeUpdate = _ContentTypeUpdate_;
    config = _config_;

  }));

  beforeEach(() => {
    typeName = 'test type';
  });

  it('should request tag counts by area.', () => {

    $httpBackend.expectGET(config.restHost + 't/content/byArea/count/1').respond([{name: typeName, count: 1}]);
    let result = ContentTypeCount.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].name).toEqual(typeName);

  });

  it('should request type by it\'s id.', () => {

    $httpBackend.expectGET(config.restHost + 't/content/byId/1').respond({name: typeName});
    let result = ContentType.query({id: 1});
    $httpBackend.flush();
    expect(result.name).toEqual(typeName);

  });

  it('should request list of types.', () => {

    $httpBackend.expectGET(config.restHost + 't/content/show/list').respond([{name: typeName}]);
    let result = ContentTypeList.query();
    $httpBackend.flush();
    expect(result[0].name).toEqual(typeName);

  });


  it('should request type update.', () =>{
    let message = {
      name: 'update type',
      id: 1

    };
    $httpBackend.expectPOST(config.restHost + 't/content/update', message).respond({status: 'success'});
    let result = ContentTypeUpdate.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request tag deletion.', () =>{
    let message = {
      id: 1

    };
    $httpBackend.expectPOST(config.restHost + 't/content/delete', message).respond({status: 'success'});
    let result = ContentTypeDelete.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request tag addition.', () =>{
    let message = {
      name: 'update type'

    };
    $httpBackend.expectPOST(config.restHost + 't/content/add', message).respond({status: 'success'});
    let result = ContentTypeAdd.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

});

