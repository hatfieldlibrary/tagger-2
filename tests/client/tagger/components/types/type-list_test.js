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

describe('The type list component', () => {

  let $componentController;

  let ContentTypeListObservable,
    ContentTypeObservable,
    UserAreaObservable,
    userArea,
    typeId,
    typeList;

  beforeEach(module('tagger'));

  beforeEach(() => {


    module(($provide) => {
      $provide.value('ContentTypeListObservable', {
        set: (x) => {
          let a = x;
        },
        get: () => {
        },
        subscribe: (o) => {
          let f = o;
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
      $provide.value('UserAreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });


  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_ContentTypeListObservable_,
                     _UserAreaObservable_,
                     _ContentTypeObservable_) => {

    ContentTypeListObservable = _ContentTypeListObservable_;
    UserAreaObservable = _UserAreaObservable_;
    ContentTypeObservable = _ContentTypeObservable_;


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
    ]

  });

  beforeEach(() => {

    let fakeTypeCallback = () => {};
    let fakeTypeListObservableCallback = () => {};
    let fakeUserAreaObserverCallback = () => {};


    spyOn(ContentTypeObservable, 'set').and.callFake((x) => {
      fakeTypeCallback(x)
    });
    spyOn(ContentTypeObservable, 'get').and.callFake((x) => {
      return typeId;
    });

    spyOn(ContentTypeObservable, 'subscribe').and.callFake((o) => {
      fakeTypeCallback = o
    });

    spyOn(ContentTypeListObservable, 'set').and.callFake((x) => {
      fakeTypeListObservableCallback(x)
    });
    spyOn(ContentTypeListObservable, 'get').and.callFake((x) => {
      return typeList;
    });
    spyOn(ContentTypeListObservable, 'subscribe').and.callFake((o) => {
      fakeTypeListObservableCallback = o
    });

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeUserAreaObserverCallback(x)
    });
    spyOn(UserAreaObservable, 'get').and.callFake((x) => {
      return userArea;
    });
    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaObserverCallback = o
    });

  });


  it('should initialize the list component', () => {

    let ctrl = $componentController('typesList', null);

    ctrl.$onInit();

    expect(UserAreaObservable.get).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(0);
    expect(ContentTypeListObservable.subscribe).toHaveBeenCalled();
    expect(ContentTypeObservable.get).toHaveBeenCalled();
    expect(ContentTypeListObservable.get).toHaveBeenCalled();
    expect(ctrl.types).toEqual(typeList);
    expect(ctrl.currentType).toEqual(typeId);


  });

  it('should change list with subscriber update', () => {

    let ctrl = $componentController('typesList', null);

    ctrl.$onInit();

    typeList[0].name = 'updated title';

    ContentTypeListObservable.set(typeList);

    expect(ctrl.types).toEqual(typeList);


  });


  it('should change the current tag', () => {

    let ctrl = $componentController('typesList', null);

    ctrl.resetType(2);

    expect(ContentTypeObservable.set).toHaveBeenCalledWith(2);
    expect(ctrl.currentType).toEqual(2);

  });


});

