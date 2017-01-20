/**
 * Created by mspalti on 1/4/17.
 */

'use strict';

describe('Area components', function () {

  let $componentController;

  let AreaList,
    DialogStrategy,
    AreaListObserver,
    AreaActionObserver,
    AreaById,
    AreaUpdate,
    ReorderAreas,
    $q;

  let areas;
  let areasUpdated = [{name: 'updated area', id: 1}, {name: 'area two', id: 2}];
  let areasObserved = [{name: 'the observed area one', id: 1}, {name: 'area two', id: 2}, {name: 'area three', id: 3}];
  let areasQueried = [{name: 'areas queried', id: 1}, {name: 'area two', id: 2}];
  let actionAreaId = 2;
  let actionArea = {id: 2, title: 'action title'};
  let success = {status: 'success'};

  beforeEach(module('tagger'));

  beforeEach(() => {

    module(($provide) => {
      $provide.value('AreaList', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaById', {
        query: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaUpdate', {
        save: () => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaListObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('AreaActionObserver', {
        set: (x) => {
        },
        get: () => {
        },
        subscribe: (o) => {
        }
      });
    });

    module(($provide) => {
      $provide.value('DialogStrategy', {
        makeDialog: (vm) => {
        },
        showDialog: (event, message) => {
        }
      });
    });

  });

  beforeEach(inject((_$componentController_) => {
    // used to create instances of component controllers
    $componentController = _$componentController_;


  }));


  beforeEach(inject((_AreaList_,
                     _AreaById_,
                     _AreaUpdate_,
                     _DialogStrategy_,
                     _AreaObserver_,
                     _AreaListObserver_,
                     _AreaActionObserver_,
                     _ReorderAreas_,
                     _$q_) => {
    // inject mocks
    AreaList = _AreaList_;
    AreaById = _AreaById_;
    AreaUpdate = _AreaUpdate_;
    DialogStrategy = _DialogStrategy_;
    AreaListObserver = _AreaListObserver_;
    AreaActionObserver = _AreaActionObserver_;
    ReorderAreas = _ReorderAreas_;
    $q = _$q_;

  }));

  beforeEach(() => {


    /**
     * Define default values so the set() method
     * can be called without subscribing. Components
     * often call the set() function without first subscribing
     * to the observable Subject.
     */
    let fakeAreaListSubject = () => {};
    let  fakeActionSubject = () => {};

    spyOn(AreaListObserver, 'set').and.callFake((value) => {
      fakeAreaListSubject(value);
    });
    spyOn(AreaListObserver, 'get').and.callFake(() => {
      return areasObserved;
    });
    spyOn(AreaListObserver, 'subscribe').and.callFake((o) => {
      fakeAreaListSubject = o;
    });

    spyOn(AreaActionObserver, 'set').and.callFake((value) => {

    });
    spyOn(AreaActionObserver, 'get').and.callFake(() => {
      return actionAreaId;
    });
    spyOn(AreaActionObserver, 'subscribe').and.callFake((o) => {
      fakeActionSubject = o;
    });

    spyOn(AreaList, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(areasQueried);
          }
        }
      }
    });

    spyOn(AreaById, 'query').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(actionArea);
          }
        }
      }
    });

    spyOn(AreaUpdate, 'save').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(success);
          }
        }
      }
    });

    spyOn(ReorderAreas, 'save').and.callFake(() => {
      return {
        $promise: {
          then: (callback) => {
            return callback(success);
          }
        }
      }
    });

    spyOn(DialogStrategy, 'makeDialog').and.callThrough();

  });


  describe('The main area component', () => {

    it('should try to get areas from observer $onInit', () => {

      let ctrl = $componentController('areasComponent', null);
      ctrl.$onInit();

      expect(ctrl.areas).toBeDefined();
      expect(AreaListObserver.get).toHaveBeenCalled();
      expect(ctrl.areas[0].name).toBe('the observed area one');

    });

    it('should get the component dialog $onInit', () => {

      let ctrl = $componentController('areasComponent', null);
      ctrl.$onInit();

      expect(DialogStrategy.makeDialog).toHaveBeenCalled();

    });

    it('should update the area list after observable push', () => {

      let ctrl = $componentController('areasComponent', null);
      ctrl.$onInit();

      AreaListObserver.set(areasUpdated);

      expect(ctrl.areas).toBeDefined();
      expect(ctrl.areas[0].name).toBe('updated area');

    });

    it('should update the view model\'s title and id headers', () => {

      let ctrl = $componentController('areasComponent', null);

      ctrl.menuUpdate(3, 'good area');

      expect(ctrl.currentArea.title).toEqual('good area');
      expect(ctrl.currentArea.id).toEqual(3);

    });
  });


  describe('The area list component', () => {

    it('should retrieve areas via the AreaList service $onInit ', () => {

      let ctrl = $componentController('areasListComponent', null);

      ctrl.$onInit();

      expect(AreaList.query).toHaveBeenCalled();
      expect(ctrl.areas[0].name).toBe(areasQueried[0].name);
      expect(AreaListObserver.subscribe).toHaveBeenCalled();

    });

    it('should notify the AreaActionObserver $onInit', () => {

      let ctrl = $componentController('areasListComponent', null);

      ctrl.$onInit();

      expect(AreaActionObserver.set).toHaveBeenCalledWith(1);

    });


    it('should prepare the area list to be reordered.', () => {
      // test for reordered areas using integration or e2e
      let bindings = {areas: areasQueried};
      let ctrl = $componentController('areasListComponent', null, bindings);

      ctrl.orderAreaList(0);
      expect(ctrl.areas.length).toBe(1);
      expect(ctrl.areas[0].name).toBe('area two');
      expect(ReorderAreas.save).toHaveBeenCalled();
      expect(AreaListObserver.set).toHaveBeenCalled();

    });

    it('should update the current area and notify the app.', () => {

      let ctrl = $componentController('areasListComponent', null);

      ctrl.resetArea(2);
      expect(ctrl.currentAreaId).toEqual(2);
      expect(AreaActionObserver.set).toHaveBeenCalledWith(2);

    });

  });


  describe('The area form component', () => {

    it('should initialize the form $onInit', () => {

      var menuSpy = jasmine.createSpy('menuSpy');

      let bindings = {
        menu: menuSpy
      };
      let ctrl = $componentController('areaForm', null, bindings);

      ctrl.$onInit();

      expect(ctrl.area).toBeDefined();
      expect(ctrl.area.id).toEqual(actionArea.id);
      expect(AreaActionObserver.subscribe).toHaveBeenCalled;
      expect(menuSpy).toHaveBeenCalledWith(actionArea);

    });

    it('should update the area and get new area list', () => {

      let bindings = {
        area: {
          id: 2,
          title: 'updated area',
          description: '',
          searchUrl: '',
          linkLabel: '',
          url: ''
        },
        menu: () => {}
      };
      let ctrl = $componentController('areaForm', null, bindings);
      ctrl.$onInit();
      ctrl.updateArea();
      // update area
      expect(AreaUpdate.save).toHaveBeenCalled();
      // got new area list
      expect(AreaList.query).toHaveBeenCalled();

    });

  });

});



