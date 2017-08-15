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
 * Created by mspalti on 1/30/17.
 */
'use strict';

/*jshint expr: true*/

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
      delete: () => {
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
    spyOn(CategoryDelete, 'delete').and.callFake(() => {
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

    ctrl.add('new group');

    let addedCollectionGroup = {
      title: 'new group'
    };

    deferredList.resolve(groups);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(CategoryAdd.save).toHaveBeenCalledWith(addedCollectionGroup);
    expect(GroupListObservable.set).toHaveBeenCalledWith(groups);
    expect(CategoryList.query).toHaveBeenCalled();
    expect(GroupObservable.set).toHaveBeenCalledWith(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Group Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete a collection group', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.delete();
    deferredList.resolve(groups);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(GroupObservable.get).toHaveBeenCalledWith();
    expect(CategoryDelete.delete).toHaveBeenCalledWith({id: 1});
    expect(CategoryList.query).toHaveBeenCalled();
    expect(GroupObservable.set).toHaveBeenCalledWith(groups[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Group Deleted');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should throw error', () => {

    let ctrl = $controller(dialogController, {});

    let errorTest = function() {
      ctrl.uploadImage();
    };
    expect(errorTest).toThrow(new Error('Call to unimplemented function.'));

  });


});

