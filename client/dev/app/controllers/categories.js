(function () {

  'use strict';

  /*globals taggerControllers*/

  /**
   * Controller for collection categories management.
   */
  taggerControllers.controller('CategoryCtrl',

    function ($rootScope,
              $scope,
              Category,
              CategoryList,
              CategoryUpdate,
              TaggerToast,
              TaggerDialog,
              AreaListObserver,
              CategoryListObserver,
              CategoryObserver) {

      var vm = this;

      /** @type {Array.<Object>} */
      vm.areas = AreaListObserver.get();

      /** @type {Array.<Object>} */
      vm.categories = CategoryListObserver.get();

      /** @type {number} */
      vm.currentCategory = CategoryObserver.get();

      // Dialog Messages
      /** @type {string} */
      vm.addMessage = 'templates/dialog/addCategoryMessage.html';

      /** @type {string} */
      vm.deleteMessage = 'templates/dialog/deleteCategoryMessage.html';

      CategoryListObserver.subscribe(function onNext() {
        vm.categories = CategoryListObserver.get();
        if (vm.categories !== null) {
          _resetCategoryFromList(vm.categories);
        }
      });

      CategoryObserver.subscribe(function onNext() {
        vm.currentCategory = CategoryObserver.get();
        vm.resetCategory(vm.currentCategory);
      });

      AreaListObserver.subscribe(function onNext() {
        vm.areas = AreaListObserver.get();
      });

      /**
       * Show the $mdDialog.
       * @param $event click event object (location of event used as
       *                    animation starting point)
       * @param message  html to display in dialog
       */
      vm.showDialog = function ($event, message) {
        new TaggerDialog($event, message);

      };

      /**
       * Resets the current category
       * @param id
       */
      function _resetCategoryFromList (list) {
        if (list !== null) {
          vm.currentCategory = list[0].id;
        }
        vm.currentCategory = Category.query({id: vm.currentCategory});

      };

      vm.resetCategory = function (id) {
        if (id !== null) {
          vm.currentCategory = id;
        }
        vm.category = Category.query({id: vm.currentCategory});

      };

      /**
       * Update category information and update the category
       * list upon success.
       */
      vm.updateCategory = function () {
        var success = CategoryUpdate.save({
          id: vm.category.id,
          title: vm.category.title,
          description: vm.category.description,
          areaId: vm.category.areaId,
          linkLabel: vm.category.linkLabel,
          url: vm.category.url

        });
        success.$promise.then(function (data) {
          if (data.status === 'success') {
            vm.categories = CategoryList.query();
            // Toast upon success
            new TaggerToast('Category Updated');
          }
        });

      };

      vm.$onInit = function () {
        vm.currentCategory = CategoryObserver.get();
        vm.resetCategory(vm.currentCategory);
      }
    }
  );

})();

