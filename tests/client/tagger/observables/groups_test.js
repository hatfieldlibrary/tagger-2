/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The group list observable service', () => {

  let
    GroupListObservable,
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
                     _GroupListObservable_) => {

    GroupListObservable = _GroupListObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(GroupListObservable, 'set').and.callThrough();
    spyOn(GroupListObservable, 'subscribe').and.callThrough();

  });

  it('should update the group list observers and get the new value.', () => {

    GroupListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    GroupListObservable.set([1, 2]);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = GroupListObservable.get();
    expect(testValue).toEqual([1, 2]);

  });

  it('should not update group list observers when value does not change.', () => {

    GroupListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    GroupListObservable.set([1,2]);
    onNextCalled = false;
    GroupListObservable.set([1,2]);
    expect(onNextCalled).toBe(false);

  });

});
