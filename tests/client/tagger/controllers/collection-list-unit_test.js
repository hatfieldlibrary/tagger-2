/**
 * Created by mspalti on 1/19/17.
 */
'use strict';

describe('Collection list component', () => {

  let $componentController;

  let AreaObserver,
    CollectionObserver,
    CollectionListObserver,
    CollectionAreasObserver,
    CollectionsByArea,
    testAreaId,
    testAreaCollections,
    testEmptyCollectionList,
    collectionIdInView,
    setAreasObserver;


  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('CollectionsByArea', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionListObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionAreasObserver', {
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
    // used to create instances of component controllers
    $componentController = _$componentController_;

  }));

  beforeEach(inject((_AreaObserver_,
                     _CollectionObserver_,
                     _CollectionListObserver_,
                     _CollectionAreasObserver_,
                     _CollectionsByArea_) => {

    AreaObserver = _AreaObserver_;
    CollectionObserver = _CollectionObserver_;
    CollectionListObserver = _CollectionListObserver_;
    CollectionAreasObserver = _CollectionAreasObserver_;
    CollectionsByArea = _CollectionsByArea_;

  }));

  beforeEach(() => {

    /**
     * Define default values so the set() method
     * can be called without subscribing. Components
     * often call the set() function without first subscribing
     * to the observable Subject.
     */
    let fakeCollectionObserver = (value) => {
      collectionIdInView = value;
    };
    let fakeCollectionListObserver = () => {
    };
    let fakeCollectionAreasObserver = (value) => {
    };
    let fakeAreaObserver = (value) => {
      testAreaId = value;
    };

    spyOn(CollectionObserver, 'set').and.callFake((value) => {
      fakeCollectionObserver(value);
    });
    spyOn(CollectionObserver, 'get').and.callFake(() => {
      return collectionIdInView;
    });
    spyOn(CollectionObserver, 'subscribe').and.callFake((o) => {
      fakeCollectionObserver = o;
    });

    spyOn(CollectionListObserver, 'set').and.callFake((value) => {
      fakeCollectionListObserver(value);
    });
    spyOn(CollectionListObserver, 'get').and.callFake(() => {
      return testAreaCollections;
    });
    spyOn(CollectionListObserver, 'subscribe').and.callFake((o) => {
      fakeCollectionListObserver = o;
    });

    setAreasObserver = spyOn(CollectionAreasObserver, 'set').and.callFake((value) => {
      fakeCollectionAreasObserver(value);
    });
    spyOn(CollectionAreasObserver, 'get').and.callFake(() => {
      return '';
    });
    spyOn(CollectionAreasObserver, 'subscribe').and.callFake((o) => {
      fakeCollectionAreasObserver = o;
    });

    spyOn(AreaObserver, 'set').and.callFake((value) => {
      fakeAreaObserver(value);
    });
    spyOn(AreaObserver, 'get').and.callFake(() => {
      return testAreaId;
    });
    spyOn(AreaObserver, 'subscribe').and.callFake((o) => {
      fakeAreaObserver = o;
    });

    spyOn(CollectionsByArea, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testAreaCollections);
          }
        }
      }
    });

  });


  beforeEach(() => {
    testAreaId = 1;
    testAreaCollections = [{Collection: {id: 1}}, {Collection: {id: 2}}];
    testEmptyCollectionList = [];
    collectionIdInView = testAreaCollections[0].Collection.id;
  });


  it('should initialize the collection id and observers $onInit', () => {

    let ctrl = $componentController('collectionList', null);

    // initialize the area
    AreaObserver.set(testAreaId);

    ctrl.$onInit();

    expect(CollectionObserver.subscribe).toHaveBeenCalled();
    expect(CollectionListObserver.subscribe).toHaveBeenCalled();
    expect(CollectionAreasObserver.subscribe).toHaveBeenCalled();
    expect(AreaObserver.subscribe).toHaveBeenCalled();
    expect(AreaObserver.get).toHaveBeenCalled();

    expect(CollectionsByArea.query).toHaveBeenCalledWith({areaId: testAreaId});
    expect(CollectionObserver.set).toHaveBeenCalledWith(testAreaCollections[0].Collection.id);
    expect(CollectionListObserver.set).toHaveBeenCalledWith(testAreaCollections);
    expect(ctrl.collectionId).toEqual(testAreaCollections[0].Collection.id);

  });

  it('should throw error for undefined area.', () => {

    let ctrl = $componentController('collectionList', null);

    AreaObserver.set(undefined);

    expect(ctrl.$onInit).toThrowError(Error, 'Area is unavailable.');

  });

  it('should set the id for the selected collection in the observable.', () => {

    let ctrl = $componentController('collectionList', null);

    ctrl.setCollectionById(2);

    expect(CollectionObserver.set).toHaveBeenCalledWith(2);

  });

  it('should get new collections for new area.', () => {

    let ctrl = $componentController('collectionList', null);

    ctrl.$onInit();
    AreaObserver.set(3);

    expect(CollectionsByArea.query).toHaveBeenCalled();

  });

  it('should get new collections after update to collection area.', () => {

    let ctrl = $componentController('collectionList', null);

    ctrl.$onInit();
    CollectionAreasObserver.set(3);
    expect(CollectionsByArea.query).toHaveBeenCalled();

  });


});

