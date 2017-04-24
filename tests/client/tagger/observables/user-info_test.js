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
/**
 * Created by mspalti on 1/31/17.
 */
'use strict';

/*jshint expr: true*/

describe('The user info observable service', () => {

  let
    UserObserver,
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
                     _UserObserver_) => {

    UserObserver = _UserObserver_;

  }));

  beforeEach(() => {

    // These will be true after functions have
    // been called on the mock rx.Subject.
    onNextCalled = false;
    subscribeCalled = false;

    // We call through so the mocked Subject is invoked.
    spyOn(UserObserver, 'set').and.callThrough();
    spyOn(UserObserver, 'subscribe').and.callThrough();

  });

  it('should update the area list observers and get the new value.', () => {

    UserObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    UserObserver.set({name: 'test'});
    expect(onNextCalled).toBe(true);
    // This will have been updated in the call through.
    let testValue = UserObserver.get();
    expect(testValue.name).toEqual('test');

  });

  it('should not update the area list observers when value does not change.', () => {

    UserObserver.subscribe();
    expect(subscribeCalled).toBe(true);
    UserObserver.set({name: 'test'});
    onNextCalled = false;
    UserObserver.set({name: 'test'});
    expect(onNextCalled).toBe(false);

  });

});
