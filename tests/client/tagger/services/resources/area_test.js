/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('area resources', () => {

  let $httpBackend,
    $rootScope,
    AreaList,
    AreaById,
    AreaUpdate,
    AreaAdd,
    AreaDelete,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _AreaList_,
                     _AreaById_,
                     _AreaUpdate_,
                      _AreaAdd_,
                     _AreaDelete_,
                    _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    AreaList = _AreaList_;
    AreaById = _AreaById_;
    AreaUpdate = _AreaUpdate_;
    AreaAdd = _AreaAdd_;
    AreaDelete = _AreaDelete_;
    config = _config_;

  }));

  it('should request area list.', () => {

    $httpBackend.expectGET(config.restHost + 'areas').respond([{id: 3}]);
    let result = AreaList.query();
    $httpBackend.flush();
    expect(result[0].id).toEqual(3);

  });

  it('should request area.', () => {

    $httpBackend.expectGET(config.restHost + 'area/byId/1').respond({name: 'test area'});
    let result = AreaById.query({id: 1});
    $httpBackend.flush();
    expect(result.name).toEqual('test area');

  });

  it('should add area.', () =>{
    let message = {id: 1};
    $httpBackend.expectPOST(config.restHost + 'area/delete', message).respond({status: 'success'});
    let result = AreaDelete.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should delete area.', () =>{
    let message = {title: 'new area'};
    $httpBackend.expectPOST(config.restHost + 'area/add', message).respond({status: 'success'});
    let result = AreaAdd.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should update area.', () => {
    let message = {
      id: 1,
      title: 'test area',
      description: 'description',
      searchUrl: 'http://test.org',
      linkLabel: 'test label',
      url:''
    };
    $httpBackend.expectPOST(config.restHost + 'area/update', message).respond({status: 'success'});
    let result = AreaUpdate.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

});
