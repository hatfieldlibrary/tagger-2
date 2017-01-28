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
 * Edit areas for collection.
 *
 * Created by mspalti on 12/13/16.
 */
(function () {

  'use strict';

  function AreaController(TaggerToast,
                          AreaTargetAdd,
                          AreaTargetRemove,
                          AreasForCollection,
                          CollectionObservable,
                          CollectionAreasObservable,
                          AreaListObservable) {

    const ctrl = this;

    /**
     * Set the component subscriptions.
     * @private
     */
    function _setSubscriptions() {

      CollectionObservable.subscribe((value) => {
        _getCurrentAreaTargets(value);
      });

      AreaListObservable.subscribe((value) => {
        ctrl.areas = value;
      });

    }

    /**
     * Gets the list of areas associated with the current
     * collection
     * @param id  {number} the collection id
     */
    function _getCurrentAreaTargets(id) {
      const areas = AreasForCollection.query({collId: id});
      areas.$promise.then(function (data) {
        ctrl.areaTargets = data;
      });
    }

    /**
     * Private method. Searches for area id in the current list of
     * area associations.
     * @param areaId  {number} the area ID
     * @param target  {Array.<Object>} the areas associated with the collection.
     * @returns {boolean}
     */
    function _findArea(areaId, targets) {

      for (let i = 0; i < targets.length; i++) {
        if (targets[i].AreaId === areaId) {
          return true;
        }
      }
      return false;
    };

    /**
     * Tests to see if the collection area is currently
     * associated with this collection.
     * @param areaId   {number} area ID
     * @returns {boolean}
     */
    ctrl.isChosen = function (areaId) {

      if (ctrl.areaTargets) {
        return _findArea(areaId, ctrl.areaTargets);
      }

    };

    /**
     * Adds or removes the association between a collection and a
     * collection area.  If the association already exists, it is
     * removed.  If it is a new association, it is added. Toasts
     * on success.
     * @param areaId  {number} the area ID
     */
    ctrl.update = function (areaId) {


      if (ctrl.areaTargets !== undefined) {
        // If the area id of the selected checkbox is a
        // already a target, then delete the area target.

        if (_findArea(areaId, ctrl.areaTargets)) {
          if (ctrl.areaTargets.length === 1) {
            TaggerToast.toast('Cannot remove area.  Collections must belong to at least one area.');

          } else {
            let result = AreaTargetRemove.query({collId: CollectionObservable.get(), areaId: areaId});
            result.$promise.then(function (result) {
              if (result.status === 'success') {
                ctrl.areaTargets = result.data.areaList;
                // Update the collections list (one collection has just been removed from the area).
                CollectionAreasObservable.set();
                TaggerToast.toast('Collection removed from area.');
              }
            });
          }
        }
        // If the area id of the selected item is
        // not a target already, add a new area target.
        else {
          let add = AreaTargetAdd.query({collId: CollectionObservable.get(), areaId: areaId});
          add.$promise.then(function (result) {
            if (result.status === 'success') {
              ctrl.areaTargets = result.data.areaList;
              TaggerToast.toast('Collection added to Area.');
            }
          });
        }
      }

    };

    ctrl.$onInit = function () {

      _setSubscriptions();

      ctrl.areas = AreaListObservable.get();
      _getCurrentAreaTargets(CollectionObservable.get());

    };

  }

  taggerComponents.component('areaSelector', {

    template: '<md-content class="transparent"><md-card>' +
    '  <md-toolbar class="md-primary">' +
    '   <div class="md-toolbar-tools">' +
    '     <i class="material-icons"> public </i>' +
    '     <h3 class="md-display-1"> &nbsp;Areas</h3>' +
    '    </div>' +
    '   </md-toolbar>' +
    '   <md-card-content>' +
    '      <div layout="column" class="md-subhead">Select the Areas in which this Collection will appear.' +
    '        <md-container layout="column">' +
    '           <md-checkbox ng-repeat="area in $ctrl.areas" aria-label="Areas" value="area.id" ng-checked=$ctrl.isChosen(area.id) ng-click="$ctrl.update(area.id)">{{area.title}}</md-checkbox>' +
    '        </md=container>' +
    '      </div>' +
    '   </md-content>' +
    '</md-card></md-content>',
    controller: AreaController

  });

})();
