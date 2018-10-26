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

describe('The collection dialog controller', () => {

  let $controller;

  let $mdDialog,
    Constant,
    CollectionAdd,
    CollectionDelete,
    CollectionListObservable,
    CollectionsByArea,
    CollectionObservable,
    AreaObservable,
    TaggerToast,
    $rootScope,
    deferred,
    deferredList,
    collections,
    success,
    dialogController;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('$mdDialog', {
      hide: () => {

      }
    });

    $provide.value('CollectionsByArea', {
      query: () => {
      }
    });

    $provide.value('CollectionAdd', {
      save: () => {
      }
    });

    $provide.value('CollectionDelete', {
      delete: () => {
      }
    });

    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('CollectionListObservable', {
      set: () => {
      }
    });


    $provide.value('CollectionObservable', {
      set: () => {
      },
      get: () => {

      }
    });

    $provide.value('AreaObservable', {
      get: () => {
      }
    });

  }));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(inject((_$mdDialog_,
                     _Constant_,
                     _CollectionsByArea_,
                     _CollectionDialog_,
                     _CollectionAdd_,
                     _CollectionDelete_,
                     _CollectionListObservable_,
                     _CollectionObservable_,
                     _AreaObservable_,
                     _TaggerToast_,
                     _$rootScope_,
                     _$q_) => {

    $mdDialog = _$mdDialog_;
    Constant = _Constant_;
    CollectionsByArea = _CollectionsByArea_;
    dialogController = _CollectionDialog_.controller;
    CollectionAdd = _CollectionAdd_;
    CollectionDelete = _CollectionDelete_;
    CollectionListObservable = _CollectionListObservable_;
    CollectionObservable = _CollectionObservable_;
    AreaObservable = _AreaObservable_;
    TaggerToast = _TaggerToast_;
    $rootScope = _$rootScope_;
    deferred = _$q_.defer();
    deferredList = _$q_.defer();

  }));

  beforeEach(() => {

    collections = [
      {
        CollectionId: 1,
        AreaId: 1,
        Collection: {
          id: 1,
          browseType: 'link',
          repoType: 'DEFAULT',
          ctype: 'dig',
          published: true,
          restricted: true,
          description: '',
          dates: '',
          title: 'test collection one',
          image: 'no-image.gif',
          url: ''
        }
      },
      {
        CollectionId: 1,
        AreaId: 1,
        Collection: {
          id: 1,
          browseType: 'link',
          repoType: 'DEFAULT',
          ctype: 'dig',
          published: true,
          restricted: true,
          description: '',
          dates: '',
          title: 'test collection one',
          image: 'no-image.gif',
          url: ''
        }
      }
    ];

    success = {status: 'success', id: 3};

  });

  beforeEach(() => {

    spyOn(CollectionsByArea, 'query').and.callFake(() => {
      return {
        $promise: deferredList.promise
      }
    });
    spyOn(CollectionAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });
    spyOn(CollectionDelete, 'delete').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(CollectionObservable, 'set');
    spyOn(CollectionListObservable, 'set');
    spyOn(CollectionObservable, 'get').and.returnValue(1);
    spyOn(AreaObservable, 'get').and.returnValue(1);
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });


  it('should add a new collection', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.add('new collection');

    // Using the real Constants.
    let addedCollection = {
      title: 'new collection',
      areaId: AreaObservable.get(),
      browseType: Constant.defaultBrowseType,
      repoType: Constant.defaultRepoType,
      ctype: Constant.defaultCollectionType,
      parent: '[{"id":1,"title":""}]',
      published: false
    };

    deferredList.resolve(collections);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(CollectionAdd.save).toHaveBeenCalledWith(addedCollection);
    expect(CollectionListObservable.set).toHaveBeenCalledWith(collections);
    expect(AreaObservable.get).toHaveBeenCalled();
    // use the new id returned in the resolved promise.
    expect(CollectionObservable.set).toHaveBeenCalledWith(3);
    expect(CollectionsByArea.query).toHaveBeenCalledWith({areaId: 1});
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete a collection', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.delete();
    deferredList.resolve(collections);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(CollectionDelete.delete).toHaveBeenCalled();
    expect(CollectionObservable.get).toHaveBeenCalled();
    expect(CollectionsByArea.query).toHaveBeenCalledWith({areaId: 1});
    expect(AreaObservable.get).toHaveBeenCalled();
    expect(CollectionListObservable.set).toHaveBeenCalledWith(collections);
    expect(CollectionObservable.set).toHaveBeenCalledWith(collections[0].Collection.id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Collection Deleted');
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
