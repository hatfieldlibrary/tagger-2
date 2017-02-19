/**
 * Created by mspalti on 1/24/17.
 */
'use strict';

/*jshint expr: true*/

describe('The side navigation component', () => {

  let $componentController;

  let UserAreaObservable,
    area,
    selection;

  beforeEach(module('tagger'));

  beforeEach(module(($provide) => {

      $provide.value('UserAreaObservable', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });

    }
  ));

  beforeEach(inject((_$componentController_,
                     _UserAreaObservable_) => {

    $componentController = _$componentController_;
    UserAreaObservable = _UserAreaObservable_;

  }));

  beforeEach(() => {

    area = 0;
    selection = 0;

  });

  beforeEach(() => {

    let fakeCallback = () => {
    };

    spyOn(UserAreaObservable, 'set').and.callFake((x) => {
      fakeCallback(x);
    });
    spyOn(UserAreaObservable, 'get').and.callFake(() => {
      return area;
    });
    spyOn(UserAreaObservable, 'subscribe').and.callFake((o) => {
      fakeCallback = o;
    });

  });

  it('should initialize the sidnav for administrative user', () => {

    let ctrl = $componentController('sideNavigationComponent', null);

    ctrl.$onInit();

    expect(UserAreaObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(0);
    expect(ctrl.currentIndex).toEqual(0);

  });

  it('should initialize the sidnav for collection maintainer', () => {


    let ctrl = $componentController('sideNavigationComponent', null);

    ctrl.$onInit();

    // test this using the observer subscription.
    UserAreaObservable.set(1);

    expect(UserAreaObservable.subscribe).toHaveBeenCalled();
    expect(ctrl.userAreaId).toEqual(1);

  });

  it('should select new section', () => {

    let ctrl = $componentController('sideNavigationComponent', null);

    ctrl.setCurrentIndex(1);

    expect(ctrl.currentIndex).toEqual(1);

  });



});
