/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The authentication observable service', () => {

  let
    IsAuthObserver,
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
                     _IsAuthObserver_) => {

    IsAuthObserver = _IsAuthObserver_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(IsAuthObserver, 'set').and.callThrough();
    spyOn(IsAuthObserver, 'subscribe').and.callThrough();

  });

  it('should update the auth observers and get the auth status.', () => {

    IsAuthObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    IsAuthObserver.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = IsAuthObserver.get();
    expect(testValue).toEqual(2);

  });

});

