/**
 * Created by mspalti on 2/1/17.
 */
'use strict';

describe('The collections list observable service', () => {

  let CollectionListObservable,
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
                     _CollectionListObservable_) => {

    CollectionListObservable = _CollectionListObservable_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(CollectionListObservable, 'set').and.callThrough();
    spyOn(CollectionListObservable, 'subscribe').and.callThrough();

  });

  it('should update the collection list observers and get the new value.', () => {

    CollectionListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    CollectionListObservable.set([1,2]);
    expect(onNextCalled).toBe(true);
    let testValue = CollectionListObservable.get();
    expect(testValue).toEqual([1,2]);

  });


  it('should not update the collection list observers when value does not change.', () => {

    CollectionListObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    CollectionListObservable.set([1,2]);
    onNextCalled = false;
    CollectionListObservable.set([1,2]);
    expect(onNextCalled).toBe(false);

  });

});
