/**
 * Created by mspalti on 2/1/17.
 */
/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

/*jshint expr: true*/

describe('The tag list observable service', () => {

  let
    TagListObservable,
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
                     _TagListObservable_) => {

    TagListObservable = _TagListObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(TagListObservable, 'set').and.callThrough();
    spyOn(TagListObservable, 'subscribe').and.callThrough();

  });

  it('should update the area list observers and get the new value.', () => {

    TagListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagListObservable.set([1, 2]);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = TagListObservable.get();
    expect(testValue).toEqual([1, 2]);

  });

  it('should not update the area list observers when value does not change.', () => {

    TagListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    TagListObservable.set([1,2]);
    onNextCalled = false;
    TagListObservable.set([1,2]);
    expect(onNextCalled).toBe(false);

  });

});
