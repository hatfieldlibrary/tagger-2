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

  function TypeController(TaggerDialog,
                          UserAreaObserver,
                          TagList,
                          TagListObserver,
                          TagObserver) {

    const vm = this;

    vm.currentType = {};

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addContentMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteContentMessage.html';

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
      vm.currentType.title = title;
      vm.currentType.id = id;
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
    };
  }

  taggerComponents.component('typesComponent', {

    templateUrl: 'templates/component/types.html',
    controller: TypeController,
    controllerAs: 'vm'

  });

})();
