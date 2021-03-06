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

/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function TagController(DialogStrategy,
                         DialogTypes,
                         UserAreaObservable,
                         TaggerToast,
                         TagList,
                         TagListObservable,
                         TagObservable) {

    const vm = this;

    /**
     * The object contains values for currently selected tag.
     * @type {{}}
     */
    vm.currentTag = {};

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addTagMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteTagMessage.html';

    function _initTagList() {
      let tags = TagList.query();
      tags.$promise.then(function (data) {
        if (data.length > 0) {
          TagListObservable.set(data);
          TagObservable.set(data[0].id);

        }
      });
    }

    /**
     * Updates the title and id on the view model.
     * This is a callback method used by children.
     * @param id
     * @param title
     */
    vm.menuUpdate = function(id, title) {
      vm.currentTag.title = title;
      vm.currentTag.id = id;
    };

    vm.$onInit = function () {

      /** @type {number} */
      vm.userAreaId = UserAreaObservable.get();

      try {
      /**
       * Get the dialog object for this component.
       * Call with showDialog($event,message).
       * @type {*}
       */
      vm.dialog =  DialogStrategy.makeDialog(DialogTypes.TAG);

      } catch (err) {
        TaggerToast.toast('Warning: failed to create dialog.  See console for error message.');
        console.log(err);

      }

      _initTagList();

    };
  }

  taggerComponents.component('tagsComponent', {

    templateUrl: 'templates/component/tags.html',
    controller: TagController,
    controllerAs: 'vm'

  });

})();
