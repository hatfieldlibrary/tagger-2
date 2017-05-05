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

describe('The tag list component', () => {

  let $componentController;

  let TagListObservable,
    TagObservable,
    UserAreaObservable,
    userArea,
    tagId,
    tags;

  beforeEach(module('tagger'));

  beforeEach(() => {


    module(($provide) => {
      $provide.value('TagListObservable', {
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

  beforeEach(inject((_TagListObservable_,
                     _UserAreaObservable_,
                     _TagObservable_) => {

    TagListObservable = _TagListObservable_;
    UserAreaObservable = _UserAreaObservable_;
    TagObservable = _TagObservable_;


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
    ]

  });

  beforeEach(() => {

    let fakeTagCallback = () => {};
    let fakeTagListObservableCallback = () => {};
    let fakeUserAreaObserverCallback = () => {};


    spyOn(TagObservable, 'set').and.callFake((x) => {
      fakeTagCallback(x)
    });
    spyOn(TagObservable, 'get').and.callFake((x) => {
      return tagId;
    });

    spyOn(TagObservable, 'subscribe').and.callFake((o) => {
      fakeTagCallback = o
    });

    spyOn(TagListObservable, 'set').and.callFake((x) => {
      fakeTagListObservableCallback(x)
    });
    spyOn(TagListObservable, 'get').and.callFake((x) => {
      return tags;
    });
    spyOn(TagListObservable, 'subscribe').and.callFake((o) => {
      fakeTagListObservableCallback = o
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

    let ctrl = $componentController('tagsList', null);

    ctrl.$onInit();

    expect(UserAreaObservable.get).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(0);
    expect(TagListObservable.subscribe).toHaveBeenCalled();
    expect(TagObservable.get).toHaveBeenCalled();
    expect(TagListObservable.get).toHaveBeenCalled();
    expect(ctrl.tags).toEqual(tags);
    expect(ctrl.currentTag).toEqual(tagId);


  });

  it('should change list with subscriber update', () => {

    let ctrl = $componentController('tagsList', null);

    ctrl.$onInit();

    tags[0].title = 'updated title';

    TagListObservable.set(tags);

    expect(ctrl.tags).toEqual(tags);

  });


  it('should change the current tag', () => {

    let ctrl = $componentController('tagsList', null);

    ctrl.resetTag(2);

    expect(TagObservable.set).toHaveBeenCalledWith(2);
    expect(ctrl.currentTag).toEqual(2);

  });


});

