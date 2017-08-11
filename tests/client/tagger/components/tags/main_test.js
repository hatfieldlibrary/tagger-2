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

describe('The tags main component', () => {

  let $componentController;

  let DialogStrategy,
    TagList,
    TagListObservable,
    TagObservable,
    $q,
    $rootScope,
    deferred,
    tagId,
    tagList;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('DialogStrategy', {
        makeDialog: () => {
        }
      });
    });

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
      $provide.value('TagList', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_DialogStrategy_,
                     _TagListObservable_,
                     _TagList_,
                     _TagObservable_,

                     _$q_,
                     _$rootScope_) => {

    DialogStrategy = _DialogStrategy_;
    TagListObservable = _TagListObservable_;
    TagList = _TagList_;
    TagObservable = _TagObservable_;
    $q = _$q_;
    deferred = $q.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    tagId = 1;

    tagList = [
      {
        id: 1,
        name: 'Tag one',
        url: ''
      },
      {
        id: 2,
        name: 'Tag two',
        url: ''
      },
      {
        id: 3,
        name: 'Tag three',
        url: ''
      }
    ]

  });

  beforeEach(() => {

    let fakeTagListCallback = () => {};
    let fakeTagCallback = () => {};


    spyOn(DialogStrategy, 'makeDialog');

    spyOn(TagListObservable, 'set').and.callFake((x) => {
      fakeTagListCallback(x)
    });
    spyOn(TagListObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(TagListObservable, 'subscribe').and.callFake((o) => {
      fakeTagListCallback = o
    });

    spyOn(TagObservable, 'set').and.callFake((x) => {
      fakeTagCallback(x)
    });
    spyOn(TagObservable, 'get').and.callFake((x) => {
      return
    });
    spyOn(TagObservable, 'subscribe').and.callFake((o) => {
      fakeTagCallback = o
    });


    spyOn(TagList, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });


  it('should initialize the component', () => {

    let ctrl = $componentController('tagsComponent', null);

    ctrl.$onInit();

    expect(DialogStrategy.makeDialog).toHaveBeenCalled();


    deferred.resolve(tagList);
    $rootScope.$apply();

    expect(TagList.query).toHaveBeenCalled();

    expect(TagListObservable.set).toHaveBeenCalledWith(tagList);
    expect(TagObservable.set).toHaveBeenCalledWith(tagList[0].id)

  });

  it('should update the tag title and id', () => {

    let ctrl = $componentController('tagsComponent', null);

    ctrl.$onInit();

    ctrl.menuUpdate(tagList[1].id, tagList[1].name);
    expect(ctrl.currentTag.title).toEqual(tagList[1].name);
    expect(ctrl.currentTag.id).toEqual(tagList[1].id);

  });





});

