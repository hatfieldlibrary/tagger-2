/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

/*jshint expr: true*/

describe('The area action observable service', () => {

  let AreaActionObservable,
    onNextCalled,
    subscribeCalled;

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
                     _AreaActionObservable_) => {

    AreaActionObservable = _AreaActionObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(AreaActionObservable, 'set').and.callThrough();
    spyOn(AreaActionObservable, 'subscribe').and.callThrough();

  });

  it('should update the area action observers via subscription and get the new value.', () => {

    AreaActionObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    AreaActionObservable.set(2);
    expect(onNextCalled).toBe(true);
    let testValue = AreaActionObservable.get();
    expect(testValue).toEqual(2);


  });

  it('should not update area action observers when value does not change.', () => {

    AreaActionObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    AreaActionObservable.set(2);
    onNextCalled = false;
    AreaActionObservable.set(2);
    expect(onNextCalled).toBe(false);

  });

});
