/**
 * Created by mspalti on 1/25/17.
 */
'use strict';

/*jshint expr: true*/

describe('The collection group/category form component', () => {

  let $componentController;

  let UserAreaObservable,
    GroupListObservable,
    GroupObservable,
    Category,
    CategoryUpdate,
    CategoryList,
    AreaList,
    $q,
    $rootScope,
    areasDeferred,
    categoryDeferred,
    categoriesDeferred,
    updateDeferred,
    userArea,
    groupId,
    categories,
    areas,
    category,
    bindings;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('UserAreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('GroupListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('GroupObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('Category', {
        query: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('CategoryList', {
        query: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('CategoryUpdate', {
        update: () => {
        }
      })
    });

    module(($provide) => {
      $provide.value('AreaList', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_UserAreaObservable_,
                     _GroupListObservable_,
                     _GroupObservable_,
                     _Category_,
                     _CategoryUpdate_,
                     _CategoryList_,
                     _AreaList_,
                     _$q_,
                     _$rootScope_) => {

    GroupListObservable = _GroupListObservable_;
    UserAreaObservable = _UserAreaObservable_;
    CategoryList = _CategoryList_;
    Category = _Category_;
    GroupObservable = _GroupObservable_;
    CategoryUpdate = _CategoryUpdate_;
    AreaList = _AreaList_;
    $q = _$q_;
    areasDeferred = $q.defer();
    categoryDeferred = $q.defer();
    categoriesDeferred = $q.defer();
    updateDeferred = $q.defer();
    $rootScope = _$rootScope_;

  }));

  beforeEach(() => {

    userArea = 0;

    groupId = 1;

    categories = [
      {
        id: 1,
        title: "category one"
      },
      {
        id: 2,
        title: "category two"
      },
      {
        id: 3,
        title: "category three"
      }
    ];

    areas = [
      {
        id: 1,
        linkLabel: '',
        position: 2,
        searchUrl: '',
        url: '',
        description: '',
        title: 'area one'
      },
      {
        id: 2,
        linkLabel: '',
        position: 1,
        searchUrl: '',
        url: '',
        description: '',
        title: 'area to'
      }

    ];

    category = {
      areaId: '2',
      id: 1,
      linkLabel: '',
      secondaryUrl: '',
      url: '',
      description: 'category one description',
      title: 'category one'

    };

    let menuSpy = jasmine.createSpy('menuSpy');
    bindings = {menu: menuSpy};


  });

  beforeEach(() => {

    let fakeUserAreaCallback = () => {};
    let fakeCollectionObservableCallback = () => {};
    let fakeGroupObservableCallback = () => {};

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeUserAreaCallback(x)
    });
    spyOn(UserAreaObservable, 'get').and.callFake((x) => {
      return userArea;
    });

    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaCallback = o
    });

    spyOn(GroupListObservable, 'set').and.callFake((x) => {
      fakeCollectionObservableCallback(x)
    });
    spyOn(GroupListObservable, 'get').and.callFake((x) => {
      return categories;
    });
    spyOn(GroupListObservable, 'subscribe').and.callFake((o) => {
      fakeCollectionObservableCallback = o
    });

    spyOn(GroupObservable, 'set').and.callFake((x) => {
      fakeGroupObservableCallback(x)
    });
    spyOn(GroupObservable, 'get').and.callFake((x) => {
      return groupId;
    });
    spyOn(GroupObservable, 'subscribe').and.callFake((o) => {
      fakeGroupObservableCallback = o
    });

    spyOn(CategoryList, 'query').and.callFake(() => {
      return {
        $promise: categoriesDeferred.promise
      }
    });

    spyOn(AreaList, 'query').and.callFake(() => {
      return {
        $promise: areasDeferred.promise
      }
    });

    spyOn(CategoryUpdate, 'update').and.callFake(() => {
      return {
        $promise: updateDeferred.promise
      }
    });

    spyOn(Category, 'query').and.callFake(() => {
      return {
        $promise: categoryDeferred.promise
      }
    });

  });


  it('should initialize the component', () => {

    let ctrl = $componentController('groupForm', null, bindings);

    ctrl.$onInit();

    categoryDeferred.resolve(category);
    areasDeferred.resolve(areas);
    $rootScope.$apply();

    expect(GroupObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(userArea);
    expect(ctrl.categories).toEqual(categories);
    expect(Category.query).toHaveBeenCalledWith({id: groupId});
    expect(AreaList.query).toHaveBeenCalled();

    expect(ctrl.category).toEqual(category);
    expect(ctrl.areas).toEqual(areas);
    expect(ctrl.menu).toHaveBeenCalledWith({id: category.id, title: category.title});

  });

  it('should update category on subscription', () => {

    let ctrl = $componentController('groupForm', null, bindings);

    ctrl.$onInit();

    GroupObservable.set(2);
    expect(Category.query).toHaveBeenCalledWith({id: 2});

  });

  it('should update the group', () => {

    let ctrl = $componentController('groupForm', null, bindings);

    ctrl.$onInit();

    categoryDeferred.resolve(category);

    $rootScope.$apply();

    ctrl.updateGroup();

    categoriesDeferred.resolve(categories);
    updateDeferred.resolve({status: 'success'});
    $rootScope.$apply();

    expect(CategoryUpdate.update).toHaveBeenCalled();
    expect(CategoryList.query).toHaveBeenCalled();

  });


});
