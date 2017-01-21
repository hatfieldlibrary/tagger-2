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
 * Created by mspalti on 12/19/16.
 */
(function () {

  'use strict';

  function ItemTypeCtrl(CollectionTypeCount,
                        AreaObservable) {

    let ctrl = this;

    ctrl.digCount = 0;
    ctrl.itmCount = 0;
    ctrl.eadCount = 0;

    AreaObservable.subscribe(function onNext() {
      _init(AreaObservable.get());

    });

    function _init(areaId) {

      if (areaId) {
        const types = CollectionTypeCount.query({areaId: areaId});
        types.$promise.then(function (data) {

          for (var i = 0; i < data.length; i++) {
            if (data[i].ctype === 'dig') {
              ctrl.digCount = data[i].count;
            } else if (data[i].ctype === 'itm') {
              ctrl.itmCount = data[i].count;
            } else if (data[i].ctype === 'aid') {
              ctrl.eadCount = data[i].count;
            }
          }
          ctrl.actualCount = ctrl.digCount + ctrl.itmCount + ctrl.eadCount;

        });
      }
    }

    ctrl.$onInit = function () {
      _init(AreaObservable.get());

    };

  }

  taggerComponents.component('itemTypeSummary', {
    bindings: {
      collectionCount: '<'
    },
    template: '<md-grid-tile-header class="flex"> ' +
    '<h3>Item Types' +
    '<span class="alert-color" style="float:right" ng-if="$ctrl.actualCount == $ctrl.collectionCount">' +
    '<i class="material-icons">warning</i>' +
    '</span></h3></md-grid-tile-header>' +
    '<md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label">Collection</p>' +
    '       <p class="list-alignment"> {{$ctrl.digCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Single Item</p>' +
    '       <p class="list-alignment"> {{$ctrl.itmCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Finding Aid</p>' +
    '     <p class="list-alignment"> {{$ctrl.eadCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: ItemTypeCtrl

  });

})();
