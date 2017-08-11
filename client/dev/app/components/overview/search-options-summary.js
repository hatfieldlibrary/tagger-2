/*
 * Copyright (c) 2017.
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

  function CollectionCtrl(SearchOptionType,
                          AreaObservable) {

    let ctrl = this;

    ctrl.$onInit = function () {

      AreaObservable.subscribe((id) => {
        _init(id);

      });

      _init(AreaObservable.get());

    };

    function _init(areaId) {
      ctrl.default = 0;
      ctrl.search = 0;
      ctrl.browse = 0;
      if (areaId) {
        var types = SearchOptionType.query({areaId: areaId});
        types.$promise.then(function (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].repoType === 'DEFAULT') {
              ctrl.default = data[i].count;
            } else if (data[i].repoType === 'SEARCH') {
              ctrl.search = data[i].count;
            } else if (data[i].repoType === 'BROWSE') {
              ctrl.browse = data[i].count;
            }
          }
          ctrl.actualCount = ctrl.default + ctrl.search + ctrl.browse;
        });
      }
    }
  }


  taggerComponents.component('searchOptionsSummary', {
    bindings: {
      collectionCount: '<'
    },
    template: '<md-grid-tile-header class="flex">' +
    '<h3>Search Option Types' +
    '<span class="alert-color" style="float:right" ng-if=!$ctrl.actualCount == $ctrl.collectionCount">' +
    '<i class="material-icons">warning</i></span>' +
    '</h3> ' +
    '</md-grid-tile-header><md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label">Search & Browse</p>' +
    '       <p class="list-alignment"> {{$ctrl.default}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Browse Only</p>' +
    '       <p class="list-alignment"> {{$ctrl.browse}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Search Only</p>' +
    '     <p class="list-alignment"> {{$ctrl.search}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: CollectionCtrl

  });

})();
