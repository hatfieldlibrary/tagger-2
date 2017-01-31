/**
 * Created by mspalti on 1/30/17.
 */
'use strict';

describe('The tag dialog controller', () => {

  let $controller;

  let $mdDialog,
    TagDelete,
    TagTargetAdd,
    TagTargetRemove,
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

    $provide.value('TagTargetAdd', {
      query: () => {
      }
    });

    $provide.value('TagTargetRemove', {
      query: () => {
      }
    });

    $provide.value('TagAdd', {
      save: () => {
      }
    });

    $provide.value('TagDelete', {
      save: () => {
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
                     _TagTargetAdd_,
                     _TagTargetRemove_,
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
    TagTargetAdd = _TagTargetAdd_;
    TagTargetRemove = _TagTargetRemove_;
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
    spyOn(TagAdd, 'save').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });
    spyOn(TagDelete, 'save').and.callFake(() => {
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

    spyOn(ctrl, 'getTagList').and.callThrough();

    ctrl.addTag('new tag');

    let addedTag = {
      name: 'new tag'
    };

    deferredList.resolve(tags);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(TagAdd.save).toHaveBeenCalledWith(addedTag);
    expect(ctrl.getTagList).toHaveBeenCalledWith(3);
    expect(TagListObservable.set).toHaveBeenCalledWith(tags);
    expect(TagList.query).toHaveBeenCalled();
    expect(TagObservable.set).toHaveBeenCalledWith(3);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag Added');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should fail to add tag and toast a warning.', () => {

    let ctrl = $controller(dialogController, {});

    spyOn(ctrl, 'getTagList').and.callThrough();

    ctrl.addTag('new tag');

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

    spyOn(ctrl, 'getTagList').and.callThrough();

    ctrl.deleteTag();
    deferredList.resolve(tags);
    deferred.resolve(success);
    $rootScope.$apply();

    expect(TagObservable.get).toHaveBeenCalledWith();
    expect(TagDelete.save).toHaveBeenCalledWith({id: 1});
    expect(ctrl.getTagList).toHaveBeenCalledWith(null);
    expect(TagList.query).toHaveBeenCalled();
    expect(TagObservable.set).toHaveBeenCalledWith(tags[0].id);
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag Deleted');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should add tag to an area.', () => {

    let ctrl = $controller(dialogController, {});

    spyOn($rootScope, '$broadcast');

    let target = {
      tagId: 1, // the tag id returned by TagObservable spy
      areaId: 2 // the tag id returned by AreaObservable spy
    };

    ctrl.addAreaToTag();

    deferredTarget.resolve(tagTargetsSuccess);
    $rootScope.$apply();

    expect(TagTargetAdd.query).toHaveBeenCalledWith(target);
    expect($rootScope.$broadcast).toHaveBeenCalled();
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag Added area.');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

  it('should delete tag from an area.', () => {

    let ctrl = $controller(dialogController, {});

    spyOn($rootScope, '$broadcast');

    let target = {
      tagId: 1, // the tag id returned by TagObservable spy
      areaId: 2 // the tag id returned by AreaObservable spy
    };

    ctrl.removeAreaFromTag();

    deferredTarget.resolve(tagTargetsSuccess);
    $rootScope.$apply();

    expect(TagTargetRemove.query).toHaveBeenCalledWith(target);
    expect($rootScope.$broadcast).toHaveBeenCalled();
    expect(TaggerToast.toast).toHaveBeenCalledWith('Tag removed from Area.');
    expect($mdDialog.hide).toHaveBeenCalled();

  });

});

