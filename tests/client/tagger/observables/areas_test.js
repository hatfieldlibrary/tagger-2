/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

describe('The area list observable service', () => {

  let
    AreaListObservable,
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
                     _AreaListObservable_) => {

    AreaListObservable = _AreaListObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(AreaListObservable, 'set').and.callThrough();
    spyOn(AreaListObservable, 'subscribe').and.callThrough();

  });

  it('should update the area list observers and get the new value.', () => {

    AreaListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    AreaListObservable.set([1, 2]);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = AreaListObservable.get();
    expect(testValue).toEqual([1, 2]);

  });

  it('should not update the area list observers when value does not change.', () => {

    AreaListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    AreaListObservable.set([1,2]);
    onNextCalled = false;
    AreaListObservable.set([1,2]);
    expect(onNextCalled).toBe(false);

  });

});
