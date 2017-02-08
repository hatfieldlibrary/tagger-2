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

(function() {

  'use strict';

  /**
   * Resource for getting summary tag information for an area.
   */
  taggerServices.factory('TagCountForArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tags/count/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Resource for getting a list of tags in an area.
   */
  taggerServices.factory('TagsForArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tags/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Resource for getting tag by it's id.
   */
  taggerServices.factory('TagById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting a list of all tags.
   */
  taggerServices.factory('TagList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for adding a tag via POST.
   */
  taggerServices.factory('TagAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/add');
    }
  ]);
  /**
   * Resource for deleting a tag via POST.
   */
  taggerServices.factory('TagDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/delete');
    }
  ]);
  /**
   * Resource for updating a tag via POST.
   */
  taggerServices.factory('TagUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/update');
    }
  ]);

})();
