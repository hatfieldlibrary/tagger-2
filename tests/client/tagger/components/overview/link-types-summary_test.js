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

describe('The link types summary panel', () => {

  let $componentController;

  let CollectionLinkCount,
    AreaObservable,
    areaId,
    collectionTotal,
    collections,
    deferred,
    $rootScope;


  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('CollectionLinkCount,', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
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

  beforeEach(inject((_CollectionLinkCount_,
                     _AreaObservable_,
                     _$q_,
                     _$rootScope_) => {

    CollectionLinkCount = _CollectionLinkCount_;
    AreaObservable = _AreaObservable_;
    deferred = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    areaId = 1;

    collectionTotal = 2;

    // only interested access (restricted/unrestricted) and
    // publication status.
    collections = [
      {
        count: 3,
        browseType: 'link'
      },
      {
        count: 1,
        browseType: 'opts'
      }
    ];


  });

  beforeEach(() => {

    let fakeOneCallback = () => {
    };

    spyOn(CollectionLinkCount, 'query').and.callFake(() => {
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

    let ctrl = $componentController('linkTypeSummary', null);

    ctrl.$onInit();

    expect(AreaObservable.subscribe).toHaveBeenCalled();
    expect(AreaObservable.get).toHaveBeenCalled();

    deferred.resolve(collections);
    $rootScope.$apply();

    expect(CollectionLinkCount.query).toHaveBeenCalled();

     expect(ctrl.actualCount).toEqual(4);
     expect(ctrl.linkCount).toEqual(3);
     expect(ctrl.selectCount).toEqual(1);



  });

  it('should update the component on area change.', () => {

    let ctrl = $componentController('linkTypeSummary', null);

    ctrl.$onInit();

    AreaObservable.set(2);
    expect(CollectionLinkCount.query).toHaveBeenCalledWith({areaId: 2});

  });

});

