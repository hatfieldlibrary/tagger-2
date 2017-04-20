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
   * Resource for getting summary information for search option types
   * by area.
   */
  taggerServices.factory('SearchOptionType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/collection/repoTypeByArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting collection summary information by area.
   */
  taggerServices.factory('CollectionTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/collection/count/types/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting link type summary information by area.
   */
  taggerServices.factory('CollectionLinkCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/collection/count/linkTypes/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

})();
