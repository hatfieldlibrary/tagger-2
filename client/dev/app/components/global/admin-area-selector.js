/**
 * Created by mspalti on 12/14/16.
 */
(function () {

  'use strict';

  function AreasController(UserAreaObserver,
                           CollectionObserver,
                           AreaObserver,
                           AreaListObserver,
                           AreaLabelObserver,
                           CollectionsByArea,
                           AreaList) {

    const vm = this;

    /**
     * Watches for update to the user's area. Data.userAreaId should change
     * only when the app is loaded.  The value is obtained in the Passport
     * OAUTH login procedure and is used here to initialize state. (If only
     * used here, why the observable?
     */
    UserAreaObserver.subscribe(function onNext() {
      vm.userAreaId = UserAreaObserver.get();
      if (vm.userAreaId === 0) {
        alert()
        var areas = AreaList.query();
        areas.$promise.then(function (data) {
          vm.areas = data;
          AreaListObserver.set(data);
          AreaObserver.set(data[0].id);

          console.log(data)
          vm.currentAreaId = setAreaId(data[0].id);
          _setInitialCollection(data[0].id);
        });
      }
      else {
        // this is meant to handle collection managers.
      }
    });

    AreaListObserver.subscribe(function onNext() {
      const areas = AreaListObserver.get();
      AreaObserver.set(vm.currentAreaId);
      vm.areas = areas;
      vm.currentAreaId = setAreaId(areas[0].id);
    });

    /**
     * Set the inital collection for the area.
     * @param id   the area id
     */
    function _setInitialCollection(id) {

      if (typeof(id) === 'number') {
        var collections = CollectionsByArea.query({areaId: id});
        collections.$promise.then(function (data) {
          if (data !== undefined) {
            if (data.length > 0) {
              CollectionObserver.set(data[0].Collection.id);
            } else {
              CollectionObserver.set(-1);
            }
          }
        });
      }
    }

    /**
     * Administrators will be assigned to the non-existing
     * area id of zero.  This method assigns a real area
     * id to the administrator session, otherwise returns
     * the area id for the collection manager.
     * @param id
     * @returns {*}
     */
    function setAreaId(id) {
      if (id === 0) {
        return AreaObserver.get();
      } else {
        return id;
      }
    }

    /**
     * Update the current area.
     * @param id the area id
     * @param index the position of the area in the
     *          current area array
     */
    vm.updateArea = function (id, index) {
      if (UserAreaObserver.get() === 0) { // admin user
        console.log('got area id ' + id)
        AreaObserver.set(id);
        const areas = AreaListObserver.get();
        console.log(id)
        console.log(areas)
        console.log(areas[index].title)
        AreaLabelObserver.set(areas[index].title);
        _setInitialCollection(id);
      }
    };

    // vm.$onInit = function () {
    //   const area = AreaObserver.get();
    //   if(area) {
    //     _setInitialCollection(area);
    //   }
    //
    // };

  }


  taggerComponents.component('adminAreaSelector', {

    template: '' +
    '<div ng-if="vm.userAreaId === 0">  ' +
    ' <md-input-container class="md-no-float"> ' +
    '   <md-select ng-model="vm.areas" placeholder="Select Area"> ' +
    '     <md-option ng-repeat="area in vm.areas" ng-value="area.title" ng-selected="vm.currentAreaId == area.id" ng-click="vm.updateArea(area.id, $index)">{{area.title}}' +
    '     </md-option> ' +
    '   </md-select> ' +
    ' </md-input-container> ' +
    '</div>',
    controller: AreasController,
    controllerAs: 'vm'
  });

})();
