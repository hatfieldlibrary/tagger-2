/**
 * Created by mspalti on 2/1/17.
 */
/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

/*jshint expr: true*/

describe('The user info observable service', () => {

  let
    UserObserver,
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
                     _UserObserver_) => {

    UserObserver = _UserObserver_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(UserObserver, 'set').and.callThrough();
    spyOn(UserObserver, 'subscribe').and.callThrough();

  });

  it('should update the area list observers and get the new value.', () => {

    UserObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    UserObserver.set({name: 'test'});
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = UserObserver.get();
    expect(testValue.name).toEqual('test');

  });

  it('should not update the area list observers when value does not change.', () => {

    UserObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    UserObserver.set({name: 'test'});
    onNextCalled = false;
    UserObserver.set({name: 'test'});
    expect(onNextCalled).toBe(false);

  });

});
