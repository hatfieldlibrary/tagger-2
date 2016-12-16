/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function ListController(ContentTypeListObserver,
                          ContentTypeObserver,
                          UserAreaObserver) {

    var vm = this;

    ContentTypeListObserver.subscribe(function onNext() {
      vm.types = ContentTypeListObserver.get();
      vm.currentType = vm.types[0].id;
    });

    vm.resetType = function (typeId) {
      ContentTypeObserver.set(typeId);
      vm.currentType = typeId;
    };

    vm.$onInit = function () {

      vm.userAreaId = UserAreaObserver.get();
      // If current type exists, use it.
      const currentType = ContentTypeObserver.get();
      if (currentType) {
        vm.currentType = currentType;
      }
      // If current type list exists, use it.
      const typeList = ContentTypeListObserver.get();
      if (typeList) {
        vm.types = typeList;
      }
    }
  }

  taggerComponents.component('typesList', {

    template: '<md-card-content flex>' +
    ' <div layout="column" style="height:700px">' +
    '   <md-content flex="flex" ng-show="vm.userAreaId==0">' +
    '     <md-list>' +
    '       <div ng-repeat="type in vm.types">' +
    '         <md-list-item>' +
    '           <md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': tag.id==vm.currentType}" ng-click="vm.resetType(type.id);">' +
    '           <div class="list-group-item-text md-subhead layout-fill">{{type.name}}' +
    '               <div class="md-ripple-container"></div>' +
    '             </div>' +
    '           </md-button>' +
    '         </md-list-item>' +
    '         <md-divider></md-divider>' +
    '       </div>' +
    '     </md-list>' +
    '   </md-content>' +
    ' </div>' +
    '</md-card-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();
