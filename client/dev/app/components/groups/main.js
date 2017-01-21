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

  function GroupController(DialogStrategy,
                           UserAreaObservable,
                           CategoryList,
                           GroupListObserver,
                           GroupObserver) {

    const vm = this;

    vm.currentCategory = {};

    /** @type {number} */
    vm.userAreaId = UserAreaObservable.get();

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addCategoryMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteCategoryMessage.html';

    /**
     * Get the dialog object for this component.
     * Call with showDialog($event,message).
     * @type {*}
     */
    vm.dialog =  DialogStrategy.makeDialog(vm);

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

    vm.$onInit = function () {
      _initTagList();
    };
  }

  taggerComponents.component('groupsComponent', {

    templateUrl: 'templates/component/groups.html',
    controller: GroupController,
    controllerAs: 'vm'

  });

})();
