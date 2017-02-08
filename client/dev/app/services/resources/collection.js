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

/**
 * Resources for collection REST requests.
 */
(function() {

  'use strict';

  /**
   * Resource fetching the first collection in the area.
   */
  taggerServices.factory('FirstCollectionInArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/first/inArea/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  /**
   * Resource for updating a collection's publication status.
   */
  taggerServices.factory('UpdatePublicationStatus', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/pubstatus/:status', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting a collection's publication status.
   */
  taggerServices.factory('GetPublicationStatus', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/pubstatus', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting the collections in an area.
   */
  taggerServices.factory('CollectionsByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/show/list/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting collection information by collection id.
   */
  taggerServices.factory('CollectionById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for adding a collection via POST.
   */
  taggerServices.factory('CollectionAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/add');
    }
  ]);
  /**
   * Resource for deleting a collection via POST.
   */
  taggerServices.factory('CollectionDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/delete');
    }
  ]);
  /**
   * Resource for updating a collection via POST.
   */
  taggerServices.factory('CollectionUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/update');
    }
  ]);
  /**
   * Resource for getting the areas to which a collection belongs.
   */
  taggerServices.factory('AreasForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/areas/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting the tags for a collection.
   */
  taggerServices.factory('TagsForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/tags/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting the types for a collection.
   */
  taggerServices.factory('TypesForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/types/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for adding a collection to an area.
   */
  taggerServices.factory('AreaTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for removing a collection from an area.
   */
  taggerServices.factory('AreaTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Resource for adding a tag to a collection.
   */
  taggerServices.factory('CollectionTagTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/tag/:tagId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for removing a tag from a collection.
   */
  taggerServices.factory('CollectionTagTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/tag/:tagId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Resource for removing a content type from a collection.
   */
  taggerServices.factory('CollectionTypeTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/type/:typeId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Resource for adding a content type to a collection.
   */
  taggerServices.factory('CollectionTypeTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/type/:typeId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

})();
