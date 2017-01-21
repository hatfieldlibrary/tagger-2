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

  function CollectionCtrl(CollectionLinkCount,
                          AreaObservable) {

    let ctrl = this;

    ctrl.linkCount = 0;

    ctrl.selectCount = 0;

    AreaObservable.subscribe(function onNext() {
      _init(AreaObservable.get());

    });

    ctrl.$onInit = function () {
      _init(AreaObservable.get());

    };

    function _init(areaId) {

      if (areaId) {
        var types = CollectionLinkCount.query({areaId: areaId});
        types.$promise.then(function (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].browseType === 'link') {
              ctrl.linkCount = data[i].count;
            } else if (data[i].browseType === 'opts') {
              ctrl.selectCount = data[i].count;
            }
          }
          ctrl.actualCount = ctrl.linkCount + ctrl.selectCount;

        });
      }
    }
  }


  taggerComponents.component('linkTypeSummary', {

    bindings: {
       collectionCount: '<'
    },
    template: '<md-grid-tile-header class="flex">' +
    '<h3>Link Types<span class="alert-color" style="float:right" ng-if="$ctrl.actualCount == $ctrl.collectionCount">' +
    '<i class="material-icons">warning</i></span>' +
    '</h3>' +
    '</md-grid-tile-header><md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label"> Link</p>' +
    '       <p class="list-alignment"> {{$ctrl.linkCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label"> Selection Menu</p>' +
    '     <p class="list-alignment"> {{$ctrl.selectCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: CollectionCtrl

  });

})();
