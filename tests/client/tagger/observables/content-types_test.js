/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The content type list observable service', () => {

  let
    ContentTypeListObservable,
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
                     _ContentTypeListObservable_) => {

    ContentTypeListObservable = _ContentTypeListObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(ContentTypeListObservable, 'set').and.callThrough();
    spyOn(ContentTypeListObservable, 'subscribe').and.callThrough();

  });

  it('should update the areas and get the new value via subscription.', () => {

    ContentTypeListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    ContentTypeListObservable.set([1, 2]);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = ContentTypeListObservable.get();
    expect(testValue).toEqual([1, 2]);

  });

  it('should not update type list observers when value does not change.', () => {

    ContentTypeListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    ContentTypeListObservable.set([1,2]);
    onNextCalled = false;
    ContentTypeListObservable.set([1,2]);
    expect(onNextCalled).toBe(false);

  });

});
