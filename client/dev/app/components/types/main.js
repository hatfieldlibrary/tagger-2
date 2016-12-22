/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function TypeController(TaggerDialog,
                          UserAreaObserver,
                          TagList,
                          TagListObserver,
                          TagObserver) {

    const vm = this;

    vm.currentType = {};

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addContentMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteContentMessage.html';

    function _initTagList() {
      var tags = TagList.query();
      tags.$promise.then(function (data) {
        if (data.length > 0) {
          TagListObserver.set(data);
          TagObserver.set(data[0].id);

        }
      });
    }


    vm.menuUpdate = function(id, title) {
      vm.currentType.title = title;
      vm.currentType.id = id;
    };

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html template to display in dialog
     */
    vm.showDialog = function ($event, message) {
      new TaggerDialog($event, message);
    };

    vm.$onInit = function () {
      _initTagList();
    }
  }

  taggerComponents.component('typesComponent', {

    templateUrl: 'templates/component/types.html',
    controller: TypeController,
    controllerAs: 'vm'

  });

})();
