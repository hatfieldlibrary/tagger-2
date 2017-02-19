/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The area observable service', () => {

  let
    AreaObservable,
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
                     _AreaObservable_) => {

    AreaObservable = _AreaObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(AreaObservable, 'set').and.callThrough();
    spyOn(AreaObservable, 'subscribe').and.callThrough();

  });

  it('should update area observers via subscription and get new value.', () => {

    AreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    AreaObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = AreaObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update current area observers when value does not change.', () => {

    AreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    AreaObservable.set(2);
    onNextCalled = false;
    AreaObservable.set(2);
    expect(onNextCalled).toBe(false);

  });

});
