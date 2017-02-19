/**
 * Created by mspalti on 1/20/17.
 */

'use strict';

/*jshint expr: true*/

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
    testAreas,
    updatedImage,
    testCollections,
    testCollection,
    testCategoryList,
    testCategoryAreaMismatch,
    deferredCollectionQuery,
    deferredCategory,
    deferredStatus,
    placeholder,
    $rootScope;

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
                     _TaggerToast_,
                     _CollectionUpdate_,
                     _$q_,
                     _$rootScope_) => {

    AreaObservable = _AreaObservable_;
    CollectionObservable = _CollectionObservable_;
    ThumbImageObservable = _ThumbImageObservable_;
    CollectionAreasObservable = _CollectionAreasObservable_;
    CollectionById = _CollectionById_;
    CategoryForCollection = _CategoryForCollection_;
    CategoryByArea = _CategoryByArea_;
    AreaById = _AreaById_;
    CollectionUpdate = _CollectionUpdate_;
    TaggerToast = _TaggerToast_;
    deferredCollectionQuery = _$q_.defer();
    deferredCategory = _$q_.defer();
    deferredStatus = _$q_.defer();
    $rootScope = _$rootScope_;

  }));


  beforeEach(() => {

    testAreaId = 1;
    testCollectionId = 1;
    testImage = 'image';
    updatedImage = 'no-image.png';
    testAreas = [{
      id: 1,
      title: 'test area',
      linkLabel: 'test label',
      position: 1,
      searchUrl: '',
      description: ''
    }, {
      id: 2,
      title: 'test area tow',
      linkLabel: 'test label two',
      position: 1,
      searchUrl: '',
      description: ''
    }];

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

    testCategoryAreaMismatch = [
      { // use this for testing area/category mismatch
        Category: {
          areaId: '10', // this is a string in data model - blah
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
        browseType: 'opt',
        ctype: 'dig',
        dates: '2001',
        items: [],
        title: 'test collection',
        url: 'http://somewhere.com',
        areas: [1],
        description: 'description'
      }

    };
    testCollection = testCollections.init;

    placeholder = ['Add the collection URL, e.g.: http://host.domain.edu/wombats?type=hungry', 'Add the collection name for select option, e.g. wallulah'];


  });

  // configure spies
  beforeEach(() => {

    let fakeAreaCallback = () => {
    };
    let fakeCollectionCallback = () => {
    };
    let fakeImageCallback = (value) => {
      testImage = value;
    };
    let fakeCollectionAreasCallback = (value) => {
    };
    // area id observable.
    spyOn(AreaObservable, 'set').and.callFake(() => {
      fakeAreaCallback(testAreaId);
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return testAreaId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o;
    });
    // collection id observable.
    spyOn(CollectionObservable, 'set').and.callFake(() => {
      fakeCollectionCallback(testCollectionId);
    });
    spyOn(CollectionObservable, 'get').and.callFake(() => {
      return testCollectionId;
    });
    spyOn(CollectionObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionCallback = o;
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

    spyOn(CollectionAreasObservable, 'set').and.callFake(() => {
      fakeCollectionAreasCallback();
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
        $promise: deferredCategory.promise
      }
    });

    spyOn(CollectionById, 'query').and.callFake(() => {
      return {
        $promise: deferredCollectionQuery.promise
      }
    });

    spyOn(AreaById, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            if (testAreaId === 1) {
              return callback(testAreas[0]);
            } else if (testAreaId == 2) {
              return callback(testAreas[1]);
            } else {

            }
          }
        }
      }
    });


    spyOn(CollectionUpdate, 'save').and.callFake(() => {
      return {
        $promise: deferredStatus.promise
      }
    });

    spyOn(TaggerToast,'toast');

  });

  it('should initialize the form on init', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    CollectionObservable.set(1);

    ctrl.$onInit();

    deferredCollectionQuery.resolve(testCollections.init);
    $rootScope.$apply();

    expect(CollectionObservable.get).toHaveBeenCalled();
    expect(ThumbImageObservable.subscribe).toHaveBeenCalled();
    expect(CollectionAreasObservable.subscribe).toHaveBeenCalled();
    expect(AreaObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.collectionId).toEqual(testCollections.init.id);
    expect(menuSpy).toHaveBeenCalledWith({id: ctrl.collection.id, title: ctrl.collection.title});

  });

  it('should initialize empty collection on init if collection id is not valid.', () => {

    let ctrl = $componentController('collectionForm', null);
    CollectionObservable.set(0);
    testCollectionId = 0;
    ctrl.$onInit();
    expect(ctrl.collection).toEqual({});

  });

  it('should initialize empty collection if collection query does not return data', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.$onInit();

    deferredCollectionQuery.resolve();
    $rootScope.$apply();
    expect(ctrl.collection).toEqual({});

  });

  it('should fetch collection object on load', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    CollectionObservable.set(1);

    ctrl.$onInit();

    deferredCollectionQuery.resolve(testCollections.init);
    $rootScope.$apply();

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

  it('should fetch new collection on observer update', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);


    ctrl.$onInit();

    deferredCollectionQuery.resolve(testCollections.update);
    $rootScope.$apply();

    testCollectionId = 2;

    CollectionObservable.set(2);

    expect(ctrl.collectionId).toEqual(2);
    expect(ctrl.collection).toEqual(testCollections.update);
    expect(ctrl.collectionId).toEqual(2);
    expect(ctrl.category).toEqual(4);
    expect(ctrl.thumbnailImage).toEqual(updatedImage);
    expect(ctrl.browsePlaceholder).toEqual(placeholder[1])

  });

  it('should get categories for collection.', () => {


    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    deferredCollectionQuery.resolve(testCollections.init);
    deferredCategory.resolve(testCategoryList);
    $rootScope.$apply();

    expect(CategoryForCollection.query).toHaveBeenCalled();
    expect(CategoryByArea.query).toHaveBeenCalled();
    expect(ctrl.categoryList).toEqual(testCategoryList)

  });

  it('should set the category option to false', () => {
    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    deferredCollectionQuery.resolve(testCollections.init);
    deferredCategory.resolve(testCategoryAreaMismatch);
    $rootScope.$apply();

    expect(ctrl.showCollectionCategories).toBe(false);

  });

  it('should retrieve area membership information for the collection', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    ctrl.areaTitle = testAreas[0].title;
    ctrl.areaId = testAreas[0].id;

  });

  it('should override the hidden category setting', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.overrideCategory();

    expect(ctrl.showCollectionCategories).toBe(true);
    expect(AreaObservable.get).toHaveBeenCalled();
    expect(CategoryByArea.query).toHaveBeenCalled();

  });

  it('should update the collection', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.updateCollection();
    expect(CollectionUpdate.save).toHaveBeenCalled();
    deferredStatus.resolve({status: 'success'});
    $rootScope.$apply();
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Updated')

  });

  it('should fail to update the collection and warn via toast.', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.updateCollection();
    expect(CollectionUpdate.save).toHaveBeenCalled();
    deferredStatus.reject();
    $rootScope.$apply();
    expect(TaggerToast.toast).toHaveBeenCalledWith('ERROR: Unable to update collection.')

  });



  it('should update area info and category on area change.', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    testAreaId = 2;
    AreaObservable.set(2);

    expect(ctrl.areaTitle).toEqual(testAreas[1].title);

  });

  it('should set the placeholder message', () => {

    let ctrl = $componentController('collectionForm', null);

    ctrl.setBrowseType(0);
    expect(ctrl.browsePlaceholder).toEqual(placeholder[0]);
    ctrl.setBrowseType(1);
    expect(ctrl.browsePlaceholder).toEqual(placeholder[1]);

  });

  it('should update collection on area membership update', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();
    CollectionAreasObservable.set();

    expect(CollectionById.query).toHaveBeenCalled();

  });

  it('should retrieve categories on offer options if the collection has no category assigned.', () => {

    let menuSpy = jasmine.createSpy('menuSpy');
    let bindings = {menu: menuSpy};
    let ctrl = $componentController('collectionForm', null, bindings);

    ctrl.$onInit();

    deferredCollectionQuery.resolve(testCollections.init);
    deferredCategory.resolve([]);
    $rootScope.$apply();

    expect(ctrl.showCollectionCategories).toBe(true);
    expect(CategoryByArea.query).toHaveBeenCalled();

  });

});
