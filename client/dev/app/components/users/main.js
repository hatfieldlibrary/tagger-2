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
 * Created by mspalti on 12/16/16.
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
        id: null, name: '',
        email: '',
        area: ''
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
        var arr = [];
        if (list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            arr[i] = {
              id: list[i].id,
              name: list[i].name,
              email: list[i].email,
              area: list[i].area
            };
          }
        }
        vm.users = arr;
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
        var update = UserAdd.save(
          {
            name: name,
            email: email,
            area: area
          });
        update.$promise.then(function () {
          if (update.status === 'success') {
            new TaggerToast('User Added');
            _setUsers();
          }
        });
      } else {
        var save = UserUpdate.save(
          {
            id: id,
            name: name,
            email: email,
            area: area
          });
        save.$promise.then(function () {
          if (save.status === 'success') {
            new TaggerToast('User Updated');
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
      var result = UserDelete.save({id: id});
      result.$promise.then(function () {
        if (result.status === 'success') {
          new TaggerToast('User Deleted');
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
