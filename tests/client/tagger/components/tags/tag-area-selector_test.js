/**
 * Created by mspalti on 1/25/17.
 */
'use strict';

describe('The tags area selector component', () => {

  let $componentController;

  let TagTargets,
    TagObservable,
    TagAreaObservable,
    AreaListObservable,
    DialogStrategy,
    $q,
    $rootScope,
    deferred,
    tagId,
    tagTargetList,
    areaId;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('DialogStrategy', {
        makeDialog: () => {
        },
        showDialog: (event, message) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('TagAreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('AreaListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('TagObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('TagTargets', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_DialogStrategy_,
                     _AreaListObservable_,
                     _TagObservable_,
                     _TagAreaObservable_,
                     _TagTargets_,
                     _$q_,
                     _$rootScope_) => {

      DialogStrategy = _DialogStrategy_;
      AreaListObservable = _AreaListObservable_;
      TagObservable = _TagObservable_;
      TagAreaObservable = _TagAreaObservable_;
      TagTargets = _TagTargets_;
      $q = _$q_;
      deferred = $q.defer();
      $rootScope = _$rootScope_;

    }
  ))
  ;

  beforeEach(() => {

    tagId = 1;
    areaId = 1;

    tagTargetList = [
      {
        AreaId: 1
      },
      {
        AreaId: 2
      },
      {
        AreaId: 3
      }
    ];

    // bindings = {
    //   tagId: 1,
    //   tagName: 'tag one'
    // }

  });

  beforeEach(() => {

    let fakeTagListCallback = () => {
    };
    let fakeTagCallback = () => {
    };
    let fakeAreaCallback = () => {
    };


    spyOn(DialogStrategy, 'makeDialog').and.callFake(() => {
      return DialogStrategy;
    });
    spyOn(DialogStrategy, 'showDialog').and.callFake(() => {

    });

    spyOn(TagAreaObservable, 'set').and.callFake((x) => {
      fakeTagListCallback(x)
    });
    spyOn(TagAreaObservable, 'get').and.callFake((x) => {
      return tagTargetList;
    });

    spyOn(TagAreaObservable, 'subscribe').and.callFake((o) => {
      fakeTagListCallback = o
    });

    spyOn(TagObservable, 'set').and.callFake((x) => {
      fakeTagCallback(x)
    });
    spyOn(TagObservable, 'get').and.callFake((x) => {
      return tagId;
    });
    spyOn(TagObservable, 'subscribe').and.callFake((o) => {
      fakeTagCallback = o
    });

    spyOn(AreaListObservable, 'set').and.callFake((x) => {
      fakeAreaCallback(x)
    });
    spyOn(AreaListObservable, 'get').and.callFake((x) => {
      return areaId;
    });
    spyOn(AreaListObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o
    });

    spyOn(TagTargets, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });


  it('should initialize the component.', () => {

    let ctrl = $componentController('tagAreaSelector', null);

    ctrl.$onInit();

    expect(DialogStrategy.makeDialog).toHaveBeenCalled();

    deferred.resolve(tagTargetList);
    $rootScope.$apply();

    expect(TagTargets.query).toHaveBeenCalledWith({tagId: tagId});
    expect(TagObservable.subscribe).toHaveBeenCalled();
    expect(AreaListObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.areaTargets).toEqual(tagTargetList);

  });

  it('should show the dialog.', () => {

    let ctrl = $componentController('tagAreaSelector', null);

    ctrl.$onInit();

    ctrl.showDialog(null, areaId);

    expect(DialogStrategy.makeDialog).toHaveBeenCalled();

    expect(TagAreaObservable.set).toHaveBeenCalledWith(areaId);


  });

  it('should update the selected tags list after subscription update', () => {

    let ctrl = $componentController('tagAreaSelector', null);

    ctrl.$onInit();

    TagObservable.set(tagId);

    expect(TagTargets.query).toHaveBeenCalledWith({tagId: tagId});

  });




});


