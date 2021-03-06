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
 * Created by mspalti on 1/27/17.
 */
'use strict';

/*jshint expr: true*/

describe('The areas dialog controller', () => {

  let $controller;

  let $mdDialog,
    AreaDialog,
    AreaDelete,
    AreaAdd,
    AreaActionObservable,
    AreaList,
    AreaObservable,
    AreaListObservable,
    TaggerToast,
    $rootScope,
    deferred,
    deferredList,
    areas,
    success,
    dialogController;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('$mdDialog', {
      hide: () => {

      }
    });

    $provide.value('AreaList', {
      query: () => {
      }
    });

    $provide.value('AreaAdd', {
      save: () => {
      }
    });


    $provide.value('AreaDelete', {
      delete: () => {
      }
    });

    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('AreaActionObservable', {
      set: () => {
      },
      get: () => {

      }
    });

    $provide.value('AreaObservable', {
      set: () => {
      }
    });

    $provide.value('AreaListObservable', {
      set: () => {
      }
    });

  }));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(inject((_$mdDialog_,
                     _AreaDialog_,
                     _AreaList_,
                     _AreaAdd_,
                     _AreaDelete_,
                     _TaggerToast_,
                     _AreaActionObservable_,
                     _AreaObservable_,
                     _AreaListObservable_,
                     _$rootScope_,
                     _$q_) => {

    $mdDialog = _$mdDialog_;
    AreaDialog = _AreaDialog_;
    dialogController = AreaDialog.controller;
    AreaList = _AreaList_;
    AreaAdd = _AreaAdd_;
    AreaDelete = _AreaDelete_;
    TaggerToast = _TaggerToast_;
    AreaActionObservable = _AreaActionObservable_;
    AreaObservable = _AreaObservable_;
    AreaListObservable = _AreaListObservable_;
    $rootScope = _$rootScope_;
    deferred = _$q_.defer();
    deferredList = _$q_.defer();

  }));

  beforeEach(() => {

    areas = [{name: 'area one', id: 1}, {name: 'area two', id: 2}];
    success = {status: 'success'};

  });

  beforeEach(() => {

    spyOn(AreaList, 'query').and.callFake(() => {
      return {
        $promise: deferredList.promise
      }
    });
    spyOn(AreaAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });
    spyOn(AreaDelete, 'delete').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(AreaListObservable, 'set');
    spyOn(AreaActionObservable, 'set');
    spyOn(AreaActionObservable, 'get').and.callFake(() => {
      return 1;
    });
    spyOn(AreaObservable, 'set');
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });


  it('should add a new area', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.add('new area');

    deferredList.resolve(areas);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(AreaAdd.save).toHaveBeenCalledWith({title: 'new area'});
    expect(AreaListObservable.set).toHaveBeenCalledWith(areas);
    expect(AreaActionObservable.set).toHaveBeenCalledWith(areas[0].id);
    expect(AreaObservable.set).toHaveBeenCalledWith(areas[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Area Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete an area', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.delete();
    deferredList.resolve(areas);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(AreaDelete.delete).toHaveBeenCalled();
    expect(AreaActionObservable.get).toHaveBeenCalled();
    expect(AreaListObservable.set).toHaveBeenCalledWith(areas);
    expect(AreaActionObservable.set).toHaveBeenCalledWith(areas[0].id);
    expect(AreaObservable.set).toHaveBeenCalledWith(areas[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Area Deleted');
    expect($mdDialog.hide).toHaveBeenCalled();


  });

  it('should throw error', () => {

    let ctrl = $controller(dialogController, {});

    expect(function() {ctrl.uploadImage()}).toThrow(new Error('Call to unimplemented function.'));

  });


});
