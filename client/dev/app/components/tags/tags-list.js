/**
 * Created by mspalti on 12/15/16.
 */

(function () {

  'use strict';

  function ListController(TagListObserver,
                          TagObserver,
                          UserAreaObserver) {

    var vm = this;

    TagListObserver.subscribe(function onNext() {
      vm.tags = TagListObserver.get();
      vm.currentTag = vm.tags[0].id;
    });

    vm.resetTag = function (tagId) {
      TagObserver.set(tagId);
      vm.currentTag = tagId;
    };

    vm.$onInit = function () {

      vm.userAreaId = UserAreaObserver.get();
      // If current tag exists, use it.
      const currentTag = TagObserver.get();
      if (currentTag) {
        vm.currentTag = currentTag;
      }
      // If current tag list exists, use it.
      const tagList = TagListObserver.get();
      if (tagList) {
        vm.tags = tagList;
      }
    }
  }

  taggerComponents.component('tagsList', {

    template: '<md-card-content flex>' +
    ' <div layout="column" style="height:700px">' +
    '   <md-content flex="flex" ng-show="vm.userAreaId==0">' +
    '     <md-list> ' +
    '       <div ng-repeat="tag in vm.tags">' +
    '         <md-list-item>' +
    '           <md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': tag.id==vm.currentTag}" ng-click="vm.resetTag(tag.id);">' +
    '           <div class="list-group-item-text md-subhead layout-fill">{{tag.name}}' +
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
