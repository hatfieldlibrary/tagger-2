/**
 * Created by mspalti on 2/2/17.
 */
'use strict';

describe('tag resources', () => {

  let $httpBackend,
    $rootScope,
    getUserInfo,
    UserList,
    UserAdd,
    UserDelete,
    UserUpdate,
    userName,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _getUserInfo_,
                     _UserList_,
                     _UserAdd_,
                     _UserDelete_,
                     _UserUpdate_,
                     _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    getUserInfo = _getUserInfo_;
    UserList = _UserList_;
    UserAdd = _UserAdd_;
    UserDelete = _UserDelete_;
    UserUpdate = _UserUpdate_;
    config = _config_;

  }));

  beforeEach(() => {
    userName = 'test user';
  });


  it('should request information about the current user.', () => {

    $httpBackend.expectGET(config.restHost + 'userinfo').respond({userName: userName});
    let result = getUserInfo.query();
    $httpBackend.flush();
    expect(result.userName).toEqual(userName);

  });

  it('should request list of users.', () => {

    $httpBackend.expectGET(config.restHost + 'users/list').respond([{name: userName}]);
    let result = UserList.query();
    $httpBackend.flush();
    expect(result[0].name).toEqual(userName);

  });


  it('should request user update.', () => {
    let message = {
      id: 1,
      name: userName,
      email: 'userName@somewhere.com',
      area: 1

    };
    $httpBackend.expectPOST(config.restHost + 'users/update', message).respond({status: 'success'});
    let result = UserUpdate.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request user deletion.', () => {
    let message = {
      id: 1

    };
    $httpBackend.expectPOST(config.restHost + 'users/delete', message).respond({status: 'success'});
    let result = UserDelete.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request user addition.', () => {
    let message ={
      name: name,
      email: 'userName@somewhere.com',
      area: 1
    };
    $httpBackend.expectPOST(config.restHost + 'users/add', message).respond({status: 'success'});
    let result = UserAdd.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

});


