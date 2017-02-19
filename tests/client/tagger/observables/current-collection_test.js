/**
 * Created by mspalti on 2/1/17.
 */

'use strict';

/*jshint expr: true*/

describe('The current collection observable service', () => {

  let
    CollectionObservable,
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
                     _CollectionObservable_) => {

    CollectionObservable = _CollectionObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(CollectionObservable, 'set').and.callThrough();
    spyOn(CollectionObservable, 'subscribe').and.callThrough();

  });

  it('should update the current collection id observers and get the new value.', () => {

    CollectionObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    CollectionObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = CollectionObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update current collection observers when value does not change.', () => {

    CollectionObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    CollectionObservable.set(2);
    onNextCalled = false;
    CollectionObservable.set(2);
    expect(onNextCalled).toBe(false);

  });

});
