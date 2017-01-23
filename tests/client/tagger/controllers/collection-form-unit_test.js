/**
 * Created by mspalti on 1/20/17.
 */

'use strict';

describe('The collection form component', () => {

  let $componentController;

  let AreaObservable,
    CollectionObservable,
    ThumbImageObservable,
    CollectionAreasObservable,
    CategoryForCollection,
    CollectionById,
    CategoryByArea,
    CollectionUpdate,
    AreaById,
    TaggerToast,
    testAreaId,
    testCollectionId,
    testImage,
    testArea,
    updatedImage,
    testCollections,
    testCategoryList;

  beforeEach(module('tagger'));

  // create mock objects
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
      $provide.value('CollectionObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });
    module(($provide) => {
      $provide.value('ThumbImageObservable', {
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
      $provide.value('CollectionById', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CategoryByArea', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaById', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionUpdate', {
        save: () => {
        }
      });
    });

  });


  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;

  }));


  beforeEach(inject((_AreaObservable_,
                     _CollectionObservable_,
                     _ThumbImageObservable_,
                     _CollectionAreasObservable_,
                     _CollectionById_,
                     _CategoryForCollection_,
                     _CategoryByArea_,
                     _AreaById_,
                     _CollectionUpdate_) => {

    AreaObservable = _AreaObservable_;
    CollectionObservable = _CollectionObservable_;
    ThumbImageObservable = _ThumbImageObservable_;
    CollectionAreasObservable = _CollectionAreasObservable_;
    CollectionById = _CollectionById_;
    CategoryForCollection = _CategoryForCollection_;
    CategoryByArea = _CategoryByArea_;
    AreaById = _AreaById_;
    CollectionUpdate = _CollectionUpdate_;

  }));


  beforeEach(() => {
    testAreaId = 1;
    testCollectionId = 1;
    testImage = 'image';
    updatedImage = 'no-image.png';
    testArea = {
      id: 1,
      title: 'test area',
      linkLabel: 'test label',
      position: 1,
      searchUrl: '',
      description: ''
    };
    /* */
    testCategoryList = [{
      Category: {
        areaId: '1', // this is a string in data model - blah
        id: 2,
        description: 'description',
        linkLabel: 'label',
        secondaryUrl: 'secondary',
        title: 'category title',
        url: 'http://somewhere'
      },
      CategoryId: 2,
      CollectionId: 1,
      id: 1
    }];
    testCollections = {
      init: {
        id: 1,
        category: 2,
        image: testImage,
        browseType: 'link',
        ctype: 'dig',
        dates: '2001',
        items: [],
        title: 'test collection',
        url: 'http://somewhere.com',
        areas: [1],
        description: 'description'
      },
      update: {
        id: 2,
        category: 4,
        image: updatedImage,
        browseType: 'link',
        ctype: 'dig',
        dates: '2001',
        items: [],
        title: 'test collection',
        url: 'http://somewhere.com',
        areas: [1],
        description: 'description'
      }

    };

  });

  // configure spies
  beforeEach(() => {

    let fakeAreaCallback = (value) => {
      testAreaId = value;
    };
    let fakeCollectionCallback = (value) => {
      testCollectionId = value;
    };
    let fakeImageCallback = (value) => {
      testImage = value;
    };
    let fakeCollectionAreasCallback = (value) => {

    };

    spyOn(AreaObservable, 'set').and.callFake((value) => {
      fakeAreaCallback(value);
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return testAreaId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o;
    });

    spyOn(CollectionObservable, 'set').and.callFake((value) => {
      fakeCollectionCallback(value);
    });
    spyOn(CollectionObservable, 'get').and.callFake(() => {
      return testCollections.init.id;
    });
    spyOn(CollectionObservable, 'subscribe').and.callFake((o) => {
      //fakeCollectionCallback = o;
    });

    spyOn(ThumbImageObservable, 'set').and.callFake((value) => {
      fakeImageCallback(value);
    });
    spyOn(ThumbImageObservable, 'get').and.callFake(() => {
      return testImage;
    });
    spyOn(ThumbImageObservable, 'subscribe').and.callFake((o) => {
      fakeImageCallback = o;
    });

    spyOn(CollectionAreasObservable, 'set').and.callFake((value) => {
      fakeCollectionAreasCallback(value);
    });
    spyOn(CollectionAreasObservable, 'get').and.callFake(() => {
      return '';
    });
    spyOn(CollectionAreasObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionAreasCallback = o;
    });

    spyOn(CategoryByArea, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testCategoryList);
          }
        }
      }
    });

    spyOn(CategoryForCollection, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testCategoryList);
          }
        }
      }
    });

    spyOn(CollectionById, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            if (testCollectionId === 1) {
              return callback(testCollections.init);
            } else if (testCollectionId == 2) {
              return callback(testCollections.update);
            }
          }
        }
      }
    });

    spyOn(AreaById, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testArea);
          }
        }
      }
    });


    spyOn(CollectionUpdate, 'save').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback({status: 'success'});
          }
        }
      }
    });

  });

  it('should initialize the form on load', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    expect(CollectionObservable.get).toHaveBeenCalled();
    expect(ThumbImageObservable.subscribe).toHaveBeenCalled();
    expect(CollectionAreasObservable.subscribe).toHaveBeenCalled();
    expect(AreaObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.collectionId).toEqual(testCollections.init.id);
    expect(menuSpy).toHaveBeenCalledWith({id: ctrl.collection.id, title: ctrl.collection.title});

  });

  it('should fetch collection object on load', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    expect(ctrl.collection).toEqual(testCollections.init);
    expect(ctrl.collectionId).toEqual(1);
    expect(ctrl.category).toEqual(2);
    expect(ctrl.thumbnailImage).toEqual(testImage);

  });

  it('should update the thumbnail image as mock', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    ThumbImageObservable.set(testImage);
    expect(ctrl.thumbnailImage).toEqual(testImage);

  });

  it('should update the thumbnail image as observer', (done) => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ThumbImageObservable.set.and.stub();
    ThumbImageObservable.set.and.callThrough();
    ThumbImageObservable.subscribe.and.stub();
    ThumbImageObservable.subscribe.and.callThrough();

    ctrl.$onInit();

    ThumbImageObservable.set(testImage);
    done(() => {
      // get after promise returns.
      expect(ctrl.thumbnailImage).toEqual(testImage);
    })

  });

  it('should fetch new collection on observer update', (done) => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);


    ctrl.$onInit();

    CollectionObservable.set.and.stub();
    CollectionObservable.set.and.callThrough();
    CollectionObservable.set(2);

    done(() => {
      expect(ctrl.collectionId).toEqual(2);
      expect(ctrl.collection).toEqual(testCollections.update);
      expect(ctrl.collectionId).toEqual(2);
      expect(ctrl.category).toEqual(4);
      expect(ctrl.thumbnailImage).toEqual(updatedImage);
    });


  });

  it('should get categories for collection.', () => {


    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    expect(CategoryForCollection.query).toHaveBeenCalled();
    expect(CategoryByArea.query).toHaveBeenCalled();
    expect(ctrl.categoryList).toEqual(testCategoryList)

  });

  it('should retrieve area membership information for the collection', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    ctrl.areaTitle = testArea.title;
    ctrl.areaId = testArea.id

  });

  it('should override the hidden category setting', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.overrideCategory();

    expect(ctrl.showCollectionCategories).toBe(true);

  });

  it('should update the collection', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.updateCollection();
    expect(CollectionUpdate.save).toHaveBeenCalled();

  });

  it('should set the placehoder message', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.setBrowseType(0);
    expect(ctrl.browsePlaceholder).toEqual('Add the collection URL, e.g.: http://host.domain.edu/wombats?type=hungry');
    ctrl.setBrowseType(1);
    expect(ctrl.browsePlaceholder).toEqual('Add the collection name for select option, e.g. wallulah');

  });

});
