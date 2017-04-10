/**
 * Created by mspalti on 1/27/17.
 */
'use strict';

/*jshint expr: true*/

describe('The users component', () => {

  let $componentController;

  let UserList,
    UserAdd,
    UserUpdate,
    UserDelete,
    AreaList,
    TaggerToast,
    deferredAreaList,
    deferredAdd,
    deferredDelete,
    deferredUpdate,
    deferredUserList,
    $rootScope,
    userList,
    areaList,
    success;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('TaggerToast', {
        toast: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('UserList', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('UserAdd', {
        save: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('UserUpdate', {
        update: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('UserDelete', {
        delete: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaList', {
        query: () => {
        }
      });
    });
  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;

  }));

  beforeEach(inject((_UserList_,
                     _UserAdd_,
                     _UserUpdate_,
                     _UserDelete_,
                     _AreaList_,
                     _TaggerToast_,
                     _$q_,
                     _$rootScope_) => {

    UserList = _UserList_;
    UserAdd = _UserAdd_;
    UserUpdate = _UserUpdate_;
    UserDelete = _UserDelete_;
    AreaList = _AreaList_;
    TaggerToast = _TaggerToast_;
    deferredAreaList = _$q_.defer();
    deferredDelete = _$q_.defer();
    deferredUpdate = _$q_.defer();
    deferredUserList = _$q_.defer();
    deferredAdd = _$q_.defer();
    $rootScope = _$rootScope_;

  }));


  beforeEach(() => {

    userList = [
      {
        area: 0,
        id: 1,
        email: 'admin@home.edu',
        name: 'test user one'
      },
      {
        area: 0,
        id: 2,
        email: 'admin@home.edu',
        name: 'test user two'
      },
      {
        area: 2,
        id: 3,
        email: 'manager@home.edu',
        name: 'test user three'
      }
    ];

    areaList = [
      {
        name: 'the observed area one',
        id: 1
      },
      {
        name: 'area two',
        id: 2
      },
      {
        name: 'area three',
        id: 3
      }
    ];

    success = {status: 'success'};

  });

  beforeEach(() => {

    spyOn(TaggerToast, 'toast');

    spyOn(UserList, 'query').and.callFake(() => {
      return {
        $promise: deferredUserList.promise
      }
    });
    spyOn(UserAdd, 'save').and.callFake(() => {
      return {
        $promise: deferredAdd.promise
      }
    });
    spyOn(UserUpdate, 'update').and.callFake(() => {
      return {
        $promise: deferredUpdate.promise
      }
    });
    spyOn(UserDelete, 'delete').and.callFake(() => {
      return {
        $promise: deferredDelete.promise
      }
    });
    spyOn(AreaList, 'query').and.callFake(() => {
      return {
        $promise: deferredAreaList.promise
      }
    });

  });

  it('should initialize component showing current users', () => {

    let ctrl = $componentController('usersComponent', null);

    ctrl.$onInit();

    deferredAreaList.resolve(areaList);
    deferredUserList.resolve(userList);
    $rootScope.$apply();

    expect(AreaList.query).toHaveBeenCalled();
    expect(UserList.query).toHaveBeenCalled();
    expect(ctrl.areaList).toEqual(areaList);


  });

  it('should update the user', () => {

    let ctrl = $componentController('usersComponent', null);

    ctrl.$onInit();


    ctrl.updateUser(1, 'admin@home', 'updated admin user', 0);

    deferredUpdate.resolve(success);
    deferredUserList.resolve(userList);
    $rootScope.$apply();

    let updatedUser = {id: 1, name: 'admin@home', email: 'updated admin user', area: 0};

    expect(UserUpdate.update).toHaveBeenCalledWith(updatedUser);
    expect(UserList.query).toHaveBeenCalled();
    expect(ctrl.users.length).toBe(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('User Updated');

  });

  it('should add new user', () => {

    let ctrl = $componentController('usersComponent', null);

    ctrl.$onInit();

    let newUser = {
      area: 2,
      id: 4,
      email: 'manager@home.edu',
      name: 'added user'
    };
    userList.push(newUser);

    ctrl.updateUser(null, 'admin@home', 'added admin user', 0);
    deferredAdd.resolve(success);
    deferredUserList.resolve(userList);
    $rootScope.$apply();
    let addedUser = {name: 'admin@home', email: 'added admin user', area: 0};

    expect(UserAdd.save).toHaveBeenCalledWith(addedUser);
    expect(UserList.query).toHaveBeenCalled();
    expect(ctrl.users.length).toBe(4);
    expect(TaggerToast.toast).toHaveBeenCalledWith('User Added');

  });

  it('should delete user', () => {

    let ctrl = $componentController('usersComponent', null);

    ctrl.$onInit();

    userList.pop();
    ctrl.deleteUser(1);
    deferredDelete.resolve(success);
    deferredUserList.resolve(userList);
    $rootScope.$apply();

    expect(UserDelete.delete).toHaveBeenCalledWith({id: 1});
    expect(UserList.query).toHaveBeenCalled();
    expect(ctrl.users.length).toBe(2);
    expect(TaggerToast.toast).toHaveBeenCalledWith('User Deleted');


  });

  it('should get empty row for the form', () => {

    let ctrl = $componentController('usersComponent', null);

    ctrl.$onInit();
    deferredUserList.resolve(userList);
    $rootScope.$apply();

    ctrl.newRow();
    expect(ctrl.users.length).toBe(4);
    expect(ctrl.users[3].id).toBe(null);

  });


});
