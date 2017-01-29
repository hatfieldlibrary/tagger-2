/**
 * Created by mspalti on 1/27/17.
 */
'use strict';

describe('The areas dialog controller', () => {

  let $controller;

  let AreaDialog,
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

    $provide.value('AreaList', {
      query: () => {
      }
    });

    $provide.value('AreaAdd', {
      save: () => {
      }
    });


    $provide.value('AreaDelete', {
      save: () => {
      }
    });

    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('AreaActionObservable', {
      set: () => {
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

  beforeEach(inject((_AreaDialog_,
                     _AreaList_,
                     _AreaAdd_,
                     _AreaDelete_,
                     _TaggerToast_,
                     _AreaActionObservable_,
                     _AreaObservable_,
                     _AreaListObservable_,
                     _$rootScope_,
                     _$q_) => {

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
    spyOn(AreaDelete, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(AreaListObservable, 'set');
    spyOn(AreaActionObservable, 'set');
    spyOn(AreaObservable, 'set');
    spyOn(TaggerToast, 'toast');

  });



  it('should add a new area', () => {

    let locals = {$scope: $rootScope.$new()};
    let ctrlConstructor = $controller(dialogController, locals);

    ctrlConstructor.addArea('new area');

    deferredList.resolve(areas);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(AreaAdd.save).toHaveBeenCalledWith({title: 'new area'});
    expect(AreaListObservable.set).toHaveBeenCalledWith(areas);
    expect(AreaActionObservable.set).toHaveBeenCalledWith(areas[0].id);
    expect(AreaObservable.set).toHaveBeenCalledWith(areas[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Area Added');

  });


});
