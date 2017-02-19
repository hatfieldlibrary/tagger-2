/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The total collections observable service', () => {

  let
    TotalCollectionsObservable,
    subscribeCalled,
    onNextCalled;

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
                     _TotalCollectionsObservable_) => {

    TotalCollectionsObservable = _TotalCollectionsObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TotalCollectionsObservable, 'set').and.callThrough();
    spyOn(TotalCollectionsObservable, 'subscribe').and.callThrough();

  });

  it('should update the observers and get the new value.', () => {

    TotalCollectionsObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TotalCollectionsObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TotalCollectionsObservable.get();
    expect(testValue).toEqual(2);

  });

});

