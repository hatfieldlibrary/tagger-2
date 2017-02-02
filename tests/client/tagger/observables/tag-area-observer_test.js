/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The tag area observable service', () => {

  let
    TagAreaObservable,
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
                     _TagAreaObservable_) => {

    TagAreaObservable = _TagAreaObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TagAreaObservable, 'set').and.callThrough();
    spyOn(TagAreaObservable, 'subscribe').and.callThrough();

  });

  it('should update the group id observers and get the new value.', () => {

    TagAreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagAreaObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TagAreaObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update group observers when value does not change.', () => {

    TagAreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagAreaObservable.set(2);
    onNextCalled = false;
    TagAreaObservable.set(2);
    expect(onNextCalled).toBe(false);

  });
});
