/**
 * Created by mspalti on 1/24/17.
 */
'use strict';

describe('The authorization component', () => {

  let $componentController;

  let SetGlobalValues,
    UserAreaObservable,
    UserObserver,
    IsAuthObserver,
    getUserInfo,
    userArea,
    userId,
    user,
    areaMaintainer,
    deferred,
    $rootScope;

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('SetGlobalValues', {
        initializeGlobalValues: () => {
        }
      });
    });

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
      $provide.value('UserObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('IsAuthObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      })
    });

    module(($provide) => {
      $provide.value('getUserInfo', {
        query: () => {
        }
      })
    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  beforeEach(inject((_SetGlobalValues_,
                     _UserAreaObservable_,
                     _UserObserver_,
                     _IsAuthObserver_,
                     _getUserInfo_,
                     _$q_,
                      _$rootScope_) => {

    SetGlobalValues = _SetGlobalValues_;
    UserAreaObservable = _UserAreaObservable_;
    UserObserver = _UserObserver_;
    IsAuthObserver = _IsAuthObserver_;
    getUserInfo = _getUserInfo_;
    let $q = _$q_;
    deferred = $q.defer();
    $rootScope = _$rootScope_.$new();


  }));

  beforeEach(() => {

    userArea = 0;
    userId = 1;
    user = {
      name: 'test user',
      areaId: 0,
      picture: 'mugshot.jpg'
    }
    areaMaintainer = {
      name: 'test maintainer',
      areaId: 1,
      picture: 'mugshot.jpg'
    }

  });

  beforeEach(() => {

    let fakeUserAreaCallback = () => {
    };
    let fakeUserCallback = () => {
    };
    let fakeIsAuthCallback = () => {
    };

    spyOn(SetGlobalValues, 'initializeGlobalValues');

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeUserAreaCallback(x)
    });
    spyOn(UserAreaObservable, 'get').and.returnValue(userArea);
    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeUserAreaCallback = o
    });

    spyOn(UserObserver, 'set').and.callFake((x) => {
      fakeUserCallback(x)
    });
    spyOn(UserObserver, 'get').and.returnValue(userId);
    spyOn(UserObserver, 'subscribe').and.callFake((o) => {
      fakeUserCallback = o
    });

    spyOn(IsAuthObserver, 'set').and.callFake((x) => {
      fakeIsAuthCallback(x)
    });
    spyOn(IsAuthObserver, 'get');
    spyOn(IsAuthObserver, 'subscribe').and.callFake((o) => {
      fakeIsAuthCallback = o
    });

    spyOn(getUserInfo, 'query').and.callFake(() => {
      return {
        $promise: deferred.promise
      }
    });

  });

  it('should initialize the component for administrative user', () => {

    let ctrl = $componentController('authorizationComponent', null);

    ctrl.$onInit();

    deferred.resolve(user);
    $rootScope.$apply();

    expect(getUserInfo.query).toHaveBeenCalled();
    expect(ctrl.authorized).toBe(true);
    expect(ctrl.userPicture).toEqual('mugshot.jpg');
    expect(ctrl.userName).toEqual('test user');
    expect(IsAuthObserver.set).toHaveBeenCalledWith(true);
    expect(UserObserver.set).toHaveBeenCalledWith(0);
    expect(UserAreaObservable.set).toHaveBeenCalledWith(0);
    expect(ctrl.role).toEqual('Administrator');
    expect(SetGlobalValues.initializeGlobalValues).toHaveBeenCalled();

  });

  it('should initialize the component for area maintainer', () => {

    let ctrl = $componentController('authorizationComponent', null);

    ctrl.$onInit();

    deferred.resolve(areaMaintainer);
    $rootScope.$apply();

    expect(getUserInfo.query).toHaveBeenCalled();
    expect(ctrl.authorized).toBe(true);
    expect(ctrl.userPicture).toEqual('mugshot.jpg');
    expect(ctrl.userName).toEqual('test maintainer');
    expect(IsAuthObserver.set).toHaveBeenCalledWith(true);
    expect(UserObserver.set).toHaveBeenCalledWith(1);
    expect(UserAreaObservable.set).toHaveBeenCalledWith(1);
    expect(ctrl.role).toEqual('Area Maintainer');
    expect(SetGlobalValues.initializeGlobalValues).toHaveBeenCalled();

  });


});
