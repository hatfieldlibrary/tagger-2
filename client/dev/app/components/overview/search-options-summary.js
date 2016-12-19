/**
 * Created by mspalti on 12/19/16.
 */
(function () {

  'use strict';

  function CollectionCtrl(TotalSearchOptionsObserver,
                          SearchOptionType,
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
          TotalSearchOptionsObserver.set(ctrl.default + ctrl.search + ctrl.browse);
        });
      }
    }
  }


  taggerComponents.component('searchOptionsSummary', {

    template: '' +
    '<md-grid-tile-header class="flex">' +
    '<h3>Search Option Types' +
    '<span class="alert-color" style="float:right" ng-if="!vm.collectionSearchMatch">' +
    '<i class="material-icons">warning</i></span>' +
    '</h3> ' +
    '</md-grid-tile-header><md-list style="width:100%;margin-top: 40px;">' +
    '   <md-list-item>' +
    '     <p class="grey-label">Search & Browse</p>' +
    '       <p class="list-alignment"> {{default}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Browse Only</p>' +
    '       <p class="list-alignment"> {{browse}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '   <md-list-item>' +
    '     <p class="grey-label">Search Only</p>' +
    '     <p class="list-alignment"> {{search}}</p>' +
    '   </md-list-item>' +
    '   <md-divider/>' +
    '</md-list>',
    controller: CollectionCtrl

  });

})();
