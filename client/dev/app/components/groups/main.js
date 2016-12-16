/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function GroupController(TaggerDialog,
                           UserAreaObserver,
                           CategoryList,
                           GroupListObserver,
                           GroupObserver) {

    const vm = this;

    vm.currentCategory = {};

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addCategoryMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteCategoryMessage.html';

    function _initTagList() {
      var tags = CategoryList.query();
      tags.$promise.then(function (data) {
        if (data.length > 0) {
          GroupListObserver.set(data);
          GroupObserver.set(data[0].id);

        }
      });
    }

    vm.menuUpdate = function(id, title) {
      vm.currentCategory.title = title;
      vm.currentCategory.id = id;
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

  taggerComponents.component('groupsComponent', {

    templateUrl: 'templates/component/groups.html',
    controller: GroupController,
    controllerAs: 'vm'

  });

})();
