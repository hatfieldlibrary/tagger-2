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
 * Created by mspalti on 1/19/17.
 */
'use strict';

/*jshint expr: true*/

describe('The primary collection component and collection list component', () => {

  let $componentController;

  let AreaObservable,
    DialogStrategy,
    CollectionObservable,
    CollectionListObservable,
    CollectionAreasObservable,
    PublicationStatusObservable,
    CollectionsByArea,
    UserAreaObservable,
    testAreaId,
    testPubStatus,
    testAreaCollections,
    testEmptyCollectionList,
    collectionIdInView,
    setAreasObserver,
    $rootScope,
    deferredCollectionsList;


  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('CollectionsByArea', {
        query: () => {
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

    module(($provide) => {
      $provide.value('GroupListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionAreasObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('PublicationStatusObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('UserAreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('DialogStrategy', {
        makeDialog: (vm) => {
        },
        showDialog: (event, message) => {
        }
      });
    });

  });


  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;

  }));

  beforeEach(inject((_AreaObservable_,
                     _CollectionObservable_,
                     _CollectionListObservable_,
                     _CollectionAreasObservable_,
                     _PublicationStatusObservable_,
                     _DialogStrategy_,
                     _UserAreaObservable_,
                     _CollectionsByArea_,
                     _$q_,
                     _$rootScope_) => {

    AreaObservable = _AreaObservable_;
    CollectionObservable = _CollectionObservable_;
    CollectionListObservable = _CollectionListObservable_;
    CollectionAreasObservable = _CollectionAreasObservable_;
    DialogStrategy = _DialogStrategy_;
    CollectionsByArea = _CollectionsByArea_;
    PublicationStatusObservable = _PublicationStatusObservable_;
    UserAreaObservable = _UserAreaObservable_;
    $rootScope = _$rootScope_;
    deferredCollectionsList = _$q_.defer();

  }));

  beforeEach(() => {

    /**
     * Define default values so the set() method
     * can be called without subscribing. Components
     * often call the set() function without subscribing
     * to the observable Subject.
     */
    let fakeCollectionCallback = (value) => {
      collectionIdInView = value;
    };
    let fakeCollectionListCallback = () => {
    };
    let fakeCollectionAreasCallback = (value) => {
    };
    let fakeAreaCallback = (value) => {
      testAreaId = value;
    };
    let fakePubCallback = (value) => {
      testPubStatus = value;
    };
    let fakeUserAreaCallback = (value) => {
    };

    spyOn(CollectionObservable, 'set').and.callFake((value) => {
      fakeCollectionCallback(value);
    });
    spyOn(CollectionObservable, 'get').and.callFake(() => {
      return collectionIdInView;
    });
    spyOn(CollectionObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionCallback = o;
    });

    spyOn(CollectionListObservable, 'set').and.callFake((value) => {
      fakeCollectionListCallback(value);
    });
    spyOn(CollectionListObservable, 'get').and.callFake(() => {
      return testAreaCollections;
    });
    spyOn(CollectionListObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionListCallback = o;
    });

    setAreasObserver = spyOn(CollectionAreasObservable, 'set').and.callFake((value) => {
      fakeCollectionAreasCallback(value);
    });
    spyOn(CollectionAreasObservable, 'get').and.callFake(() => {
      return '';
    });
    spyOn(CollectionAreasObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionAreasCallback = o;
    });

    spyOn(AreaObservable, 'set').and.callFake((value) => {
      fakeAreaCallback(value);
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return testAreaId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o;
    });

    spyOn(PublicationStatusObservable, 'set').and.callFake((value) => {
      fakePubCallback(value);
    });
    spyOn(PublicationStatusObservable, 'get').and.callFake(() => {
      return testPubStatus;
    });
    spyOn(PublicationStatusObservable, 'subscribe').and.callFake((o) => {
      fakePubCallback = o;
    });

    spyOn(UserAreaObservable, 'set').and.callFake((value) => {
      fakeUserAreaCallback(value);
    });
    spyOn(UserAreaObservable, 'get').and.callFake(() => {
      return 1;
    });
    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaCallback = o;
    });

    spyOn(CollectionsByArea, 'query').and.callFake(() => {
      return {
        $promise: deferredCollectionsList.promise
      }
    });

    spyOn(DialogStrategy, 'makeDialog').and.callThrough();

  });


  beforeEach(() => {
    testAreaId = 1;
    testAreaCollections = [{Collection: {id: 1}}, {Collection: {id: 2}}];
    testEmptyCollectionList = [];
    collectionIdInView = testAreaCollections[0].Collection.id;
  });

  describe('The main component', () => {

    it('should initialize the component', () => {

      testPubStatus = false;

      let ctrl = $componentController('collectionComponent', null);

      ctrl.$onInit();
      PublicationStatusObservable.set(false);
      expect(DialogStrategy.makeDialog).toHaveBeenCalled();
      expect(PublicationStatusObservable.subscribe).toHaveBeenCalled();
      expect(PublicationStatusObservable.get).toHaveBeenCalled();
      expect(ctrl.userAreaId).toEqual(1);
      expect(ctrl.isPublished).toBe(false);

    });

    it('should update the view model\'s title and id headers', () => {

      let ctrl = $componentController('collectionComponent', null);

      ctrl.menuUpdate(3, 'good collection');

      expect(ctrl.currentCollection.title).toEqual('good collection');
      expect(ctrl.currentCollection.id).toEqual(3);

    });


  });

  describe('The list component', () => {

    it('should initialize the collection list, current collection id and subscriptions $onInit', () => {

      let ctrl = $componentController('collectionList', null);

      // initialize the area
      AreaObservable.set(testAreaId);

      ctrl.$onInit();

      deferredCollectionsList.resolve(testAreaCollections);
      $rootScope.$apply();

      expect(CollectionObservable.subscribe).toHaveBeenCalled();
      expect(CollectionListObservable.subscribe).toHaveBeenCalled();
      expect(CollectionAreasObservable.subscribe).toHaveBeenCalled();
      expect(AreaObservable.subscribe).toHaveBeenCalled();
      expect(AreaObservable.get).toHaveBeenCalled();
      expect(CollectionsByArea.query).toHaveBeenCalledWith({areaId: testAreaId});
      expect(CollectionObservable.set).toHaveBeenCalledWith(testAreaCollections[0].Collection.id);
      expect(CollectionListObservable.set).toHaveBeenCalledWith(testAreaCollections);
      expect(ctrl.collectionId).toEqual(testAreaCollections[0].Collection.id);
      expect(ctrl.collectionList).toEqual(testAreaCollections);

    });

    it('should set empty collection list on init if area contains no collections.', () => {

      let ctrl = $componentController('collectionList', null);
      ctrl.$onInit();
      deferredCollectionsList.resolve([]);
      $rootScope.$apply();
      expect(ctrl.collectionId).toEqual(0);
      expect(ctrl.collectionList.length).toEqual(0);
    });



    it('should throw error for undefined area.', () => {

      let ctrl = $componentController('collectionList', null);

      AreaObservable.set(undefined);

      expect(ctrl.$onInit).toThrowError(Error, 'Area id is undefined.');

    });

    it('should set the id for the selected collection in the observable.', () => {

      let ctrl = $componentController('collectionList', null);

      ctrl.setCollectionById(2);

      expect(CollectionObservable.set).toHaveBeenCalledWith(2);

    });

    it('should get new collections for new area.', () => {

      let ctrl = $componentController('collectionList', null);

      ctrl.$onInit();
      AreaObservable.set(3);

      expect(CollectionsByArea.query).toHaveBeenCalled();

    });

    it('should get new collections after update to collection area.', () => {

      let ctrl = $componentController('collectionList', null);

      ctrl.$onInit();
      CollectionAreasObservable.set(3);
      expect(CollectionsByArea.query).toHaveBeenCalled();

    });


  });


});

