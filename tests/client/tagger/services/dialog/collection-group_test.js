/**
 * Created by mspalti on 1/30/17.
 */
'use strict';

describe('The collection group dialog controller', () => {

  let $controller;

  let $mdDialog,
    CategoryDelete,
    CategoryAdd,
    CategoryList,
    GroupListObservable,
    GroupObservable,
    TaggerToast,
    $rootScope,
    deferred,
    deferredList,
    groups,
    success,
    dialogController;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('$mdDialog', {
      hide: () => {

      }
    });

    $provide.value('CategoryList', {
      query: () => {
      }
    });

    $provide.value('CategoryAdd', {
      save: () => {
      }
    });

    $provide.value('CategoryDelete', {
      save: () => {
      }
    });

    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('GroupListObservable', {
      set: () => {
      }
    });


    $provide.value('GroupObservable', {
      set: () => {
      },
      get: () => {

      }
    });


  }));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(inject((_$mdDialog_,
                     _CollectionGroupDialog_,
                     _CategoryDelete_,
                     _CategoryAdd_,
                     _CategoryList_,
                     _GroupListObservable_,
                     _GroupObservable_,
                     _TaggerToast_,
                     _$rootScope_,
                     _$q_) => {

    $mdDialog = _$mdDialog_;
    CategoryList = _CategoryList_;
    dialogController = _CollectionGroupDialog_.controller;
    CategoryAdd = _CategoryAdd_;
    CategoryDelete = _CategoryDelete_;
    GroupListObservable = _GroupListObservable_;
    GroupObservable = _GroupObservable_;
    TaggerToast = _TaggerToast_;
    $rootScope = _$rootScope_;
    deferred = _$q_.defer();
    deferredList = _$q_.defer();

  }));

  beforeEach(() => {

    groups = [
      {
        id: 1,
        title: 'group one'
      },
      {
        id: 2,
        title: 'group two'
      }
    ];

    success = {status: 'success', id: 3};

  });

  beforeEach(() => {

    spyOn(CategoryList, 'query').and.callFake(() => {
      return {
        $promise: deferredList.promise
      }
    });
    spyOn(CategoryAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });
    spyOn(CategoryDelete, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(GroupObservable, 'set');
    spyOn(GroupObservable, 'get').and.returnValue(1);
    spyOn(GroupListObservable, 'set');
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });


  it('should add a new collection group', () => {

    let ctrl = $controller(dialogController, {});

    spyOn(ctrl, 'getCategoryList').and.callThrough();

    ctrl.addCategory('new group');

    let addedCollectionGroup = {
      title: 'new group'
    };

    deferredList.resolve(groups);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(CategoryAdd.save).toHaveBeenCalledWith(addedCollectionGroup);
    expect(GroupListObservable.set).toHaveBeenCalledWith(groups);
    expect(ctrl.getCategoryList).toHaveBeenCalledWith(3);
    expect(CategoryList.query).toHaveBeenCalled();
    expect(GroupObservable.set).toHaveBeenCalledWith(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Group Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete a collection group', () => {

    let ctrl = $controller(dialogController, {});

    spyOn(ctrl, 'getCategoryList').and.callThrough();

    ctrl.deleteCategory();
    deferredList.resolve(groups);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(GroupObservable.get).toHaveBeenCalledWith();
    expect(CategoryDelete.save).toHaveBeenCalledWith({id: 1});
    expect(ctrl.getCategoryList).toHaveBeenCalledWith(null);
    expect(CategoryList.query).toHaveBeenCalled();
    expect(GroupObservable.set).toHaveBeenCalledWith(groups[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Group Deleted');
    expect($mdDialog.hide).toHaveBeenCalled();

  });


});

