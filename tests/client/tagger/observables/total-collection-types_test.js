/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The total types observable service', () => {

  let
    TotalTypesObserver,
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
                     _TotalTypesObserver_) => {

    TotalTypesObserver = _TotalTypesObserver_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TotalTypesObserver, 'set').and.callThrough();
    spyOn(TotalTypesObserver, 'subscribe').and.callThrough();

  });

  it('should update the observers and get the new value.', () => {

    TotalTypesObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    TotalTypesObserver.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TotalTypesObserver.get();
    expect(testValue).toEqual(2);

  });

});

