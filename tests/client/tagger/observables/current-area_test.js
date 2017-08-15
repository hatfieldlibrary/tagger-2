/*
 * Copyright (c) 2017.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
