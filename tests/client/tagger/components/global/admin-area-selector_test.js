/**
 * Created by mspalti on 1/24/17.
 */
'use strict';

describe('The admin area selector', () => {

  let $componentController;

  let AreaObservable,
    AreaListObservable,
    AreaLabelObserver,
    UserAreaObservable,
    AreaList,
    userArea,
    testAreas;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('UserAreaObservable', {
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
      $provide.value('AreaLabelObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });
    module(($provide) => {
      $provide.value('AreaList', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_UserAreaObservable_,
                     _AreaObservable_,
                     _AreaListObservable_,
                     _AreaLabelObserver_,
                     _AreaList_) => {
    UserAreaObservable = _UserAreaObservable_;
    AreaObservable = _AreaObservable_;
    AreaListObservable = _AreaListObservable_;
    AreaLabelObserver = _AreaLabelObserver_;
    AreaList = _AreaList_;

  }));

  beforeEach(() => {

    // administrator
    userArea = 0;

    testAreas = [
      {
        id: 1,
        title: 'test area one',
        description: '',
        position: 1,
        searchUrl: '',
        url: ''
      },
      {
        id: 2,
        title: 'test area two',
        description: '',
        position: 1,
        searchUrl: '',
        url: ''
      }
    ]

  });


  beforeEach(() => {

    let fakeUserAreaCallback = () => {};
    let fakeAreaCallback = () => {};
    let fakeAreaListCallback = () => {};
    let fakeAreaLabelCallback = () => {};

    spyOn(UserAreaObservable, 'get').and.callFake(() => {
      return userArea;
    });
    spyOn(UserAreaObservable, 'set').and.callFake((x) =>
      fakeUserAreaCallback(x));
    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaCallback = o;
    });


    spyOn(AreaObservable, 'get').and.callFake(() => {
      return '1';
    });
    spyOn(AreaObservable, 'set').and.callFake((x) => {
      fakeAreaCallback(x);
    });
    spyOn(AreaObservable, 'subscribe').and.callFake((o) => {
      fakeAreaCallback = o;
    });

    spyOn(AreaListObservable, 'get').and.callFake(() => {
      return testAreas
    });
    spyOn(AreaListObservable, 'set').and.callFake((x) => {
      fakeAreaListCallback(testAreas)
    });
    spyOn(AreaListObservable, 'subscribe').and.callFake((o) => {
      fakeAreaListCallback = o;
    });

    spyOn(AreaLabelObserver, 'get').and.callFake(() => {
        return '';
    });
    spyOn(AreaLabelObserver, 'set').and.callFake((x) => {
      fakeAreaLabelCallback(x)
    });
    spyOn(AreaLabelObserver, 'subscribe').and.callFake((o) => {
      fakeAreaLabelCallback = o;
    });

    spyOn(AreaList, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(testAreas);
          }
        }
      }
    });


  });

  it('should initialize the component subscriptions', () => {

    let ctrl = $componentController('adminAreaSelector', null);

    ctrl.$onInit();

    expect(AreaListObservable.subscribe).toHaveBeenCalled();
    expect(UserAreaObservable.subscribe).toHaveBeenCalled();

  });

  it('should update the area', () => {

    let ctrl = $componentController('adminAreaSelector', null);

    UserAreaObservable.set(userArea);

    ctrl.updateArea(1,0);

    expect(UserAreaObservable.get).toHaveBeenCalled();
    expect(AreaObservable.set).toHaveBeenCalledWith(1);
    expect(ctrl.currentAreaId).toEqual(1);
    expect(AreaListObservable.get).toHaveBeenCalled();
    expect(AreaLabelObserver.set).toHaveBeenCalledWith('test area one');

  });

  it('should should get area list for administrative user', () => {

    let ctrl = $componentController('adminAreaSelector', null);

    ctrl.$onInit();

    UserAreaObservable.set(0);

    expect(ctrl.userAreaId).toEqual(0);
    expect(AreaList.query).toHaveBeenCalled();
    expect(AreaListObservable.set).toHaveBeenCalledWith(testAreas);
    expect(AreaObservable.set).toHaveBeenCalledWith(1);
    expect(ctrl.currentAreaId).toEqual(1);

  });

  it('should not get area list for non-administrative user', () => {

    let ctrl = $componentController('adminAreaSelector', null);

    ctrl.$onInit();

    UserAreaObservable.set(1);

    expect(ctrl.userAreaId).toEqual(1);
    expect(AreaList.query).not.toHaveBeenCalled();

  });

});
