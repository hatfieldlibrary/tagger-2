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
 * Created by mspalti on 1/25/17.
 */
'use strict';

/*jshint expr: true*/

describe('The collection group/category main component', () => {

  let $componentController;

  let DialogStrategy,
    UserAreaObservable,
    CategoryList,
    GroupListObservable,
    GroupObservable,
    $q,
    $rootScope,
    deferred,
    userArea,
    categories;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('DialogStrategy', {
        makeDialog: () => {
        }
      });
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
      $provide.value('GroupListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('GroupObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });


    module(($provide) => {
      $provide.value('CategoryList', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_DialogStrategy_,
                     _UserAreaObservable_,
                     _CategoryList_,
                     _GroupListObservable_,
                     _GroupObservable_,
                     _$q_,
                     _$rootScope_) => {

    DialogStrategy = _DialogStrategy_;
    UserAreaObservable = _UserAreaObservable_;
    CategoryList = _CategoryList_;
    GroupListObservable = _GroupListObservable_;
    GroupObservable = _GroupObservable_;
    $q = _$q_;
    deferred = $q.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    userArea = 0;

    categories = [
      {
        id: 1,
        title: "category one"
      },
      {
        id: 2,
        title: "category two"
      },
      {
        id: 3,
        title: "category three"
      }
    ]

  });

  beforeEach(() => {

    let fakeUserAreaCallback = () => {};
    let fakeCollectionObservableCallback = () => {};
    let fakeUserAreaObserverCallback = () => {};

    spyOn(DialogStrategy, 'makeDialog');

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeUserAreaCallback(x)
    });
    spyOn(UserAreaObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaCallback = o
    });

    spyOn(GroupListObservable, 'set').and.callFake((x) => {
      fakeCollectionObservableCallback(x)
    });
    spyOn(GroupListObservable, 'get').and.callFake((x) => {
      return
    });
    spyOn(GroupListObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionObservableCallback = o
    });

    spyOn(GroupObservable, 'set').and.callFake((x) => {
      fakeUserAreaObserverCallback(x)
    });
    spyOn(GroupObservable, 'get').and.callFake((x) => {
      return
    });
    spyOn(GroupObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaObserverCallback = o
    });

    spyOn(CategoryList, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });


  it('should initialize the component', () => {

    let ctrl = $componentController('groupsComponent', null);

    ctrl.$onInit();

    deferred.resolve(categories);
    $rootScope.$apply();

    expect(ctrl.userAreaId).toEqual(0);
    expect(DialogStrategy.makeDialog).toHaveBeenCalled();
    expect(CategoryList.query).toHaveBeenCalled();
    expect(GroupListObservable.set).toHaveBeenCalledWith(categories);
    expect(GroupObservable.set).toHaveBeenCalledWith(categories[0].id)

  });

  it('should should update the title and id', () => {

    let ctrl = $componentController('groupsComponent', null);
    ctrl.menuUpdate(categories[1].id, categories[1].title );

    expect(ctrl.currentCategory.title).toEqual(categories[1].title);
    expect(ctrl.currentCategory.id).toEqual(categories[1].id);

    });



});
