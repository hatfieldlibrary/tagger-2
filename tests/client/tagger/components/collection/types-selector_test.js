/**
 * Created by mspalti on 1/24/17.
 */

'use strict';

/*jshint expr: true*/

describe('The type selector component', () => {

  let $componentController;

  let ContentTypeList,
    CollectionObservable,
    CollectionTypeTargetRemove,
    CollectionTypeTargetAdd,
    TypesForCollection,
    $rootScope,
    deferred,
    TaggerToast,
    contentTypeList,
    typesForCollectionAdd,
    typesForCollectionRemove,
    typesForCollection,
    testCollectionId,
    typesAdded,
    typesRemoved,
    addChip,
    removeChip,
    success;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('ContentTypeList', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionTypeTargetRemove', {
        delete: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionTypeTargetAdd', {
        save: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('TypesForCollection', {
        query: () => {
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

  });

  beforeEach(inject((_$componentController_) => {

    $componentController = _$componentController_;

  }));

  beforeEach((inject((_ContentTypeList_,
                      _CollectionObservable_,
                      _CollectionTypeTargetRemove_,
                      _CollectionTypeTargetAdd_,
                      _TypesForCollection_,
                      _$rootScope_,
                      _$q_,
                      _TaggerToast_) => {

    ContentTypeList = _ContentTypeList_;
    CollectionObservable = _CollectionObservable_;
    CollectionTypeTargetRemove = _CollectionTypeTargetRemove_;
    CollectionTypeTargetAdd = _CollectionTypeTargetAdd_;
    TypesForCollection = _TypesForCollection_;
    deferred = _$q_.defer();
    TaggerToast = _TaggerToast_;
    $rootScope = _$rootScope_;

  })));

  beforeEach(() => {

    contentTypeList = [
      {
        id: 1,
        name: 'type one'
      },
      {
        id: 2,
        name: 'type two'
      }
    ];

    typesForCollectionAdd = [
      {
          id: 1,
          name: 'type one'

      },
      {
        id: 2,
          name: 'type two'
        }
    ];

    typesForCollectionRemove = [
      {
        CollectionId: 1,
        ItemContentId: 2,
        ItemContent: {
          id: 2,
          name: 'type two'
        }
      }
    ];

    typesForCollection = typesForCollectionAdd;

    typesAdded = [{
      id: 1,
      name: 'type one'
    },
      {
        id: 2,
        name: 'type two'
      }];

    typesRemoved = [
      {
        id: 2,
        name: 'type two'
      }
    ];

    testCollectionId = 1;

    success = 'success';

    addChip = {
      id: 2,
      name: 'tag two name'
    };

    removeChip = {
      id: 1,
      name: 'tag one name'
    };


  });

  beforeEach(() => {

    let fakeCollectionObservableCallback = () => {
    };

    spyOn(ContentTypeList, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(contentTypeList);
          }
        }
      }
    });

    spyOn(TypesForCollection, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(typesForCollection);
          }
        }
      }
    });

    spyOn(CollectionTypeTargetAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(CollectionTypeTargetRemove, 'delete').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(CollectionObservable, 'set').and.callFake(() => {
      fakeCollectionObservableCallback(testCollectionId);
    });

    spyOn(CollectionObservable, 'get').and.callFake(() => {
      return testCollectionId;
    });

    spyOn(CollectionObservable, 'subscribe').and.callFake((callback) => {
      fakeCollectionObservableCallback = callback;
    });

    spyOn(TaggerToast, 'toast');

  });

  it('should initialize.', () => {

    let ctrl = $componentController('contentTypeSelector', null);

    ctrl.$onInit();

    expect(ContentTypeList.query).toHaveBeenCalled();
    expect(ctrl.globalTypes).toEqual(contentTypeList);
    expect(TypesForCollection.query).toHaveBeenCalledWith({collId: 1});
    expect(ctrl.typesForCollection).toEqual(typesAdded);

  });

  it('should add a type.', () => {

    let ctrl = $componentController('contentTypeSelector', null);

    ctrl.$onInit();

    ctrl.addType(addChip);
    deferred.resolve({status: 'success'});
    $rootScope.$apply();

    expect(CollectionTypeTargetAdd.save).toHaveBeenCalledWith({collId: 1, typeId: 2})

  });

  it('should remove type.', () => {

    let ctrl = $componentController('contentTypeSelector', null);

    ctrl.$onInit();

    ctrl.removeType(removeChip);
    deferred.resolve({status: 'success'});
    $rootScope.$apply();

    expect(CollectionTypeTargetRemove.delete).toHaveBeenCalledWith({collId: 1, typeId: 1})

  });

  it('should toast on failing to add type.', () => {


    let ctrl = $componentController('contentTypeSelector', null);

    ctrl.$onInit();

    ctrl.addType(addChip);
    deferred.resolve({status: 'failure'});
    $rootScope.$apply();

    expect(TaggerToast.toast).toHaveBeenCalledWith('WARNING: Unable to add content type!');

  });

  it('should toast on failing to remove type.', () => {


    let ctrl = $componentController('contentTypeSelector', null);

    ctrl.$onInit();

    ctrl.removeType(removeChip);
    deferred.resolve({status: 'failure'});
    $rootScope.$apply();

    expect(TaggerToast.toast).toHaveBeenCalledWith('WARNING: Unable to remove content type!');

  });

  it('should update types on collection change.', () => {


    let ctrl = $componentController('contentTypeSelector', null);

    ctrl.$onInit();

    CollectionObservable.set(testCollectionId);

    expect(TypesForCollection.query).toHaveBeenCalledWith({collId: 1});

  });


  it('should filter the global query types.', () => {

    let ctrl = $componentController('contentTypeSelector', null);
    ctrl.$onInit();

    let t = ctrl.queryTypes('type two');
    expect(t).toEqual(typesRemoved);

  });

  it('should set empty collection types list.', () => {

    typesForCollection = [];

    let ctrl = $componentController('contentTypeSelector', null);
    ctrl.$onInit();

    expect(ctrl.typesForCollection).toEqual([]);

  });


});
