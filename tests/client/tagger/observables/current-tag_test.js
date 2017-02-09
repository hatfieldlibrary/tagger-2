/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The tag observable service', () => {

  let
    TagObservable,
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
                     _TagObservable_) => {

    TagObservable = _TagObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TagObservable, 'set').and.callThrough();
    spyOn(TagObservable, 'subscribe').and.callThrough();

  });

  it('should update the tag id observers and get the new value.', () => {

    TagObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TagObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update tag observers when value does not change.', () => {

    TagObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagObservable.set(2);
    onNextCalled = false;
    TagObservable.set(2);
    expect(onNextCalled).toBe(false);

  });

});
