(function() {

  'use strict';

  /*globals taggerControllers*/

  /**
   * Controller for content types (e.g. image, document, etc.)
   */
  taggerControllers.controller('ContentCtrl',

    function(
      $rootScope,
      $scope,
      TaggerToast,
      TaggerDialog,
      ContentTypeList,
      ContentType,
      ContentTypeUpdate,
      ContentTypeDelete,
      ContentTypeAdd,
      ContentTypeObserver,
      ContentTypeListObserver) {

      var vm = this;


      ContentTypeListObserver.subscribe(function onNext() {
        const list = ContentTypeListObserver.get();
        vm.resetType(list[0].id);
      });

      /** @type {Array.<Object>} */
      vm.contentTypes = ContentTypeListObserver.get();

      /** @type {number} */
      vm.currentType = ContentTypeObserver.get();

      /** @type {string} */
      vm.addMessage = 'templates/dialog/addContentMessage.html';

      /** @type {stromg} */
      vm.deleteMessage = 'templates/dialog/deleteContentMessage.html';

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
       * Reset the selected content type information.
       * @param id content type id
       */
      vm.resetType = function(id) {
        if (id !== null) {
          ContentTypeObserver.set(id);
          vm.currentType = id;
        }
        vm.contentType = ContentType.query({id: id});

      };

      /**
       * Update the content type information and reset content type
       * list on success.
       */
      vm.updateContentType = function() {
        var update = ContentTypeUpdate.save({
          id: vm.contentType.id,
          name: vm.contentType.name,
          icon: vm.contentType.icon
        });
        update.$promise.then(function(data) {
          if (data.status === 'success') {
            const contentTypes = ContentTypeList.query();
            contentTypes.$promise.then(function(data) {
               ContentTypeListObserver.set(data);
            });
            // Toast upon success
            new TaggerToast('Content Type Updated');
          }
        });

      };

      vm.$onInit = function() {
        vm.currentType = ContentTypeObserver.get();
        vm.contentType = ContentType.query({id: vm.currentType});
      }

    });


})();
