/**
 * Created by mspalti on 12/15/16.
 */

(function () {

  'use strict';

  function FormController(UserAreaObserver,
                          TagListObserver,
                          TagObserver,
                          TagById,
                          TagUpdate,
                          TagList,
                          TaggerToast) {

    const vm = this;

    TagObserver.subscribe(function onNext() {
      const tagId = TagObserver.get();
      _getTagInfo(tagId);
    });

    function _getTagInfo(tagId) {
      const tag = TagById.query({id: tagId});
      tag.$promise.then(function (data) {
        vm.tag = data;
        vm.menu({id: vm.tag.id, title: vm.tag.name});
      });
    }

    vm.updateTag = function () {

      var success = TagUpdate.save({
        id: vm.tag.id,
        name: vm.tag.name

      });
      success.$promise.then(function (data) {
        if (data.status === 'success') {
          let tags = TagList.query();
          tags.$promise.then(function (list) {
            vm.tags = list;
            TagListObserver.set(list);
            // Toast upon success
            new TaggerToast('Tag Updated');
          });

        }
      });
    };

    vm.$onInit = function () {
      vm.userAreaId = UserAreaObserver.get();
      let tagId = TagObserver.get();
      if (tagId) {
        _getTagInfo(tagId);
      }
    }

  }

  taggerComponents.component('tagsForm', {

    bindings: {
      menu: '&'
    },
    template: '<md-content layout="row" layout-align="start start">' +
    '<tag-list></tag-list>' +
    '<md-card-content class="md-subhead grey-text" flex="80" layout="column">' +
    '<md-button class="md-raised md-accent large-button" ng-show="vm.userAreaId==0" ng-click="vm.updateTag()">Update Tag </md-button>' +
    '<md-input-container ng-show="vm.userAreaId==0">' +
    '<label>Tag Name</label> ' +
    '<input type="text" ng-model="vm.tag.name"/>' +
    '</md-input-container> ' +
    '<div style="height: 507px; margin-bottom: 40px;overflow: auto;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc" flex="100" ng-show="vm.userAreaId &gt; 0">' +
    '<md-content flex="flex"> ' +
    '<md-list>' +
    '<md-list-item ng-repeat="tag in vm.tags"> ' +
    '<toggle-tag-area-button flex="100" tag-id="{{tag.id}}" tag-name="{{tag.name}}" area-id="vm.currentAreaIndex" ng-click="showDialog($event, vm.deleteMessage)"></toggle-tag-area-button>' +
    '</md-list-item>' +
    '</md-list>' +
    '</md-content>' +
    '</div>' +
    '</md-card-content>' +
    '</md-content>',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
