/**
 * Created by mspalti on 1/27/17.
 */
'use strict';

/*jshint expr: true*/

describe('The global values service', () => {

  let SetGlobalValues,
    CategoryList,
    GroupListObservable,
    GroupObservable,
    TagList,
    TagListObservable,
    TagObservable,
    ContentTypeList,
    ContentTypeListObservable,
    ContentTypeObservable,
    deferredContentTypeList,
    deferredGroupList,
    deferredTagList,
    contentTypeList,
    tagList,
    groupList,
    $rootScope;

  beforeEach(module('tagger'));

  beforeEach(module(() => {

    module(($provide) => {
      $provide.value('CategoryList', {
        query: () => {}
      })
    });

    module(($provide) => {
      $provide.value('TagList', {
        query: () => {}
      });
    });

    module(($provide) => {
      $provide.value('ContentTypeList', {
        query: () => {}
      });
    });

    module(($provide) => {
      $provide.value('GroupObservable', {
        set: (x) => {},
        get: () => {},
        subscribe: () =>{}
      });
    });

    module(($provide) => {
      $provide.value('GroupListObservable', {
        set: (x) => {},
        get: () => {},
        subscribe: () =>{}
      });
    });

    module(($provide) => {
      $provide.value('ContentTypeObservable', {
        set: (x) => {},
        get: () => {},
        subscribe: () =>{}
      });
    });

    module(($provide) => {
      $provide.value('ContentTypeListObservable', {
        set: (x) => {},
        get: () => {},
        subscribe: () =>{}
      }) ;
    });

    module(($provide) => {
      $provide.value('TagObservable', {
        set: (x) => {},
        get: () => {},
        subscribe: () =>{}
      });
    });

    module(($provide) => {
      $provide.value('TagListObservable', {
        set: (x) => {},
        get: () => {},
        subscribe: () =>{}
      });
    });

  }));

  beforeEach(inject((_SetGlobalValues_,
                     _CategoryList_,
                     _TagList_,
                     _ContentTypeList_,
                     _GroupObservable_,
                     _GroupListObservable_,
                     _ContentTypeObservable_,
                     _ContentTypeListObservable_,
                     _TagObservable_,
                     _TagListObservable_,
                     _$q_,
                     _$rootScope_) => {

    SetGlobalValues = _SetGlobalValues_;
    CategoryList = _CategoryList_;
    TagList = _TagList_;
    ContentTypeList = _ContentTypeList_;
    GroupObservable = _GroupObservable_;
    GroupListObservable = _GroupListObservable_;
    ContentTypeObservable = _ContentTypeObservable_;
    ContentTypeListObservable = _ContentTypeListObservable_;
    TagObservable = _TagObservable_;
    TagListObservable = _TagListObservable_;

    deferredGroupList = _$q_.defer();
    deferredTagList = _$q_.defer();
    deferredContentTypeList = _$q_.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    contentTypeList = [
      {
        id: 1,
        name: 'test type one'
      },
      {
        id: 2,
        name: 'test type two'
      }
    ];

    tagList = [
      {
        id: 1,
        name: 'test tag one'
      },
      {
        id: 2,
        name: 'test tag two'
      }
    ];

    groupList = [
      {
        id: 1,
        name: 'test category one'
      },{
        id: 2,
        name: 'test category two'
      }

    ]

  });

  beforeEach(() => {

    spyOn(CategoryList, 'query').and.callFake(() => {
      return {
        $promise: deferredGroupList.promise
      }
    });
    spyOn(TagList, 'query').and.callFake(() => {
      return {
        $promise: deferredTagList.promise
      }
    });
    spyOn(ContentTypeList, 'query').and.callFake(() => {
      return {
        $promise: deferredContentTypeList.promise
      }
    });
    spyOn(GroupObservable, 'set');
    spyOn(GroupListObservable, 'set');
    spyOn(ContentTypeObservable, 'set');
    spyOn(ContentTypeListObservable, 'set');
    spyOn(TagObservable, 'set');
    spyOn(TagListObservable, 'set');

  });

  it('should initialized values', () => {

    SetGlobalValues.initializeGlobalValues();

    deferredGroupList.resolve(groupList);
    deferredTagList.resolve(tagList);
    deferredContentTypeList.resolve(contentTypeList);
    $rootScope.$apply();

    expect(CategoryList.query).toHaveBeenCalled();
    expect(TagList.query).toHaveBeenCalled();
    expect(ContentTypeList.query).toHaveBeenCalled();

    expect(GroupListObservable.set).toHaveBeenCalledWith(groupList);
    expect(GroupObservable.set).toHaveBeenCalledWith(groupList[0].id)

    expect(ContentTypeListObservable.set).toHaveBeenCalledWith(contentTypeList);
    expect(ContentTypeObservable.set).toHaveBeenCalledWith(contentTypeList[0].id)

    expect(TagListObservable.set).toHaveBeenCalledWith(tagList);
    expect(TagObservable.set).toHaveBeenCalledWith(tagList[0].id)

  });

});
