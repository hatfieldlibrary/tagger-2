/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 12/13/16.
 */

(function () {

  'use strict';

  function TagAreaController($scope,
                       TagTargets,
                       TagObservable,
                       TagAreaObservable,
                       AreaListObservable,
                       DialogStrategy) {

    const vm = this;

    let removeMessage = 'templates/dialog/removeAreaFromTagMessage.html';
    let addMessage = 'templates/dialog/addAreaToTagMessage.html';

    function _setSubscriptions() {
      /**
       * Watch updates the current list of area targets
       * when the current tag id changes.
       */
      TagObservable.subscribe((tag) => {
        _getCurrentAreaTargets(tag);
      });
      /**
       * Watches the global list of areas and updates local
       * area list on change.
       */
      AreaListObservable.subscribe((list) => {
        vm.areas = list;
      });
    }

    /** @type {Array.<Object>} */
    vm.areas = AreaListObservable.get();

    /** @type {Array.<Object>} */
    vm.areaTargets = [];

    /**
     * Retrieve the areas for the current tag.
     * @param id the id of the tag
     */
    function _getCurrentAreaTargets(id) {
      const tagTargets = TagTargets.query({tagId: id});
      tagTargets.$promise.then((targets) => {
        vm.areaTargets = targets;
      });
    }

    /**
     * Test whether an area is in the list of areas selected
     * for this tag.  Uses the areaTargets array for the
     * test.
     * @param areaId the area id
     */
    vm.isChosen = function (areaId) {
      return _findArea(areaId, vm.areaTargets);

    };

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html to display in dialog
     */
    vm.showDialog = function ($event, areaId) {

      let message = '';
      TagAreaObservable.set(areaId);
      if (_findArea(areaId, vm.areaTargets)) {
        message = removeMessage;
      }
      else {
        message = addMessage;
      }

     vm.dialog.showDialog($event, message);

    };

    $scope.$on('removedAreaFromTag', function (event, message) {
      vm.areaTargets = message.areaTargets;

    });

    $scope.$on('addedAreaToTag', function (event, message) {
      vm.areaTargets = message.areaTargets;

    });

    /**
     * Private method. Searches for area id in the current list of
     * area associations.
     * @param areaId  {number} the area ID
     * @param target  {Array.<Object>} the areas associated with the collection.
     * @returns {boolean}
     */
    function _findArea(areaId, targets) {

      if (targets) {
        for (var i = 0; i < targets.length; i++) {
          if (targets[i].AreaId === areaId) {
            return true;
          }
        }
      }
      return false;
    }

    vm.$onInit = function() {

      vm.areas = AreaListObservable.get();

      _setSubscriptions();

      /**
       * Get the dialog object for this component.
       * Call with showDialog($event,message).
       * @type {*}
       */
       vm.dialog = DialogStrategy.makeDialog('TagAreaController');

      let id = TagObservable.get();

      _getCurrentAreaTargets(id);

    };


  }

  taggerComponents.component('tagAreaSelector', {

    template: '<md-card>' +
    '  <md-toolbar class="md-primary">' +
    '   <div class="md-toolbar-tools">' +
    '     <i class="material-icons"> public </i>' +
    '     <h3 class="md-display-1"> &nbsp;Areas</h3>' +
    '    </div>' +
    '   </md-toolbar>' +
    '   <md-card-content>' +
    '      <div layout="column" class="md-subhead">Select the Areas in which this Tag will appear.' +
    '        <md-container layout="column">' +
    '           <md-checkbox ng-repeat="area in vm.areas" aria-label="Areas" value="area.id" ng-checked="vm.isChosen(area.id)" ng-click="vm.showDialog($event, area.id)">{{area.title}}</md-checkbox>' +
    '        </md=container>' +
    '      </div>' +
    '   </md-content>' +
    '</md-card>',
    controller: TagAreaController,
    controllerAs: 'vm'

  });

})();
