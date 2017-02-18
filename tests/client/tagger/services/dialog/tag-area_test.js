/**
 * Created by mspalti on 2/17/17.
 */
'use strict';

describe('The tag area dialog controller', () => {

  let $controller;

  let $rootScope,
    $mdDialog,
    TagTargetAdd,
    TagTargetRemove,
    TagList,
    TagListObservable,
    TagObservable,
    TagAreaObservable,
    AreaObservable,
    TaggerToast,
    deferredList,
    deferredTarget,
    tagTargetsSuccess,
    success,
    failure,
    dialogController;

  beforeEach(module('tagger'));


  beforeEach(module(($provide) => {

    $provide.value('$mdDialog', {
      hide: () => {
      }
    });

    $provide.value('TagList', {
      query: () => {
      }
    });

    $provide.value('TagTargetAdd', {
      query: () => {
      }
    });

    $provide.value('TagTargetRemove', {
      query: () => {
      }
    });


    $provide.value('TaggerToast', {
      toast: () => {
      }
    });

    $provide.value('TagObservable', {
      set: () => {
      },
      get: () => {
      }
    });

    $provide.value('TagListObservable', {
      set: () => {
      },
      get: () => {
      }
    });

    $provide.value('TagAreaObservable', {
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
                     _TagAreaDialog_,
                     _TagTargetAdd_,
                     _TagTargetRemove_,
                     _TagList_,
                     _TagListObservable_,
                     _TagObservable_,
                     _TagAreaObservable_,
                     _AreaObservable_,
                     _TaggerToast_,
                     _$rootScope_,
                     _$q_) => {

    $mdDialog = _$mdDialog_;
    TagList = _TagList_;
    dialogController = _TagAreaDialog_.controller;
    TagTargetAdd = _TagTargetAdd_;
    TagTargetRemove = _TagTargetRemove_;
    TagListObservable = _TagListObservable_;
    TagAreaObservable = _TagAreaObservable_;
    AreaObservable = _AreaObservable_;
    TagObservable = _TagObservable_;
    TaggerToast = _TaggerToast_;
    $rootScope = _$rootScope_;
    deferredTarget = _$q_.defer();
    deferredList = _$q_.defer();

  }));

  beforeEach(() => {

    tagTargetsSuccess = {

      status: 'success',
      data: {
        areaList: [
          {
            AreaId: 2,
          },
          {
            AreaId: 4
          }
        ]
      }
    };

    success = {status: 'success', id: 3};
    failure = {status: 'failed'};

  });

  beforeEach(() => {

    spyOn(TagList, 'query').and.callFake(() => {
      return {
        $promise: deferredList.promise
      }
    });
    spyOn(TagTargetAdd, 'query').and.callFake(() => {
      return {
        $promise: deferredTarget.promise
      }
    });
    spyOn(TagTargetRemove, 'query').and.callFake(() => {
      return {
        $promise: deferredTarget.promise
      }
    });

    spyOn(TagObservable, 'set');
    spyOn(TagObservable, 'get').and.returnValue(1);
    spyOn(TagListObservable, 'set');
    spyOn(TagAreaObservable, 'get').and.returnValue(2);
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });

  it('should add tag to an area.', () => {

    let ctrl = $controller(dialogController, {});

    spyOn($rootScope, '$broadcast').and.callThrough();

    let target = {
      tagId: 1, // the tag id returned by TagObservable spy
      areaId: 2 // the tag id returned by AreaObservable spy
    };

    ctrl.add();

    deferredTarget.resolve(tagTargetsSuccess);
    $rootScope.$apply();

    expect(TagTargetAdd.query).toHaveBeenCalledWith(target);
    expect($rootScope.$broadcast).toHaveBeenCalled();
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag Added area.');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete tag from an area.', () => {

    let ctrl = $controller(dialogController, {});

    spyOn($rootScope, '$broadcast').and.callThrough();

    let target = {
      tagId: 1, // the tag id returned by TagObservable spy
      areaId: 2 // the tag id returned by AreaObservable spy
    };

    ctrl.delete();

    deferredTarget.resolve(tagTargetsSuccess);
    $rootScope.$apply();

    expect(TagTargetRemove.query).toHaveBeenCalledWith(target);
    expect($rootScope.$broadcast).toHaveBeenCalled();
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag removed from Area.');
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
