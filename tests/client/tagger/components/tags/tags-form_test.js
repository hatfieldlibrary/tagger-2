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

describe('The tag form component', () => {

  let $componentController;

  let UserAreaObservable,
    TagListObservable,
    TagObservable,
    TagById,
    TagUpdate,
    TagList,
    $q,
    $rootScope,
    tagDeferred,
    tagsDeferred,
    updateDeferred,
    userArea,
    tagId,
    tags,
    tag,
    bindings;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('TagListObservable', {
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
      $provide.value('TagObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });


    module(($provide) => {
      $provide.value('TagById', {
        query: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('TagList', {
        query: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('TagUpdate', {
        update: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_TagUpdate_,
                     _TagList_,
                     _GroupObservable_,
                     _TagById_,
                     _TagObservable_,
                     _TagListObservable_,
                     _UserAreaObservable_,
                     _AreaList_,
                     _$q_,
                     _$rootScope_) => {

    UserAreaObservable = _UserAreaObservable_;
    TagUpdate = _TagUpdate_;
    TagList = _TagList_;
    TagById = _TagById_;
    TagObservable = _TagObservable_;
    TagListObservable = _TagListObservable_;
    $q = _$q_;
    tagDeferred = $q.defer();
    tagsDeferred = $q.defer();
    updateDeferred = $q.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    userArea = 0;
    tagId = 1;

    tags = [
      {
        id: 1,
        title: "tag one"
      },
      {
        id: 2,
        title: "tag two"
      },
      {
        id: 3,
        title: "tag three"
      }
    ];

    tag = {

      id: 1,
      name: 'test tag two',
      url: ''

    };


    let menuSpy = jasmine.createSpy('menuSpy');
    bindings = {menu: menuSpy};

  });

  beforeEach(() => {

    let fakeTagListCallback = () => {
    };
    let fakeTagObservableCallback = () => {
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


    spyOn(TagObservable, 'set').and.callFake((x) => {
      fakeTagObservableCallback(x)
    });
    spyOn(TagObservable, 'get').and.callFake(() => {
      return tagId;
    });
    spyOn(TagObservable, 'subscribe').and.callFake((o) => {
      fakeTagObservableCallback = o
    });


    spyOn(TagListObservable, 'set').and.callFake((x) => {
      fakeTagListCallback(x)
    });
    spyOn(TagListObservable, 'get').and.callFake((x) => {
      return tags;
    });
    spyOn(TagListObservable, 'subscribe').and.callFake((o) => {
      fakeTagListCallback = o
    });

    spyOn(TagList, 'query').and.callFake(() => {
      return {
        $promise: tagsDeferred.promise
      }
    });

    spyOn(TagById, 'query').and.callFake(() => {
      return {
        $promise: tagDeferred.promise
      }
    });

    spyOn(TagUpdate, 'update').and.callFake(() => {
      return {
        $promise: updateDeferred.promise
      }
    });

  });


  it('should initialize the component', () => {

    let ctrl = $componentController('tagsForm', null, bindings);

    ctrl.$onInit();

    expect(TagObservable.subscribe).toHaveBeenCalled();
    expect(UserAreaObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(userArea);
    expect(ctrl.tags).toEqual(tags);

    // resolve tag promise
    tagDeferred.resolve(tag);
    $rootScope.$apply();

    expect(TagById.query).toHaveBeenCalledWith({id: tagId});
    expect(ctrl.menu).toHaveBeenCalledWith({id: tag.id, title: tag.name});

  });

  it('should update tag by subscription', () => {

    let ctrl = $componentController('tagsForm', null, bindings);

    ctrl.$onInit();

    TagObservable.set(2);
    expect(TagById.query).toHaveBeenCalledWith({id: 2});

  });

  it('should update userAreaId by subscription', () => {

    let ctrl = $componentController('tagsForm', null, bindings);

    ctrl.$onInit();

    UserAreaObservable.set(2);
    expect(ctrl.userAreaId).toEqual(2);

  });

  it('should update the tag', () => {

    let ctrl = $componentController('tagsForm', null, bindings);

    ctrl.$onInit();

    tagDeferred.resolve(tag);
    $rootScope.$apply();

    ctrl.updateTag();

    tagsDeferred.resolve(tags);
    updateDeferred.resolve({status: 'success'});
    $rootScope.$apply();

    expect(TagUpdate.update).toHaveBeenCalled();
    expect(TagList.query).toHaveBeenCalled();
    expect(TagListObservable.set).toHaveBeenCalledWith(tags);

  });


});
