/**
 * Created by mspalti on 1/26/17.
 */
'use strict';

/*jshint expr: true*/

describe('The item types summary panel', () => {

  let $componentController;

  let CollectionTypeCount,
    AreaObservable,
    areaId,
    collectionTotal,
    collections,
    deferred,
    $rootScope;


  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('CollectionTypeCount,', {
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

  beforeEach(inject((_CollectionTypeCount_,
                     _AreaObservable_,
                     _$q_,
                     _$rootScope_) => {

    CollectionTypeCount = _CollectionTypeCount_;
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
        count: 3,
        ctype: 'dig'
      },
      {
        count: 1,
        ctype: 'itm'
      },
      {
        count: 2,
        ctype: 'aid'
      }
    ];


  });

  beforeEach(() => {

    let fakeOneCallback = () => {
    };

    spyOn(CollectionTypeCount, 'query').and.callFake(() => {
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

  });

  it('should initialize the component.', () => {

    let ctrl = $componentController('itemTypeSummary', null);

    ctrl.$onInit();

    expect(AreaObservable.subscribe).toHaveBeenCalled();
    expect(AreaObservable.get).toHaveBeenCalled();

     deferred.resolve(collections);
     $rootScope.$apply();

     expect(CollectionTypeCount.query).toHaveBeenCalled();

     expect(ctrl.actualCount).toEqual(6);
     expect(ctrl.eadCount).toEqual(2);
     expect(ctrl.itmCount).toEqual(1);
     expect(ctrl.digCount).toEqual(3);


  });

  it('should update the component on area change.', () => {

    let ctrl = $componentController('itemTypeSummary', null);

    ctrl.$onInit();

    AreaObservable.set(2);
    expect(CollectionTypeCount.query).toHaveBeenCalledWith({areaId: 2});

  });

});
