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
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';
  /**
   * Resource for obtaining information about the
   * authenticated user.
   */
  taggerServices.factory('getUserInfo', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'userinfo', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for the list of authorized users.
   */
  taggerServices.factory('UserList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/list');
    }
  ]);
  /**
   * Resource for adding a new user via POST.
   */
  taggerServices.factory('UserAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/add');
    }
  ]);
  /**
   * Resource for deleting a user via POST.
   */
  taggerServices.factory('UserDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/delete');
    }
  ]);
  /**
   * Resource for updating a user via POST.
   */
  taggerServices.factory('UserUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/update');
    }
  ]);

})();
