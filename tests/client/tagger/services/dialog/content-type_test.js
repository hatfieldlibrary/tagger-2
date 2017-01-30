/**
 * Created by mspalti on 1/30/17.
 */
'use strict';

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
      save: () => {
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
    spyOn(ContentTypeDelete, 'save').and.callFake(() => {
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

    spyOn(ctrl, 'getContentList').and.callThrough();

    ctrl.addContentType('new type');

    let addedContentType = {
      title: 'new type'
    };

    deferredList.resolve(types);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(ContentTypeAdd.save).toHaveBeenCalledWith(addedContentType);
    expect(ContentTypeListObservable.set).toHaveBeenCalledWith(types);
    expect(ctrl.getContentList).toHaveBeenCalledWith(3);
    expect(ContentTypeList.query).toHaveBeenCalled();
    expect(ContentTypeObservable.set).toHaveBeenCalledWith(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Content Type Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete a collection group', () => {

    let ctrl = $controller(dialogController, {});

    spyOn(ctrl, 'getContentList').and.callThrough();

    ctrl.deleteContentType();
    deferredList.resolve(types);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(ContentTypeObservable.get).toHaveBeenCalledWith();
    expect(ContentTypeDelete.save).toHaveBeenCalledWith({id: 1});
    expect(ctrl.getContentList).toHaveBeenCalledWith(null);
    expect(ContentTypeList.query).toHaveBeenCalled();
    expect(ContentTypeObservable.set).toHaveBeenCalledWith(types[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Content Type Deleted');
    expect($mdDialog.hide).toHaveBeenCalled();

  });


});

