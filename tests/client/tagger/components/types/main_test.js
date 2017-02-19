/**
 * Created by mspalti on 1/26/17.
 */
'use strict';

/*jshint expr: true*/

describe('The types main component', () => {

  let $componentController;

  let DialogStrategy,
    UserAreaObservable,
    ContentTypeList,
    ContentTypeListObservable,
    ContentTypeObservable,
    $q,
    $rootScope,
    deferred,
    userArea,
    typeId,
    typeList;

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
      $provide.value('ContentTypeList', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_DialogStrategy_,
                     _ContentTypeListObservable_,
                     _UserAreaObservable_,
                     _ContentTypeList_,
                     _ContentTypeObservable_,
                     _$q_,
                     _$rootScope_) => {

    DialogStrategy = _DialogStrategy_;
    UserAreaObservable = _UserAreaObservable_;
    ContentTypeListObservable = _ContentTypeListObservable_;
    ContentTypeList = _ContentTypeList_;
    ContentTypeObservable = _ContentTypeObservable_;
    $q = _$q_;
    deferred = $q.defer();
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
    ]

  });

  beforeEach(() => {

    let fakeTypeListCallback = () => {};
    let fakeTypeCallback = () => {};
    let fakeUserAreaCallback = () => {};


    spyOn(DialogStrategy, 'makeDialog');

    spyOn(ContentTypeListObservable, 'set').and.callFake((x) => {
      fakeTypeListCallback(x)
    });
    spyOn(ContentTypeListObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(ContentTypeListObservable, 'subscribe').and.callFake((o) => {
      fakeTypeListCallback = o
    });

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeUserAreaCallback(x)
    });
    spyOn(UserAreaObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaCallback = o
    });


    spyOn(ContentTypeObservable, 'set').and.callFake((x) => {
      fakeTypeCallback(x)
    });
    spyOn(ContentTypeObservable, 'get').and.callFake((x) => {
      return
    });
    spyOn(ContentTypeObservable, 'subscribe').and.callFake((o) => {
      fakeTypeCallback = o
    });


    spyOn(ContentTypeList, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });


  it('should initialize the component', () => {

    let ctrl = $componentController('typesComponent', null);

    ctrl.$onInit();

    expect(DialogStrategy.makeDialog).toHaveBeenCalled();

    deferred.resolve(typeList);
    $rootScope.$apply();

    expect(ContentTypeList.query).toHaveBeenCalled();

    expect(ctrl.userAreaId).toEqual(userArea);

    expect(ContentTypeListObservable.set).toHaveBeenCalledWith(typeList);
    expect(ContentTypeObservable.set).toHaveBeenCalledWith(typeList[0].id)

  });

  it('should update the type title and id', () => {

    let ctrl = $componentController('typesComponent', null);

    ctrl.$onInit();

    ctrl.menuUpdate(typeList[1].id, typeList[1].name);
    expect(ctrl.currentType.title).toEqual(typeList[1].name);
    expect(ctrl.currentType.id).toEqual(typeList[1].id);

  });





});

