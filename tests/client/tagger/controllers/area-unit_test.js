/**
 * Created by mspalti on 1/4/17.
 */

'use strict';

describe('The main areas component', function () {

  var $componentController;

  var AreaList;
  var $q;

  var areas;
  var areasInit = [{name: 'area init'}, {name: 'area two'}];
  var areasObserved = [{name: 'area observed'}, {name: 'area two'}];
  var areasQueried = [{name: 'areas queried'}, {name: 'area two'}];
  var addMessage = 'add message';
  var stubEvent = 'stub event';

  beforeEach(module('tagger'));
  beforeEach(module('taggerServices'));
  beforeEach(module('templates'));

  beforeEach(() => {

    module(($provide) => {

      $provide.value('AreaList', {
        query: function () {
          return {
            $promise: {
              then: (callback) => {
                return callback(areasQueried);
              }
            }
          };
        }
      });
      return null;

    });

  });

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;

  }));

  beforeEach(inject((_AreaList_, _$q_) => {
    AreaList = _AreaList_;
    $q = _$q_;

  }));


  it('should expose an `areas` object', () => {

    var bindings = {areas: areasInit};
    var ctrl = $componentController('areasComponent', null, bindings);

    expect(ctrl.areas).toBeDefined();
    expect(ctrl.areas[0].name).toBe(areasInit[0].name);

  });

  it('should call the `showDialog` method with add message', () => {

    var bindings = {addMessage: addMessage};
    var ctrl = $componentController('areasComponent', null, bindings);
    spyOn(ctrl, 'showDialog');
    ctrl.showDialog(stubEvent, ctrl.addMessage);

    expect(ctrl.showDialog).toHaveBeenCalledWith(stubEvent, ctrl.addMessage);

  });

  it('should expose observed `areas` object', () => {

    var bindings = {areas: areasInit};
    var ctrl = $componentController('areasComponent', null, bindings);

    var source = Rx.Observable.create(observer => {
      observer.onNext(areasObserved);
      observer.onCompleted();
    });

    var subscription = source.subscribe(
      x => {
        ctrl.areas = x;
        expect(ctrl.areas).toBeDefined();
        expect(ctrl.areas[0].name).toBe('area observed');
      },
      e => console.log('onError: %s', e),
      () => {
      }
    );

    subscription.dispose();

  });
});

describe('The areas list component', () => {

// not great.
  var areasInit = [{name: 'area init'}, {name: 'area two'}];
  var areasQueried = [{name: 'areas queried'}, {name: 'area two'}];

  it('should expose `areas ` object at onInit', () => {

    var bindings = {areas: areasInit};
    var ctrl = $componentController('areasList', null, bindings);

    spyOn(AreaList, "query").and.callThrough();

    ctrl.$onInit();

    expect(AreaList.query).toHaveBeenCalled();
    expect(ctrl.areas[0].name).toBe(areasQueried[0].name);

  });

});


