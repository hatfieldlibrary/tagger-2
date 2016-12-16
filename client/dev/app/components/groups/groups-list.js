/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function ListController(GroupListObserver,
                          GroupObserver,
                          UserAreaObserver) {

    var vm = this;

    GroupListObserver.subscribe(function onNext() {
      vm.categories = GroupListObserver.get();
      vm.currentCategory = vm.categories[0].id;
    });

    vm.resetCategory = function (tagId) {
      GroupObserver.set(tagId);
      vm.currentCategory = tagId;
    };

    vm.$onInit = function () {

      vm.userAreaId = UserAreaObserver.get();
      // If current group exists, use it.
      const currentCat = GroupObserver.get();
      if (currentCat) {
        vm.currentCategory = currentCat;
      }
      // If current group list exists, use it.
      const groupList = GroupListObserver.get();
      if (groupList) {
        vm.categories = groupList;
      }
    }
  }

  taggerComponents.component('groupsList', {

    template:
    ' <md-content flex="flex"> ' +
    '   <md-list> ' +
    '     <div ng-repeat="cat in vm.categories"> ' +
    '       <md-list-item> ' +
    '         <md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': cat.id==vm.currentCategory}" ng-click="vm.resetCategory(cat.id);"> ' +
    '           <div class="list-group-item-text md-subhead layout-fill">{{cat.title}}' +
    '             <div class="md-ripple-container"></div>' +
    '           </div>' +
    '         </md-button> ' +
    '       </md-list-item> ' +
    '       <md-divider></md-divider> ' +
    '     </div> ' +
    '   </md-list> ' +
    ' </md-content>' +
    '</md-card-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();



