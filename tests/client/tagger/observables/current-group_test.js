/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The group observable service', () => {

  let
    GroupObservable,
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
                     _GroupObservable_) => {

    GroupObservable = _GroupObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(GroupObservable, 'set').and.callThrough();
    spyOn(GroupObservable, 'subscribe').and.callThrough();

  });

  it('should update the group id observers and get the new value.', () => {

    GroupObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    GroupObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = GroupObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update group observers when value does not change.', () => {

    GroupObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    GroupObservable.set(2);
    onNextCalled = false;
    GroupObservable.set(2);
    expect(onNextCalled).toBe(false);

  });
});
