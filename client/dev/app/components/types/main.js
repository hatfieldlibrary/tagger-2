/*
 * Copyright (c) 2017.
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

(function () {

  'use strict';

  function TypeController(DialogStrategy,
                          DialogTypes,
                          TaggerToast,
                          UserAreaObservable,
                          ContentTypeList,
                          ContentTypeListObservable,
                          ContentTypeObservable) {

    const vm = this;

    /**
     * The object contains values for currently selected type.
     * @type {{}}
     */
    vm.currentType = {};

    /**
     * Content of the add dialog.
     * @type {string} */
    vm.addMessage = 'templates/dialog/addContentMessage.html';

    /**
     * Content of the remove dialog.
     * @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteContentMessage.html';

    function _initTagList() {
      let tags = ContentTypeList.query();
      tags.$promise.then(function (data) {
        if (data.length > 0) {
          ContentTypeListObservable.set(data);
          ContentTypeObservable.set(data[0].id);

        }
      });
    }

    /**
     * Updates the title and id on the view model.
     * This is a callback method used by children.
     * @param id
     * @param title
     */
    vm.menuUpdate = function (id, title) {
      vm.currentType.title = title;
      vm.currentType.id = id;
    };

    vm.$onInit = function () {

      try {
        /**
         * Get the dialog object for this component.
         * @type {*}
         */
        vm.dialog = DialogStrategy.makeDialog(DialogTypes.CONTENT_TYPE);

      } catch (err) {
        TaggerToast.toast('Warning: failed to create dialog. See console for error message.');
        console.log(err);

      }

      /** @type {number} */
      vm.userAreaId = UserAreaObservable.get();

      _initTagList();

    };
  }

  taggerComponents.component('typesComponent', {

    templateUrl: 'templates/component/types.html',
    controller: TypeController,
    controllerAs: 'vm'

  });

})();
