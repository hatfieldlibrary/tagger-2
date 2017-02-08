/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The total links observable service', () => {

  let
    TotalLinksObserver,
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
                     _TotalLinksObserver_) => {

    TotalLinksObserver = _TotalLinksObserver_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TotalLinksObserver, 'set').and.callThrough();
    spyOn(TotalLinksObserver, 'subscribe').and.callThrough();

  });

  it('should update the observers and get the new value.', () => {

    TotalLinksObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    TotalLinksObserver.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TotalLinksObserver.get();
    expect(testValue).toEqual(2);

  });

});

