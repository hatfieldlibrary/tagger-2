/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The thumb observable service', () => {

  let
    ThumbImageObservable,
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
                     _ThumbImageObservable_) => {

    ThumbImageObservable = _ThumbImageObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(ThumbImageObservable, 'set').and.callThrough();
    spyOn(ThumbImageObservable, 'subscribe').and.callThrough();

  });

  it('should update the observers and get the new value.', () => {

    ThumbImageObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    ThumbImageObservable.set('image.png');
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = ThumbImageObservable.get();
    expect(testValue).toEqual('image.png');

  });

  it('should not update the observers when value does not change.', () => {

    ThumbImageObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    ThumbImageObservable.set('image.png');
    onNextCalled = false;
    ThumbImageObservable.set('image.png');
    expect(onNextCalled).toBe(false);

  });

});
