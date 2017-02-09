/**
 * Created by mspalti on 1/23/17.
 */
'use strict';

describe('The collection area selector component', () => {

  let $componentController;

  let CollectionObservable,
    CollectionAreasObservable,
    AreaListObservable,
    AreasForCollection,
    AreaTargetAdd,
    AreaTargetRemove,
    TaggerToast,
    testCollectionId,
    testAreaId,
    testTwoAreaResponse,
    testSingleAreaResponse,
    testAreasForCollectionAdd,
    testAreasForCollectionRemove,
    testAreasForCollectionResponse,
    testAreaResponse,
    failedQuery,
    deferred,
    $rootScope;

  beforeEach(module('tagger'));

  // create mock objects
  beforeEach(() => {

    module(($provide) => {
      $provide.value('AreaListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });
    module(($provide) => {
      $provide.value('CollectionObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });
    module(($provide) => {
      $provide.value('CollectionAreasObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });
    module(($provide) => {
      $provide.value('AreasForCollection', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaTargetAdd', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaTargetRemove', {
        query: () => {
        }
      });
    });


  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;

  }));


  beforeEach(inject((_AreaListObservable_,
                     _CollectionObservable_,
                     _CollectionAreasObservable_,
                     _AreasForCollection_,
                     _AreaTargetAdd_,
                     _AreaTargetRemove_,
                     _TaggerToast_,
                     _$rootScope_,
                     _$q_) => {

    AreaListObservable = _AreaListObservable_;
    CollectionAreasObservable = _CollectionAreasObservable_;
    CollectionObservable = _CollectionObservable_;
    AreasForCollection = _AreasForCollection_;
    AreaTargetAdd = _AreaTargetAdd_;
    AreaTargetRemove = _AreaTargetRemove_;
    TaggerToast = _TaggerToast_;
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    testCollectionId = 1;
    testAreaId = 1;
    testTwoAreaResponse = {
      status: 'success',
      data: {
        areaList: [
          {
            AreaId: 1,
            CollectionId: 1
          },
          {
            AreaId: 2,
            CollectionId: 1
          }
        ]
      }

    };

    testSingleAreaResponse = {
      status: 'success',
      data: {
        areaList: [
          {
            AreaId: 2,
            CollectionId: 1
          }
        ]
      }
    };

    failedQuery = {
      status: 'failure',
      reason: 'unknown'
    };

    testAreaResponse = testTwoAreaResponse;

    testAreasForCollectionAdd = [
      {
        AreaId: 1,
        CollectionId: 1
      },
      {
        AreaId: 2,
        CollectionId: 1
      },
    ];

    testAreasForCollectionRemove = [
      {
        AreaId: 2,
        CollectionId: 1
      },
    ];

    testAreasForCollectionResponse = testAreasForCollectionAdd;


  });

  // configure spies
  beforeEach(() => {

    let fakeAreaListCallback = () => {
    };
    let fakeCollectionCallback = () => {
    };

    // collection id observable.
    spyOn(CollectionObservable, 'set').and.callFake(() => {
      fakeCollectionCallback(testCollectionId);
    });
    spyOn(CollectionObservable, 'get').and.callFake(() => {
      return testCollectionId;
    });
    spyOn(CollectionObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionCallback = o;
    });

    // collection areas observable.
    spyOn(CollectionAreasObservable, 'set');
    spyOn(CollectionAreasObservable, 'get');
    spyOn(CollectionAreasObservable, 'subscribe');

    spyOn(TaggerToast, 'toast');

    // area list observable.
    spyOn(AreaListObservable, 'set').and.callFake(() => {
      fakeAreaListCallback(testAreaResponse);
    });
    spyOn(AreaListObservable, 'get').and.callFake(() => {
      return testTwoAreaResponse;
    });
    spyOn(AreaListObservable, 'subscribe').and.callFake((o) => {
      fakeAreaListCallback = o;
    });

    spyOn(AreasForCollection, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testAreasForCollectionResponse);
          }
        }
      }
    });

    spyOn(AreaTargetAdd, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testAreaResponse);
          }
        }
      }
    });

    spyOn(AreaTargetRemove, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });


  it('should initialize the component.', () => {

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();

    expect(AreasForCollection.query).toHaveBeenCalledWith({collId: testCollectionId});
    expect(ctrl.areaTargets).toEqual(testAreasForCollectionResponse);
    expect(ctrl.areas).toEqual(testAreaResponse);
    expect(CollectionObservable.subscribe).toHaveBeenCalled();
    expect(AreaListObservable.subscribe).toHaveBeenCalled();

  });

  it('should set new area list on area change', () => {

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    expect(ctrl.areas).toEqual(testTwoAreaResponse);

    testAreaResponse = testSingleAreaResponse;
    AreaListObservable.set(testAreaResponse);

    expect(ctrl.areas).toEqual(testSingleAreaResponse);

  });

  it('should fetch new areas for the collection on collection id change', () => {

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    expect(ctrl.areaTargets).toEqual(testAreasForCollectionResponse);

    testAreasForCollectionResponse = testAreasForCollectionRemove;
    CollectionObservable.set(testAreasForCollectionRemove);

    expect(ctrl.areaTargets).toEqual(testAreasForCollectionRemove);

  });

  it('should remove collection from area.', () => {

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    expect(ctrl.areas).toEqual(testTwoAreaResponse);

    ctrl.update(1);
    deferred.resolve(testAreaResponse);
    $rootScope.$apply();

    expect(AreaTargetRemove.query).toHaveBeenCalledWith({collId: testCollectionId, areaId: 1});
    expect(CollectionAreasObservable.set).toHaveBeenCalled();


  });

  it('should toast after failing to remove collection from area.', () => {

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    expect(ctrl.areas).toEqual(testTwoAreaResponse);

    ctrl.update(1);
    deferred.resolve(failedQuery);
    $rootScope.$apply();

    expect(TaggerToast.toast).toHaveBeenCalledWith(
      failedQuery.status +
      ': ' +
      failedQuery.reason);


  });

  it('should do nothing when attempting to remove last area for collection.', () => {

    testAreasForCollectionResponse = testAreasForCollectionRemove;

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();

    // this will attempt to move the last area -- not allowed
    ctrl.update(2);
    expect(CollectionAreasObservable.set.calls.count()).toEqual(0);

  });

  it('should add collection to new area.', () => {

    testAreasForCollectionResponse = testAreasForCollectionRemove;
    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    ctrl.update(1);
    expect(ctrl.areaTargets).toEqual(testAreasForCollectionAdd);

  });

  it('should return true for selected area', () => {

    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    expect(ctrl.isChosen(1)).toBe(true);

  });

  it('should return false for selected area', () => {

    // remove area one from the target list.
    testAreasForCollectionResponse = testAreasForCollectionRemove;
    let ctrl = $componentController('areaSelector', null);
    ctrl.$onInit();
    expect(ctrl.isChosen(1)).toBe(false);

  });


});
