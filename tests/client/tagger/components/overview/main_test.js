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

describe('The main overview component', () => {

  let $componentController;

  let AreaObservable,
    AreaById,
    CollectionsByArea,
    CategoryCountByArea,
    ContentTypeCount,
    TagCountForArea,
    deferredArea,
    deferredCatCount,
    deferredContentCount,
    deferredCollections,
    deferredTags,
    areaId,
    processedCatCounts,
    categoryCount,
    collections,
    types,
    tags,
    area,
    $rootScope;

  beforeEach(module('tagger'));

  beforeEach(() => {

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

    module(($provide) => {
      $provide.value('AreaById', {
        query: (x) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CategoryCountByArea', {
        query: (x) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('ContentTypeCount', {
        query: (x) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionsByArea', {
        query: (x) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('TagCountForArea', {
        query: (x) => {
        }
      });
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_AreaObservable_,
                     _AreaById_,
                     _CategoryCountByArea_,
                     _ContentTypeCount_,
                     _CollectionsByArea_,
                     _TagCountForArea_,
                     _$q_,
                     _$rootScope_) => {

    AreaObservable = _AreaObservable_;
    AreaById = _AreaById_;
    CategoryCountByArea = _CategoryCountByArea_;
    ContentTypeCount = _ContentTypeCount_;
    CollectionsByArea = _CollectionsByArea_;
    TagCountForArea = _TagCountForArea_;

    deferredArea = _$q_.defer();
    deferredCatCount = _$q_.defer();
    deferredContentCount = _$q_.defer();
    deferredCollections = _$q_.defer();
    deferredTags = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    areaId = 1;

    categoryCount = [
      {
        title: 'collection one',
        count: 2
      },
      {
        title: 'collection two',
        count: 3
      }
    ];

    processedCatCounts = [
      { title: 'collection one', value: 2 },
      { title: 'collection two', value: 3 }
    ];

    // only need the array length
    collections = [
      {}, {}, {}
    ];

    types = [
      {
        name: 'type one',
        count: 2
      },
      {
        name: 'type two',
        count: 3
      }
    ];

    area = {
      title: 'test area',
      id: 1
    };

    tags = [
      {
        name: 'tag one',
        count: 2
      },
      {
        name: 'tag two',
        count: 4
      }
    ]


  });

  beforeEach(() => {

    let fakeCallback = () => {
    };

    spyOn(AreaObservable, 'set').and.callFake((x) => {
      fakeCallback(x);
    });
    spyOn(AreaObservable, 'get').and.callFake((x) => {
      return areaId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeCallback = o;
    });

    spyOn(AreaById, 'query').and.callFake(() => {
      return {
        $promise: deferredArea.promise
      }
    });
    spyOn(CategoryCountByArea, 'query').and.callFake(() => {
      return {
        $promise: deferredCatCount.promise
      }
    });
    spyOn(ContentTypeCount, 'query').and.callFake(() => {
      return {
        $promise: deferredContentCount.promise
      }
    });
    spyOn(CollectionsByArea, 'query').and.callFake(() => {
      return {
        $promise: deferredCollections.promise
      }
    });
    spyOn(TagCountForArea, 'query').and.callFake(() => {
      return {
        $promise: deferredTags.promise
      }
    });

  });

  it('should initialize the component', () => {

    let ctrl = $componentController('overviewComponent', null);

    ctrl.$onInit();

    expect(AreaObservable.subscribe).toHaveBeenCalled();

    ctrl.$postLink();

    deferredTags.resolve(tags);
    deferredCollections.resolve(collections);
    deferredCatCount.resolve(categoryCount);
    deferredArea.resolve(area);
    deferredContentCount.resolve(types);
    $rootScope.$apply();

    expect(AreaById.query).toHaveBeenCalled();
    expect(CategoryCountByArea.query).toHaveBeenCalled();
    expect(ContentTypeCount.query).toHaveBeenCalled();
    expect(CollectionsByArea.query).toHaveBeenCalled();
    expect(TagCountForArea.query).toHaveBeenCalled();

    expect(ctrl.subjects).toEqual(tags);
    expect(ctrl.subjectsReady).toBe(true);

    expect(ctrl.typeCounts.total).toEqual(5);
    expect(ctrl.typesReady).toBe(true);

    expect(ctrl.categoryCounts.total).toEqual(5);
    expect(ctrl.categoriesReady).toBe(true);

    expect(ctrl.collectionCount).toEqual(3);

    expect(ctrl.areaLabel).toEqual(area.title);
    expect(ctrl.areaId).toEqual(area.id);


  });

  it('should update with area change.', () => {

    let ctrl = $componentController('overviewComponent', null);

    ctrl.$onInit();
    ctrl.$postLink();

    AreaObservable.set(2);
    expect(AreaById.query).toHaveBeenCalledWith({id: 2});
    expect(CategoryCountByArea.query).toHaveBeenCalledWith({areaId: 2});
    expect(ContentTypeCount.query).toHaveBeenCalledWith({areaId: 2});
    expect(CollectionsByArea.query).toHaveBeenCalledWith({areaId: 2});
    expect(TagCountForArea.query).toHaveBeenCalledWith({areaId: 2});

  });

  it('should return the category count', () => {

    let ctrl = $componentController('overviewComponent', null);

    ctrl.$postLink();
    deferredCatCount.resolve(categoryCount);
    $rootScope.$apply();

    let cats = ctrl.getCategoryCounts();
    expect(cats.data).toEqual(processedCatCounts)


  });


});
