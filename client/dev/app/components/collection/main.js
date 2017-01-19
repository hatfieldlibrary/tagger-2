/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 12/14/16.
 */


(function () {

  'use strict';

  function CollectionController(DialogStrategy,
                                UserAreaObserver,
                                PublicationStatusObserver) {

    const vm = this;

    vm.currentCollection = {};

    PublicationStatusObserver.subscribe(function onNext() {
      vm.isPublished = PublicationStatusObserver.get();
    });


    /** @type {string} */
    vm.addMessage = 'templates/dialog/addCollectionMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteCollectionMessage.html';

    /** @type {string} */
    vm.updateImageMessage = 'templates/dialog/updateImageMessage.html';

    /**
     * Get the dialog object for this component.
     * Call with showDialog($event,message).
     * @type {*}
     */
    vm.dialog =  DialogStrategy.makeDialog(vm);

    vm.menuUpdate = function(id, title) {
      vm.currentCollection.title = title;
      vm.currentCollection.id = id;
    };

    vm.$onInit = function () {
      /** @type {number} */
      vm.userAreaId = UserAreaObserver.get();

    };

  }

  taggerComponents.component('collectionComponent', {

    templateUrl: 'templates/component/collection.html',
    controller: CollectionController,
    controllerAs: 'vm'

  });

})();
