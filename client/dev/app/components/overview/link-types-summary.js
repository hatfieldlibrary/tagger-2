/**
 * Created by mspalti on 12/19/16.
 */
(function () {

  'use strict';

  function CollectionCtrl(TotalLinksObserver,
                          CollectionLinkCount,
                          AreaObserver) {

    let ctrl = this;

    AreaObserver.subscribe(function onNext() {
      _init(AreaObserver.get());

    });

    ctrl.$onInit = function () {
      _init(AreaObserver.get());

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
          TotalLinksObserver.set(ctrl.linkCount + ctrl.selectCount);
        });
      }
    }
  }


  taggerComponents.component('linkTypeSummary', {

    template: '<md-grid-tile-header class="flex">' +
    '<h3>Link Types<span class="alert-color" style="float:right" ng-if="!vm.collectionLinksMatch">' +
    '<i class="material-icons">warning</i></span>' +
    '</h3>' +
    '</md-grid-tile-header><md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label"> Link</p>' +
    '       <p class="list-alignment"> {{linkCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label"> Selection Menu</p>' +
    '     <p class="list-alignment"> {{selectCount}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: CollectionCtrl

  });

})();
