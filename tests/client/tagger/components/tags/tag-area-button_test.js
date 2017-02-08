/**
 * Created by mspalti on 1/25/17.
 */
'use strict';

describe('The tags button component', () => {

  let $componentController;

  let TagTargets,
    TagObservable,
    AreaObservable,
    TagListObservable,
    DialogStrategy,
    $q,
    $rootScope,
    deferred,
    tagId,
    tagTargetList,
    bindings;

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
      $provide.value('TagListObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('AreaObservable', {
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
                     _TagListObservable_,
                     _TagObservable_,
                     _AreaObservable_,
                     _TagTargets_,
                     _$q_,
                     _$rootScope_) => {

      DialogStrategy = _DialogStrategy_;
      TagListObservable = _TagListObservable_;
      TagObservable = _TagObservable_;
      AreaObservable = _AreaObservable_;
      TagTargets = _TagTargets_;
      $q = _$q_;
      deferred = $q.defer();
      $rootScope = _$rootScope_;

    }
  ))
  ;

  beforeEach(() => {

    tagId = 1;

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

    bindings = {
      tagId: 1,
      tagName: 'tag one'
    }

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

    spyOn(TagListObservable, 'set').and.callFake((x) => {
      fakeTagListCallback(x)
    });
    spyOn(TagListObservable, 'get').and.callFake((x) => {
      return tagTargetList;
    });

    spyOn(TagListObservable, 'subscribe').and.callFake((o) => {
      fakeTagListCallback = o
    });

    spyOn(TagObservable, 'set').and.callFake((x) => {
      fakeTagCallback(x)
    });
    spyOn(TagObservable, 'get').and.callFake((x) => {
      return
    });
    spyOn(TagObservable, 'subscribe').and.callFake((o) => {
      fakeTagCallback = o
    });

    spyOn(AreaObservable, 'set').and.callFake((x) => {
      fakeAreaCallback(x)
    });
    spyOn(AreaObservable, 'get').and.callFake((x) => {
      return tagId;
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o
    });

    spyOn(TagTargets, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });


  it('should initialize the component.', () => {

    let ctrl = $componentController('toggleTagAreaButton', null, bindings);

    ctrl.$onInit();

    expect(DialogStrategy.makeDialog).toHaveBeenCalled();

    deferred.resolve(tagTargetList);
    $rootScope.$apply();

    expect(TagTargets.query).toHaveBeenCalledWith({tagId: bindings.tagId});

  });

  it('should show the dialog.', () => {

    let ctrl = $componentController('toggleTagAreaButton', null, bindings);

    ctrl.$onInit();

    ctrl.showDialog(null, bindings.tagId);

    expect(DialogStrategy.makeDialog).toHaveBeenCalled();

    expect(TagObservable.set).toHaveBeenCalledWith(bindings.tagId);


  });

  it('should recheck button status after list update via subscriber', () => {

    let ctrl = $componentController('toggleTagAreaButton', null, bindings);

    ctrl.$onInit();
    expect(TagListObservable.subscribe).toHaveBeenCalled();

    deferred.resolve(tagTargetList);
    $rootScope.$apply();

    TagTargets.query.calls.reset();

    TagListObservable.set([]);

    expect(TagTargets.query).toHaveBeenCalled();

  });

});


