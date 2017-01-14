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
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function TagController(GetDialog,
                         UserAreaObserver,
                         TagList,
                         TagListObserver,
                         TagObserver) {

    const vm = this;

    vm.currentTag = {};

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addTagMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteTagMessage.html';

    /**
     * Compose the dialog object for this component.
     * @type {*}
     */
    const dialog =  GetDialog(vm);

    function _initTagList() {
      let tags = TagList.query();
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
      dialog.showDialog($event, message);
    };

    vm.$onInit = function () {
      _initTagList();
    };
  }

  taggerComponents.component('tagsComponent', {

    templateUrl: 'templates/component/tags.html',
    controller: TagController,
    controllerAs: 'vm'

  });

})();
