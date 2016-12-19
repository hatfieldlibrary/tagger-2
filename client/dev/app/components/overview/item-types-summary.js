/**
 * Created by mspalti on 12/19/16.
 */
(function () {

  'use strict';

  function ItemTypeCtrl(TotalTypesObserver,
                        CollectionTypeCount,
                        AreaObserver) {

    let ctrl = this;

    AreaObserver.subscribe(function onNext() {
      _init(AreaObserver.get());

    });

    function _init(areaId) {

      if (areaId) {
        var types = CollectionTypeCount.query({areaId: areaId});
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
          TotalTypesObserver.set(ctrl.digCount + ctrl.itmCount + ctrl.eadCount);
        });
      }
    }

    ctrl.$onInit = function () {
      _init(AreaObserver.get());

    };

  }

  taggerComponents.component('itemTypeSummary', {

    template:
    '<md-grid-tile-header class="flex"> ' +
    '<h3>Item Types' +
    '<span class="alert-color" style="float:right" ng-if="!vm.collectionTypeMatch">' +
    '<i class="material-icons">warning</i>' +
    '</span></h3></md-grid-tile-header>' +
    '<md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label">Collection</p>' +
    '       <p class="list-alignment"> {{ctrl.digCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Single Item</p>' +
    '       <p class="list-alignment"> {{ctrl.itmCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Finding Aid</p>' +
    '     <p class="list-alignment"> {{ctrl.eadCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: ItemTypeCtrl

  });

})();
