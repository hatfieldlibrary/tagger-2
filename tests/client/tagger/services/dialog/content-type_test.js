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
    ContentTypeDelete,
    ContentTypeList,
    ContentTypeAdd,
    ContentTypeObservable,
    ContentTypeListObservable,
    TaggerToast,
    $rootScope,
    deferred,
    deferredList,
    types,
    success,
    dialogController;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('$mdDialog', {
      hide: () => {

      }
    });

    $provide.value('ContentTypeList', {
      query: () => {
      }
    });

    $provide.value('ContentTypeAdd', {
      save: () => {
      }
    });

    $provide.value('ContentTypeDelete', {
      delete: () => {
      }
    });

    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('ContentTypeListObservable', {
      set: () => {
      }
    });


    $provide.value('ContentTypeObservable', {
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
                     _ContentTypeDialog_,
                     _ContentTypeDelete_,
                     _ContentTypeAdd_,
                     _ContentTypeList_,
                     _ContentTypeListObservable_,
                     _ContentTypeObservable_,
                     _TaggerToast_,
                     _$rootScope_,
                     _$q_) => {

    $mdDialog = _$mdDialog_;
    ContentTypeList = _ContentTypeList_;
    dialogController = _ContentTypeDialog_.controller;
    ContentTypeAdd = _ContentTypeAdd_;
    ContentTypeDelete = _ContentTypeDelete_;
    ContentTypeListObservable = _ContentTypeListObservable_;
    ContentTypeObservable = _ContentTypeObservable_;
    TaggerToast = _TaggerToast_;
    $rootScope = _$rootScope_;
    deferred = _$q_.defer();
    deferredList = _$q_.defer();

  }));

  beforeEach(() => {

    types = [
      {
        id: 1,
        name: 'type one'
      },
      {
        id: 2,
        name: 'type two'
      }
    ];

    success = {status: 'success', id: 3};

  });

  beforeEach(() => {

    spyOn(ContentTypeList, 'query').and.callFake(() => {
      return {
        $promise: deferredList.promise
      }
    });
    spyOn(ContentTypeAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });
    spyOn(ContentTypeDelete, 'delete').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(ContentTypeObservable, 'set');
    spyOn(ContentTypeObservable, 'get').and.returnValue(1);
    spyOn(ContentTypeListObservable, 'set');
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });


  it('should add a new collection group', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.add('new type');

    let addedContentType = {
      title: 'new type'
    };

    deferredList.resolve(types);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(ContentTypeAdd.save).toHaveBeenCalledWith(addedContentType);
    expect(ContentTypeListObservable.set).toHaveBeenCalledWith(types);
    expect(ContentTypeList.query).toHaveBeenCalled();
    expect(ContentTypeObservable.set).toHaveBeenCalledWith(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Content Type Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete a collection group', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.delete();
    deferredList.resolve(types);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(ContentTypeObservable.get).toHaveBeenCalledWith();
    expect(ContentTypeDelete.delete).toHaveBeenCalledWith({id: 1});
    expect(ContentTypeList.query).toHaveBeenCalled();
    expect(ContentTypeObservable.set).toHaveBeenCalledWith(types[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Content Type Deleted');
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

