/**
 * Created by mspalti on 1/25/17.
 */
'use strict';

/*jshint expr: true*/

describe('The collection group/category list component', () => {

  let $componentController;

  let GroupListObservable,
    GroupObservable,
    UserAreaObservable,
    userArea,
    categories,
    groupId;

  beforeEach(module('tagger'));

  beforeEach(() => {


    module(($provide) => {
      $provide.value('GroupListObservable', {
        set: () => {
        },
        get: () => {
        },
        subscribe: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('GroupObservable', {
        set: () => {
        },
        get: () => {
        },
        subscribe: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('UserAreaObservable', {
        set: () => {
        },
        get: () => {
        },
        subscribe: () => {
        }
      });
    });


  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_GroupListObservable_,
                     _UserAreaObservable_,
                     _GroupObservable_) => {

    GroupListObservable = _GroupListObservable_;
    UserAreaObservable = _UserAreaObservable_;
    GroupObservable = _GroupObservable_;


  }));

  beforeEach(() => {

    userArea = 0;
    groupId = 1;

    categories = [
      {
        id: 1,
        title: 'category one'
      },
      {
        id: 2,
        title: 'category two'
      },
      {
        id: 3,
        title: 'category three'
      }
    ]

  });

  beforeEach(() => {

    let fakeCollectionCallback = () => {};
    let fakeUserAreaObservableCallback = () => {};
    let fakeGroupObserverCallback = () => {};


    spyOn(GroupListObservable, 'set').and.callFake((x) => {
      fakeCollectionCallback(x);
    });
    spyOn(GroupListObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(GroupListObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionCallback = o;
    });

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      UserAreaObservable(x);
    });
    spyOn(UserAreaObservable, 'get').and.callFake(() => {
      return userArea;
    });
    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaObservableCallback = o;
    });

    spyOn(GroupObservable, 'set').and.callFake((x) => {
      fakeGroupObserverCallback(x);
    });
    spyOn(GroupObservable, 'get').and.callFake(() => {
      return groupId;
    });
    spyOn(GroupObservable, 'subscribe').and.callFake((o) => {
      fakeGroupObserverCallback = o;
    });

  });


  it('should initialize the list component', () => {

    let ctrl = $componentController('groupsList', null);

    ctrl.$onInit();

    expect(ctrl.userAreaId).toEqual(0);

    expect(GroupObservable.subscribe).toHaveBeenCalled();
    expect(GroupListObservable.subscribe).toHaveBeenCalled();
    expect(GroupObservable.get).toHaveBeenCalled();
    expect(GroupListObservable.get).toHaveBeenCalled();

  });

  it('should change list with subscriber update', () => {

    let ctrl = $componentController('groupsList', null);

    ctrl.$onInit();

    GroupListObservable.set(categories);

    expect(ctrl.categories).toEqual(categories);

  });


  it('should change the group id with subscriber update', () => {

    let ctrl = $componentController('groupsList', null);

    ctrl.$onInit();

    GroupObservable.set(1);

    expect(ctrl.currentCategory).toEqual(1);

  });

  it('should change the current category', () => {

    let ctrl = $componentController('groupsList', null);

    ctrl.resetCategory(2);

    expect(GroupObservable.set).toHaveBeenCalledWith(2);
    expect(ctrl.currentCategory).toEqual(2);

  });


});

