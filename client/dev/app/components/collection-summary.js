/**
 * Created by mspalti on 12/12/16.
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

    ctrl.$onInit = function() {
        _init(AreaObserver.get());

    };

    function _init(areaId) {

      let restrictedCount = 0;
      if (areaId !== null) {
        let collections =
          CollectionsByArea.query({areaId: areaId});
        collections.$promise.then(function (data) {
          TotalCollectionsObserver.set(data.length);
          ctrl.collectionsCount = data.length;
          for (var i = 0; i < data.length; i++) {
            if (data[i].Collection.restricted !== false) {
              restrictedCount++;
            }
          }
          ctrl.restricted = restrictedCount;
          ctrl.public = data.length - restrictedCount;

        });
      }
    }
  }


   taggerComponents.component('collectionSummary', {

     template: '<md-list style="width:100%;margin-top: 40px;">' +
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
     '     <p class="grey-label">Total</p>' +
     '       <p class="list-alignment"> {{$ctrl.collectionsCount}}</p>' +
     '   </md-list-item>' +
     '   <md-divider/>' +
     '</md-list>',
     controller: CollectionCtrl

   });

})();
