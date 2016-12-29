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

  function tagAreaCtrl($scope,
                       TaggerDialog,
                       TagTargets,
                       TagObserver,
                       TagAreaObserver,
                       AreaListObserver) {

    const ctrl = this;

    let removeMessage = 'templates/dialog/removeAreaFromTagMessage.html';
    let addMessage = 'templates/dialog/addAreaToTagMessage.html';

    ctrl.areas = AreaListObserver.get();

    /**
     * Watch updates the current list of area targets
     * when the current tag id changes.
     */
    TagObserver.subscribe(function onNext() {
      _getCurrentAreaTargets(TagObserver.get());
    });
    /**
     * Watches the global list of areas and updates local
     * area list on change.
     */
    AreaListObserver.subscribe(function onNext() {
      ctrl.areas = AreaListObserver.get();
    });


    /** @type {Array.<Object>} */
    ctrl.areas = AreaListObserver.get()

    /** @type {Array.<Object>} */
    ctrl.areaTargets = [];

    /**
     * Retrieve the areas for the current tag.
     * @param id the id of the tag
     */
    function _getCurrentAreaTargets(id) {
      ctrl.areaTargets = TagTargets.query({tagId: id});

    };

    /**
     * Test whether an area is in the list of areas selected
     * for this tag.  Uses the areaTargets array for the
     * test.
     * @param areaId the area id
     */
    ctrl.isChosen = function (areaId) {
      return _findArea(areaId, ctrl.areaTargets);

    };

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html to display in dialog
     */
    ctrl.showDialog = function ($event, areaId) {

      let message = '';
      TagAreaObserver.set(areaId);
      if (_findArea(areaId, ctrl.areaTargets)) {
        message = removeMessage;
      }
      else {
        message = addMessage;
      }

      new TaggerDialog($event, message);

    };

    $scope.$on('removedAreaFromTag', function (event, message) {
      ctrl.areaTargets = message.areaTargets;

    });

    $scope.$on('addedAreaToTag', function (event, message) {
      ctrl.areaTargets = message.areaTargets;

    });

    /**
     * Private method. Searches for area id in the current list of
     * area associations.
     * @param areaId  {number} the area ID
     * @param target  {Array.<Object>} the areas associated with the collection.
     * @returns {boolean}
     */
    var _findArea = function (areaId, targets) {

      for (var i = 0; i < targets.length; i++) {
        if (targets[i].AreaId === areaId) {
          return true;
        }
      }
      return false;
    };

    ctrl.$onInit = function() {
      let id = TagObserver.get();
      _getCurrentAreaTargets(id);
    }


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
    '           <md-checkbox ng-repeat="area in $ctrl.areas" aria-label="Areas" value="area.id" ng-checked="$ctrl.isChosen(area.id)" ng-click="$ctrl.showDialog($event, area.id)">{{area.title}}</md-checkbox>' +
    '        </md=container>' +
    '      </div>' +
    '   </md-content>' +
    '</md-card>',
    controller: tagAreaCtrl

  });

})();
