/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The publication status observable service', () => {

  let
    PublicationStatusObservable,
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
                     _PublicationStatusObservable_) => {

    PublicationStatusObservable = _PublicationStatusObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(PublicationStatusObservable, 'set').and.callThrough();
    spyOn(PublicationStatusObservable, 'subscribe').and.callThrough();

  });

  it('should update area observers via subscription and get new value.', () => {

    PublicationStatusObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    PublicationStatusObservable.set(true);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = PublicationStatusObservable.get();
    expect(testValue).toEqual(true);

  });



});
