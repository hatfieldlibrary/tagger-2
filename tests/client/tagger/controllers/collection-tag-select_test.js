/**
 * Created by mspalti on 1/23/17.
 */

'use strict';

describe('Tag selector component', () => {

  let $componentController;

  let CollectionTagTargetAdd,
    CollectionTagTargetRemove,
    TagsForArea,
    TagsForCollection,
    AreaObservable,
    CollectionObservable,
    testAreaId,
    testCollectionId,
    tagsForArea,
    tagsForAreaAdd,
    tagsForAreaRemove,
    tagsForCollectionAdd,
    tagsForCollectionRemove,
    tagsForCollection,
    emptySet,
    tagSuccess,
    addChip,
    removeChip;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('CollectionTagTargetAdd', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('CollectionTagTargetRemove', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('TagsForArea', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('TagsForCollection', {
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

  beforeEach(inject((_CollectionTagTargetAdd_,
                     _CollectionTagTargetRemove_,
                     _TagsForArea_,
                     _TagsForCollection_,
                     _AreaObservable_,
                     _CollectionObservable_) => {

    CollectionTagTargetAdd = _CollectionTagTargetAdd_;
    CollectionTagTargetRemove = _CollectionTagTargetRemove_;
    TagsForArea = _TagsForArea_;
    TagsForCollection = _TagsForCollection_;
    AreaObservable = _AreaObservable_;
    CollectionObservable = _CollectionObservable_;

  }));

  beforeEach(() => {

    tagsForAreaAdd = [
      {
        Tag: {
          id: 1,
          name: 'tag one name',
          url: ''
        }
      },
      {
        Tag: {
          id: 2,
          name: 'tag two name',
          url: ''
        }

      }
    ];

    tagsForAreaRemove = [
      {
        Tag: {
          id: 2,
          name: 'tag two name',
          url: ''
        }

      }
    ];

    tagsForArea = tagsForAreaAdd;

    tagsForCollectionAdd = [
      {
        Tag: {
          id: 1,
          name: 'tag one name',
          url: ''
        }
      },
      {
        Tag: {
          id: 2,
          name: 'tag two name',
          url: ''
        }

      }
    ];

    tagsForCollectionRemove = [
      {
        Tag: {
          id: 2,
          name: 'tag two name',
          url: ''
        }

      }
    ];

    tagsForCollection = tagsForCollectionAdd;

    addChip = {
      Tag: {
        id: 1,
        name: 'tag one name'
      }
    };

    removeChip = {
      id: 1,
      name: 'tag one name'
    };

    tagSuccess = {status: 'success'};

    testAreaId = 1;
    testCollectionId = 1;
    emptySet = [];

  });

  beforeEach(() => {

    let fakeAreaCallback = () => {
    };
    let fakeCollectionCallback = () => {
    };

    // collection id observable.
    spyOn(AreaObservable, 'set').and.callFake(() => {
      fakeCollectionCallback(testAreaId);
    });
    spyOn(AreaObservable, 'get').and.callFake(() => {
      return testAreaId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionCallback = o;
    });

    // area list observable.
    spyOn(CollectionObservable, 'set').and.callFake(() => {
      fakeAreaCallback(testCollectionId);
    });
    spyOn(CollectionObservable, 'get').and.callFake(() => {
      return testCollectionId;
    });
    spyOn(CollectionObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o;
    });


    spyOn(CollectionTagTargetAdd, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(tagsForAreaAdd);
          }
        }
      }
    });

    spyOn(CollectionTagTargetRemove, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(tagsForAreaRemove);
          }
        }
      }
    });

    spyOn(TagsForArea, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(tagsForArea);
          }
        }
      }
    });

    spyOn(TagsForCollection, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(tagsForCollection);
          }
        }
      }
    });

  });

  it('should initialize the component', () => {

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    expect(ctrl.collectionId).toEqual(testCollectionId);
    expect(TagsForArea.query).toHaveBeenCalled();
    expect(TagsForCollection.query).toHaveBeenCalled();
    expect(ctrl.tagsForCollection.length).toEqual(2);

  });

  it('should add new tag', () => {

    // initialize tags to short list
    tagsForCollection = tagsForAreaRemove;

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    // add tag
    ctrl.addTag(addChip);

    expect(CollectionTagTargetAdd.query).toHaveBeenCalledWith({collId: 1, tagId: 1});

  });

  it('should remove new tag', () => {

    // initialize tags to long list
    tagsForCollection = tagsForAreaAdd;

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    // remove tag
    ctrl.removeTag(removeChip);

    expect(CollectionTagTargetRemove.query).toHaveBeenCalledWith({collId: 1, tagId: 1});

  });

  it('should fetch new tags on collection change', () => {

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    TagsForCollection.query.calls.reset();

    testCollectionId = 2;
    CollectionObservable.set(2);

    expect(ctrl.collectionId).toEqual(2);
    expect(TagsForCollection.query).toHaveBeenCalled();

  });

  it('should fetch new tags on area change', () => {

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    TagsForArea.query.calls.reset();

    testAreaId = 2;
    AreaObservable.set(2);

    expect(TagsForArea.query).toHaveBeenCalled();

  });

  it('should filter query tags.', () => {

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    let t = ctrl.queryTags('tag two name');
    // should return the tag from our short list.
    expect(t).toEqual(tagsForAreaRemove);

  });

  it('should return no tags for the collection', () => {

    tagsForCollection = emptySet;

    let ctrl = $componentController('subjectSelector', null);
    ctrl.$onInit();

    expect(ctrl.tagsForCollection.length).toEqual(0);
  })

});