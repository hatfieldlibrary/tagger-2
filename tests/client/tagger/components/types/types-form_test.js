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
 * Created by mspalti on 1/26/17.
 */
'use strict';

/*jshint expr: true*/

describe('The type form component', () => {

  let $componentController;

  let UserAreaObservable,
    ContentTypeListObservable,
    ContentTypeObservable,
    ContentType,
    ContentTypeUpdate,
    ContentTypeList,
    $q,
    $rootScope,
    typeDeferred,
    typeListDeferred,
    updateDeferred,
    userArea,
    typeId,
    typeList,
    type,
    bindings;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('ContentTypeListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('UserAreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('ContentTypeObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });


    module(($provide) => {
      $provide.value('ContentType', {
        query: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('ContentTypeList', {
        query: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('ContentTypeUpdate', {
        update: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_ContentTypeUpdate_,
                     _ContentTypeList_,
                     _GroupObservable_,
                     _ContentType_,
                     _ContentTypeObservable_,
                     _ContentTypeListObservable_,
                     _UserAreaObservable_,
                     _$q_,
                     _$rootScope_) => {

    UserAreaObservable = _UserAreaObservable_;
    ContentTypeUpdate = _ContentTypeUpdate_;
    ContentTypeList = _ContentTypeList_;
    ContentType = _ContentType_;
    ContentTypeObservable = _ContentTypeObservable_;
    ContentTypeListObservable = _ContentTypeListObservable_;
    $q = _$q_;
    typeDeferred = $q.defer();
    typeListDeferred = $q.defer();
    updateDeferred = $q.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    userArea = 0;

    typeId = 1;

    typeList = [
      {
        id: 1,
        name: 'Type one'
      },
      {
        id: 2,
        name: 'Type two'
      },
      {
        id: 3,
        name: 'Type three'
      }
    ];

    type = {
      id: 2,
      name: 'Type two',
      icon: '',

    };



    let menuSpy = jasmine.createSpy('menuSpy');
    bindings = {menu: menuSpy};

  });

  beforeEach(() => {

    let fakeTypeListCallback = () => {
    };
    let fakeTypeObservableCallback = () => {
    };
    let fakeUserAreaObservableCallback = () => {
    };

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeUserAreaObservableCallback(x)
    });
    spyOn(UserAreaObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaObservableCallback = o
    });


    spyOn(ContentTypeObservable, 'set').and.callFake((x) => {
      fakeTypeObservableCallback(x)
    });
    spyOn(ContentTypeObservable, 'get').and.callFake(() => {
      return typeId;
    });
    spyOn(ContentTypeObservable, 'subscribe').and.callFake((o) => {
      fakeTypeObservableCallback = o
    });


    spyOn(ContentTypeListObservable, 'set').and.callFake((x) => {
      fakeTypeListCallback(x)
    });
    spyOn(ContentTypeListObservable, 'get').and.callFake((x) => {
      return typeList;
    });
    spyOn(ContentTypeListObservable, 'subscribe').and.callFake((o) => {
      fakeTypeListCallback = o
    });

    spyOn(ContentTypeList, 'query').and.callFake(() => {
      return {
        $promise: typeListDeferred.promise
      }
    });

    spyOn(ContentType, 'query').and.callFake(() => {
      return {
        $promise: typeDeferred.promise
      }
    });

    spyOn(ContentTypeUpdate, 'update').and.callFake(() => {
      return {
        $promise: updateDeferred.promise
      }
    });

  });


  it('should initialize the component', () => {

    let ctrl = $componentController('typesForm', null, bindings);

    ctrl.$onInit();

    expect(ContentTypeObservable.subscribe).toHaveBeenCalled();
   // expect(UserAreaObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(userArea);


    // resolve tag promise
    typeDeferred.resolve(type);
    $rootScope.$apply();

    expect(ctrl.contentType).toEqual(type);

    expect(ContentType.query).toHaveBeenCalledWith({id: typeId});
    expect(ctrl.menu).toHaveBeenCalledWith({id: type.id, title: type.name});

  });

  it('should update type by subscription', () => {

    let ctrl = $componentController('typesForm', null, bindings);

    ctrl.$onInit();

    ContentTypeObservable.set(2);
    expect(ContentType.query).toHaveBeenCalledWith({id: 2});

  });

  it('should update the type', () => {

    let ctrl = $componentController('typesForm', null, bindings);

    ctrl.$onInit();

    // initialize contentType via promise.
    typeDeferred.resolve(type);
    $rootScope.$apply();

    // call update
    ctrl.updateContentType();

    typeListDeferred.resolve(typeList);
    updateDeferred.resolve({status: 'success'});
    $rootScope.$apply();

    expect(ContentTypeUpdate.update).toHaveBeenCalled();
    expect(ContentTypeList.query).toHaveBeenCalled();
    expect(ContentTypeListObservable.set).toHaveBeenCalledWith(typeList);

  });


});
