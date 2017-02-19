/**
 * Created by mspalti on 1/26/17.
 */
'use strict';

/*jshint expr: true*/

describe('The collection group summary panel', () => {

  let $componentController;

  let CollectionsByArea,
    TotalCollectionsObservable,
    AreaObservable,
    areaId,
    collectionTotal,
    collections,
    deferred,
    $rootScope;


  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('CollectionsByArea', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('TotalCollectionsObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });


    module(($provide) => {
      $provide.value('AreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });
  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_CollectionsByArea_,
                     _TotalCollectionsObservable_,
                     _AreaObservable_,
                     _$q_,
                     _$rootScope_) => {

    CollectionsByArea = _CollectionsByArea_;
    TotalCollectionsObservable = _TotalCollectionsObservable_;
    AreaObservable = _AreaObservable_;
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    areaId = 1;

    collectionTotal = 2;

    // only interested access (restricted/unrestricted) and
    // publication status.
    collections = [
      {
        AreaId: 1,
        CollectionId: 1,
        Collection: {
          id: 1,
          published: true,
          restricted: false
        }
      },
      {
        AreaId: 1,
        CollectionId: 1,
        Collection: {
          id: 2,
          published: true,
          restricted: true
        }
      },
      {
        AreaId: 1,
        CollectionId: 1,
        Collection: {
          id: 2,
          published: true,
          restricted: false
        }
      },
      {
        AreaId: 1,
        CollectionId: 1,
        Collection: {
          id: 3,
          published: false,
          restricted: true
        }
      }
    ];


  });

  beforeEach(() => {

    let fakeOneCallback = () => {
    };
    let fakeTwoCallback = () => {
    };

    spyOn(CollectionsByArea, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(AreaObservable, 'set').and.callFake((x) => {
      fakeOneCallback(x)
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return areaId
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeOneCallback = o
    });

    spyOn(TotalCollectionsObservable, 'set').and.callFake((x) => {
      fakeTwoCallback(x)
    });
    spyOn(TotalCollectionsObservable, 'get').and.callFake(() => {
      return areaId
    });
    spyOn(TotalCollectionsObservable, 'subscribe').and.callFake((o) => {
      fakeTwoCallback = o
    });

  });

  it('should initialize the component.', () => {

    let ctrl = $componentController('collectionAccessSummary', null);

    ctrl.$onInit();

    expect(AreaObservable.subscribe).toHaveBeenCalled();
    expect(AreaObservable.get).toHaveBeenCalled();

    deferred.resolve(collections);
    $rootScope.$apply();

    expect(CollectionsByArea.query).toHaveBeenCalled();
    expect(ctrl.collectionsCount).toEqual(4);
    expect(ctrl.restricted).toEqual(1);
    expect(ctrl.public).toEqual(2);
    expect(ctrl.unpublished).toEqual(1);

  });

  it('should update the component on area change.', () => {

    let ctrl = $componentController('collectionAccessSummary', null);

    ctrl.$onInit();

    AreaObservable.set(2);
    expect(CollectionsByArea.query).toHaveBeenCalledWith({areaId: 2});


  });


});
