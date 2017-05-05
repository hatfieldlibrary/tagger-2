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
 * Created by mspalti on 1/11/17.
 */

(function() {

  'use strict';

  /**
   * Resource for adding a tag to an area.
   */
  taggerServices.factory('TagTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/subject/area/add');
    }
  ]);
  /**
   * Resource for removing a tag from an area.
   */
  taggerServices.factory('TagTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/subject/:tagId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Resource return a list of areas to which a tag has been assigned.
   */
  taggerServices.factory('TagTargets', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/subject/targets/byId/:tagId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

})();
