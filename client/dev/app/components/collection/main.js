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
                                DialogTypes,
                                TaggerToast,
                                UserAreaObservable,
                                PublicationStatusObservable) {

    const vm = this;

    /**
     * The current collection object.
     * @type {{}}
     */
    vm.currentCollection = {};

    /**
     * The message used in the add collection dialog.
     * @type {string} */
    vm.addMessage = 'templates/dialog/addCollectionMessage.html';

    /**
     * The message used in the delete collection dialog.
     * @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteCollectionMessage.html';

    vm.menuUpdate = function (id, title) {
      vm.currentCollection.title = title;
      vm.currentCollection.id = id;
    };

    vm.$onInit = function () {

      try {
        /**
         * Get the dialog object for this component.
         * @type {*}
         */
        vm.dialog = DialogStrategy.makeDialog(DialogTypes.COLLECTION);

      } catch (err) {
        TaggerToast.toast('Warning: failed to create dialog.  See console for error message.');
        console.log(err);

      }

      PublicationStatusObservable.subscribe(() => {
        vm.isPublished = PublicationStatusObservable.get();
      });

      /** @type {number} */
      vm.userAreaId = UserAreaObservable.get();

    };

  }

  taggerComponents.component('collectionComponent', {

    templateUrl: 'templates/component/collection.html',
    controller: CollectionController,
    controllerAs: 'vm'

  });

})();
