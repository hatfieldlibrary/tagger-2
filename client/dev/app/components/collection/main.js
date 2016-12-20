/**
 * Created by mspalti on 12/14/16.
 */


(function () {

  'use strict';

  function CollectionController(TaggerDialog, UserAreaObserver) {

    const vm = this;

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addCollectionMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteCollectionMessage.html';

    /** @type {string} */
    vm.updateImageMessage = 'templates/dialog/updateImageMessage.html';

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html template to display in dialog
     */
    vm.showDialog = function ($event, message) {
      new TaggerDialog($event, message);
    };

    vm.$onInit = function() {
      /** @type {number} */
      vm.userAreaId = UserAreaObserver.get();
    }

  }

  taggerComponents.component('collectionComponent', {

    templateUrl: 'templates/component/collection.html',
    controller: CollectionController,
    controllerAs: 'vm'

  });

})();
