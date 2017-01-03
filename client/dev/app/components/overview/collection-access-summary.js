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

  function CollectionCtrl(CollectionsByArea,
                          TotalCollectionsObserver,
                          AreaObserver) {

    let ctrl = this;

    AreaObserver.subscribe(function onNext() {
      _init(AreaObserver.get());

    });

    function _init(areaId) {

      let restrictedCount = 0;
      let publicCount = 0;
      let unpublishedCount = 0;
      if (areaId !== null) {
        let collections =
          CollectionsByArea.query({areaId: areaId});
        collections.$promise.then(function (data) {
          TotalCollectionsObserver.set(data.length);
          ctrl.collectionsCount = data.length;
          for (var i = 0; i < data.length; i++) {
            if (data[i].Collection.restricted !== true) {
              if (data[i].Collection.published == true) {
                publicCount++;
              }
            }
            if (data[i].Collection.restricted !== false) {
              if (data[i].Collection.published == true) {
                restrictedCount++;
              }
            }
            if (data[i].Collection.published == false) {
              unpublishedCount++;
            }
          }
          ctrl.restricted = restrictedCount;
          ctrl.public = publicCount;
          ctrl.unpublished = unpublishedCount;
        });
      }
    }

    ctrl.$onInit = function() {
      _init(AreaObserver.get());

    };

  }

  taggerComponents.component('collectionGroupSummary', {
    bindings: {
      collectionCount: '<'
    },
    template:
    '<md-grid-tile-header>' +
    '<h3>Entries</h3>' +
    '</md-grid-tile-header>' +
    '<md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label"> Restricted</p>' +
    '       <p class="list-alignment"> {{$ctrl.restricted}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label"> Public</p>' +
    '     <p class="list-alignment"> {{$ctrl.public}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Unpublished</p>' +
    '       <p class="list-alignment"> {{$ctrl.unpublished}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: CollectionCtrl

  });

})();
