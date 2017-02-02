/**
 * Created by mspalti on 2/1/17.
 */
/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

describe('The user area observable service', () => {

  let
    UserAreaObservable,
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
                     _UserAreaObservable_) => {

    UserAreaObservable = _UserAreaObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(UserAreaObservable, 'set').and.callThrough();
    spyOn(UserAreaObservable, 'subscribe').and.callThrough();

  });

  it('should update the area list observers and get the new value.', () => {

    UserAreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    UserAreaObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = UserAreaObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update the area list observers when value does not change.', () => {

    UserAreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    UserAreaObservable.set(2);
    onNextCalled = false;
    UserAreaObservable.set(2);
    expect(onNextCalled).toBe(false);

  });

});
