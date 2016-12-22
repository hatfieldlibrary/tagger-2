/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function TagController(TaggerDialog, UserAreaObserver,TagList, TagListObserver, TagObserver) {

    const vm = this;

    vm.currentTag = {};

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addTagMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteTagMessage.html';

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
      vm.currentTag.title = title;
      vm.currentTag.id = id;
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

  taggerComponents.component('tagsComponent', {

    templateUrl: 'templates/component/tags.html',
    controller: TagController,
    controllerAs: 'vm'

  });

})();
