/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

describe('The collection area area update observable', () => {

  let CollectionAreasObservable,
    onNextCalled,
    subscribeCalled;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      // mock Subject so we can test if it's called.
      $provide.value('rxSubject', {
        getSubject: () => {
          return {
            onNext: () => {
              onNextCalled = true;
            },
            subscribe: () => {
              subscribeCalled = true;
            }
          }
        }
      });
    });
  });

  beforeEach(inject((_rxSubject_,
                     _CollectionAreasObservable_) => {

    CollectionAreasObservable = _CollectionAreasObservable_;

  }));

  beforeEach(() => {

    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(CollectionAreasObservable, 'set').and.callThrough();
    spyOn(CollectionAreasObservable, 'subscribe').and.callThrough();

  });

  it('should notify of change .', () => {

    CollectionAreasObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    CollectionAreasObservable.set(2);
    expect(onNextCalled).toBe(true);
    let testValue = CollectionAreasObservable.get();
    expect(testValue).toEqual(null);

  });


});

