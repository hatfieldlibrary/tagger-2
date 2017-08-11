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
 * Created by mspalti on 1/31/17.
 */
'use strict';

/*jshint expr: true*/

describe('The collection area area update observable', () => {

  let CollectionAreasObservable,
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
                     _CollectionAreasObservable_) => {

    CollectionAreasObservable = _CollectionAreasObservable_;

  }));

  beforeEach(() => {

    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(CollectionAreasObservable, 'set').and.callThrough();
    spyOn(CollectionAreasObservable, 'subscribe').and.callThrough();

  });

  it('should notify of change .', () => {

    CollectionAreasObservable.subscribe();
    expect(subscribeCalled).toBe(true);
    CollectionAreasObservable.set(2);
    expect(onNextCalled).toBe(true);
    let testValue = CollectionAreasObservable.get();
    expect(testValue).toEqual(null);

  });


});

