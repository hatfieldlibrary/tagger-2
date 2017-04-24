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
    TagCountForArea,
    TagsForArea,
    TagById,
    TagList,
    TagAdd,
    TagDelete,
    TagUpdate,
    tagName,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _TagCountForArea_,
                     _TagsForArea_,
                     _TagById_,
                     _TagList_,
                     _TagAdd_,
                     _TagDelete_,
                     _TagUpdate_,
                     _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    TagCountForArea = _TagCountForArea_;
    TagsForArea = _TagsForArea_;
    TagById = _TagById_;
    TagList = _TagList_;
    TagAdd = _TagAdd_;
    TagDelete = _TagDelete_;
    TagUpdate = _TagUpdate_;
    config = _config_;

  }));

  beforeEach(() => {
    tagName = 'test tag';
  });

  it('should request tag counts by area.', () => {

    $httpBackend.expectGET(config.restHost + 't/subject/count/byArea/1').respond([{name: tagName, count: 1}]);
    let result = TagCountForArea.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].name).toEqual(tagName);

  });

  it('should request tags for area.', () => {

    $httpBackend.expectGET(config.restHost + 't/subject/byArea/1').respond([{name: tagName}]);
    let result = TagsForArea.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].name).toEqual(tagName);

  });

  it('should request tag by it\'s id.', () => {

    $httpBackend.expectGET(config.restHost + 't/subject/byId/1').respond({name: tagName});
    let result = TagById.query({id: 1});
    $httpBackend.flush();
    expect(result.name).toEqual(tagName);

  });

  it('should request list of tags.', () => {

    $httpBackend.expectGET(config.restHost + 't/subject').respond([{name: tagName}]);
    let result = TagList.query();
    $httpBackend.flush();
    expect(result[0].name).toEqual(tagName);

  });

  it('should request tag update.', () =>{
    let message = {
      name: 'update tag',
      id: 1

    };
    $httpBackend.expectPOST(config.restHost + 't/subject/update', message).respond({status: 'success'});
    let result = TagUpdate.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request tag deletion.', () =>{
    let message = {
      id: 1

    };
    $httpBackend.expectPOST(config.restHost + 't/subject/delete', message).respond({status: 'success'});
    let result = TagDelete.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request tag addition.', () =>{
    let message = {
      name: 'update tag'

    };
    $httpBackend.expectPOST(config.restHost + 't/subject/add', message).respond({status: 'success'});
    let result = TagAdd.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });



});
