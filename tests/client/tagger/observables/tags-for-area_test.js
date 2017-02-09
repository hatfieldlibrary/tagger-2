/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The tags for area observable service', () => {

  let
    TagsForAreaObservable,
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
                     _TagsForAreaObservable_) => {

    TagsForAreaObservable = _TagsForAreaObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TagsForAreaObservable, 'set').and.callThrough();
    spyOn(TagsForAreaObservable, 'subscribe').and.callThrough();

  });

  it('should update the observers and get the new value.', () => {

    TagsForAreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagsForAreaObservable.set([1, 2]);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TagsForAreaObservable.get();
    expect(testValue).toEqual([1, 2]);

  });

  it('should not update the observers when value does not change.', () => {

    TagsForAreaObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagsForAreaObservable.set([1,2]);
    onNextCalled = false;
    TagsForAreaObservable.set([1,2]);
    expect(onNextCalled).toBe(false);

  });

});
