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
 * Created by mspalti on 1/26/17.
 */
'use strict';

/*jshint expr: true*/

describe('The search options summary panel', () => {

  let $componentController;

  let SearchOptionType,
    AreaObservable,
    areaId,
    searchOptions,
    deferred,
    $rootScope;


  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('SearchOptionType', {
        query: (x) => {
        }
      });
    });


    module(($provide) => {
      $provide.value('AreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });
  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_SearchOptionType_,
                     _AreaObservable_,
                     _$q_,
                     _$rootScope_) => {

    SearchOptionType = _SearchOptionType_;
    AreaObservable = _AreaObservable_;
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    areaId = 1;

    // only interested access (restricted/unrestricted) and
    // publication status.
    searchOptions = [
      {
        count: 3,
        repoType: 'DEFAULT'
      },
      {
        count: 1,
        repoType: 'BROWSE'
      },
      {
        count: 2,
        repoType: 'SEARCH'
      }
    ];


  });

  beforeEach(() => {

    let fakeOneCallback = () => {
    };

    spyOn(SearchOptionType, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(AreaObservable, 'set').and.callFake((x) => {
      fakeOneCallback(x)
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return areaId
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeOneCallback = o
    });

  });

  it('should initialize the component.', () => {

    let ctrl = $componentController('searchOptionsSummary', null);

    ctrl.$onInit();

    expect(AreaObservable.subscribe).toHaveBeenCalled();
    expect(AreaObservable.get).toHaveBeenCalled();

    deferred.resolve(searchOptions);
    $rootScope.$apply();

    expect(SearchOptionType.query).toHaveBeenCalled();

     expect(ctrl.actualCount).toEqual(6);
     expect(ctrl.default).toEqual(3);
     expect(ctrl.search).toEqual(2);
     expect(ctrl.browse).toEqual(1);

  });

  it('should update the component on area change.', () => {

    let ctrl = $componentController('searchOptionsSummary', null);

    ctrl.$onInit();

    AreaObservable.set(2);
    expect(SearchOptionType.query).toHaveBeenCalledWith({areaId: 2});

  });

});

