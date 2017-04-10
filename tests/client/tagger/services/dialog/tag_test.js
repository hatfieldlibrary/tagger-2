/**
 * Created by mspalti on 1/30/17.
 */
'use strict';

/*jshint expr: true*/

describe('The tag dialog controller', () => {

  let $controller;

  let $mdDialog,
    TagDelete,
    TagAdd,
    TagList,
    TagListObservable,
    TagObservable,
    TagAreaObservable,
    AreaObservable,
    TaggerToast,
    $rootScope,
    deferred,
    deferredList,
    deferredTarget,
    tags,
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

    $provide.value('TagAdd', {
      save: () => {
      }
    });

    $provide.value('TagDelete', {
      delete: () => {
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
                     _TagDialog_,
                     _TagAdd_,
                     _TagDelete_,
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
    dialogController = _TagDialog_.controller;
    TagAdd = _TagAdd_;
    TagDelete = _TagDelete_;
    TagListObservable = _TagListObservable_;
    TagAreaObservable = _TagAreaObservable_;
    AreaObservable = _AreaObservable_;
    TagObservable = _TagObservable_;
    TaggerToast = _TaggerToast_;
    $rootScope = _$rootScope_;
    deferred = _$q_.defer();
    deferredTarget = _$q_.defer();
    deferredList = _$q_.defer();

  }));

  beforeEach(() => {

    tags = [
      {
        id: 1,
        name: 'tag one'
      },
      {
        id: 2,
        name: 'tag two'
      }
    ];

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
    spyOn(TagAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });
    spyOn(TagDelete, 'delete').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

    spyOn(TagObservable, 'set');
    spyOn(TagObservable, 'get').and.returnValue(1);
    spyOn(TagListObservable, 'set');
    spyOn(TagAreaObservable, 'get').and.returnValue(2);
    spyOn(TaggerToast, 'toast');
    spyOn($mdDialog, 'hide');

  });

  it('should add a new tag.', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.add('new tag');

    let addedTag = {
      name: 'new tag'
    };

    deferredList.resolve(tags);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(TagAdd.save).toHaveBeenCalledWith(addedTag);
    expect(TagListObservable.set).toHaveBeenCalledWith(tags);
    expect(TagList.query).toHaveBeenCalled();
    expect(TagObservable.set).toHaveBeenCalledWith(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should fail to add tag and toast a warning.', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.add('new tag');

    let addedTag = {
      name: 'new tag'
    };

    deferredList.resolve(tags);
    deferred.resolve(failure);
    $rootScope.$apply();

    expect(TagAdd.save).toHaveBeenCalledWith(addedTag);
    expect(TaggerToast.toast).toHaveBeenCalledWith('WARNING: Unable to add tag.');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete a tag.', () => {

    let ctrl = $controller(dialogController, {});

    ctrl.delete();
    deferredList.resolve(tags);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(TagObservable.get).toHaveBeenCalledWith();
    expect(TagDelete.delete).toHaveBeenCalledWith({id: 1});
    expect(TagList.query).toHaveBeenCalled();
    expect(TagObservable.set).toHaveBeenCalledWith(tags[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag Deleted');
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

