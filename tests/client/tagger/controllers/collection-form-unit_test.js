/**
 * Created by mspalti on 1/20/17.
 */

'use strict';

describe('The collection form component', () => {

  let $componentController;

  let AreaObservable,
    testAreaId;

  beforeEach(module('tagger'));

  // create mock objects
  beforeEach(() => {

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


  beforeEach(inject((_AreaObservable_) => {

    AreaObservable = _AreaObservable_;


  }));

  // configure spies
  beforeEach(() => {

    let fakeAreaCallback = (value) => {
      testAreaId = value;
    };

    spyOn(AreaObservable, 'set').and.callFake((value) => {
      fakeAreaCallback(value);
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return testAreaId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o;
    });


  });

  beforeEach(() => {
    testAreaId = 1;
  });

  it('should initialize the form on load', () => {

    let ctrl = $componentController('collectionComponent', null);

    ctrl.$onInit;



  });

});
