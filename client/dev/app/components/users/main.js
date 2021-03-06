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

  function UserController(UserList,
                          UserAdd,
                          UserUpdate,
                          UserDelete,
                          AreaList,
                          TaggerToast) {

    var vm = this;

    /**
     * Adds empty new row to users.
     */
    vm.newRow = function () {
      vm.users[vm.users.length] = {
        id: null,
        name: '',
        email: '',
        area: -1
      };
    };

    function _setAreas() {
      const areas = AreaList.query();
      areas.$promise.then(function (data) {
        data.unshift({id: 0, title: 'Administrator'});
        vm.areaList = data;
      });
    }

    /**
     * Sets the current users list.
     */
    function _setUsers() {
      var users = UserList.query();
      users.$promise.then(function (list) {
        vm.users = list;
      });
    }


    /**
     * Updates a user.
     * @param id
     * @param name
     * @param email
     * @param area
     */
    vm.updateUser = function (id, name, email, area) {
      if (id === null) {
        let update = UserAdd.save(
          {
            name: name,
            email: email,
            area: area
          });
        update.$promise.then( (data) => {
          if (data.status === 'success') {
            TaggerToast.toast('User Added');
            _setUsers();
          }
        });
      } else {
        let save = UserUpdate.update(
          {
            id: id,
            name: name,
            email: email,
            area: area
          });
        save.$promise.then( (data)=>  {
          if (data.status === 'success') {
            TaggerToast.toast('User Updated');
            _setUsers();
          }
        });
      }
    };

    /**
     * Deletes a user.
     * @param id  the user's id
     */
    vm.deleteUser = function (id) {
      let result = UserDelete.delete({id: id});
      result.$promise.then( (data) => {
        if (data.status === 'success') {
          TaggerToast.toast('User Deleted');
          _setUsers();
        }
      });

    };

    vm.$onInit = function () {
      _setUsers();
      _setAreas();
    };
  }

  taggerComponents.component('usersComponent', {

    templateUrl: 'templates/component/users.html',
    controller: UserController,
    controllerAs: 'vm'

  });

})();
