/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function FormController(UserAreaObserver,
                          ContentTypeListObserver,
                          ContentTypeObserver,
                          ContentType,
                          ContentTypeUpdate,
                          ContentTypeList,
                          TaggerToast) {

    const vm = this;

    ContentTypeObserver.subscribe(function onNext() {
      const typeId = ContentTypeObserver.get();

      _getTypeInfo(typeId);
    });

    function _getTypeInfo(typeId) {
      const type = ContentType.query({id: typeId});
      type.$promise.then(function (data) {
        vm.contentType = data;
      });
    }

    vm.updateContentType = function () {

      var success = ContentTypeUpdate.save({
        id: vm.contentType.id,
        name: vm.contentType.name,
        icon: vm.contentType.icon

      });
      success.$promise.then(function (data) {
        if (data.status === 'success') {
          let types = ContentTypeList.query();
          types.$promise.then(function (list) {
            vm.types = list;
            ContentTypeListObserver.set(list);
            // Toast upon success
            new TaggerToast('Tag Updated');
          });

        }
      });
    };

    vm.$onInit = function () {
      vm.userAreaId = UserAreaObserver.get();
      let typeId = ContentTypeObserver.get();
      if (typeId) {
        _getTypeInfo(typeId);
      }
    }

  }

  taggerComponents.component('typesForm', {

    template:
    '<md-card-content layout-padding="layout-padding" layout="column" flex="80" style="padding-left: 20px"> ' +
    ' <md-button class="md-raised md-accent large-button" ng-click="vm.updateContentType()">Update Content Type</md-button> ' +
    '   <div flex="flex" layout="column"> ' +
    '     <md-input-container> ' +
    '       <label>Type Name</label>' +
    '       <input type="text" ng-model="vm.contentType.name"/>' +
    '     </md-input-container>' +
    '     <md-input-container>' +
    '       <label>Type Icon (Fontawesome icon name:  e.g. fa-bus )</label>' +
    '       <input type="text" ng-model="vm.contentType.icon"/>' +
    '      </md-input-container>' +
    '    <div ng-if="vm.contentType.icon" layout="column">' +
    '    <div flex="30" style="padding-top: 30px">Preview:</div>' +
    '      <span style="font-size: 2rem;padding-top: 10px"><i class="fa {{vm.contentType.icon}}"></i></span>' +
    '    </div>' +
    '  </div>' +
    '  <div class="md-panel">Fontawesome Icons:' +
    '    <a href="https://fortawesome.github.io/Font-Awesome/icons/" target="_blank"> https://fortawesome.github.io/Font-Awesome/icons/</a>' +
    '  </div>' +
    '</md-card-content>',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
