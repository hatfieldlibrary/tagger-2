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

  function GroupController(DialogStrategy,
                           DialogTypes,
                           UserAreaObservable,
                           CategoryList,
                           TaggerToast,
                           GroupListObservable,
                           GroupObservable) {

    const vm = this;

    vm.currentCategory = {};

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addCategoryMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteCategoryMessage.html';

    function _initTagList() {
      let tags = CategoryList.query();
      tags.$promise.then(function (data) {
        if (data.length > 0) {
          GroupListObservable.set(data);
          GroupObservable.set(data[0].id);
        }
      });
    }

    vm.menuUpdate = function (id, title) {
      vm.currentCategory.title = title;
      vm.currentCategory.id = id;
    };

    vm.$onInit = function () {

      /** @type {number} */
      vm.userAreaId = UserAreaObservable.get();

      try {
        /**
         * Get the dialog object for this component.
         * @type {*}
         */
        vm.dialog = DialogStrategy.makeDialog(DialogTypes.GROUP);
      } catch (err) {

        TaggerToast.toast('Warning: failed to create dialog.  See console for error message.');
        console.log(err);

      }

      _initTagList();
    };
  }

  taggerComponents.component('groupsComponent', {

    templateUrl: 'templates/component/groups.html',
    controller: GroupController,
    controllerAs: 'vm'

  });

})();
