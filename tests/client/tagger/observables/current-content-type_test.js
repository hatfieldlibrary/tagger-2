/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

/*jshint expr: true*/

describe('The content type observable service', () => {

  let
    ContentTypeObservable,
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
                     _ContentTypeObservable_) => {

    ContentTypeObservable = _ContentTypeObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(ContentTypeObservable, 'set').and.callThrough();
    spyOn(ContentTypeObservable, 'subscribe').and.callThrough();

  });

  it('should update the content type observers and get the new value.', () => {

    ContentTypeObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    ContentTypeObservable.set(2);
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = ContentTypeObservable.get();
    expect(testValue).toEqual(2);

  });

  it('should not update current content type observers when value does not change.', () => {

    ContentTypeObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    ContentTypeObservable.set(2);
    onNextCalled = false;
    ContentTypeObservable.set(2);
    expect(onNextCalled).toBe(false);

  });

});
