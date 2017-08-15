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
   * Resource for getting a list of areas.
   */
  taggerServices.factory('AreaList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/area', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting area information by area id.
   */
  taggerServices.factory('AreaById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/area/id/:id', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for adding an area via POST.
   */
  taggerServices.factory('AreaAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/area/add');
    }
  ]);
  /**
   * Resource for deleting an area via POST.
   */
  taggerServices.factory('AreaDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/area/delete/:areaId');
    }
  ]);
  /**
   * Resource for reordering areas via POST.
   */
  taggerServices.factory('ReorderAreas', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/area/reorder');
    }
  ]);
  /**
   * Resource for updating and area via POST.
   */
  taggerServices.factory('AreaUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/area/update', null, {
        'update': { method:'PUT' }
      });
    }
  ]);

})();
