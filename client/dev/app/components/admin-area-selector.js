/**
 * Created by mspalti on 12/14/16.
 */

(function () {
  'use strict';

  function AreasController(UserAreaObserver,
                           AreaObserver,
                           AreaListObserver,
                           AreaLabelObserver,
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
        var areas = AreaList.query();
        areas.$promise.then(function (data) {
          vm.areas = data;
          AreaListObserver.set(data);
          AreaObserver.set(data[0].id);
          vm.currentAreaId = setAreaId(data[0].id);

        });
      }
      else {
        vm.currentAreaId = id;
      }
    });

    AreaListObserver.subscribe(function onNext() {
      const areas = AreaListObserver.get();
      console.log('got new area')
     // AreaObserver.set(vm.currentAreaId);
      vm.areas = areas;
      console.log(areas[0].id)
      vm.currentAreaId = setAreaId(areas[0].id);
    });

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
        // update area id after user input
        AreaObserver.set(id);
        //Data.currentAreaIndex = id;
        const areas = AreaListObserver.get();
        AreaLabelObserver.set(areas[index].title);
      }
    };

    vm.$onInit = () => {


    }

  }

  taggerComponents.component('adminAreaSelector', {

    template: '' +
    '<div ng-if="vm.userAreaId === 0">  ' +
    ' <md-input-container class="md-no-float"> ' +
    '   <md-select ng-model="vm.areas" placeholder="Select Area"> ' +
    '     <md-option ng-repeat="area in vm.areas track by area.id" ng-value="area.title" ng-selected="vm.currentAreaId == area.id"ng-click="vm.updateArea(area.id, $index)">{{area.title}} ' +
    '     </md-option> ' +
    '   </md-select> ' +
    ' </md-input-container> ' +
    '</div>',
    controller: AreasController,
    controllerAs: 'vm'
  });

})();
