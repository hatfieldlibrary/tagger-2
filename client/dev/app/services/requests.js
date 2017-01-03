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
 * These factory services provide the Angular resources needed for
 * REST API requests.
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

  // COLLECTION
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
   * Resource for getting summary information for search option types
   * by area.
   */
  taggerServices.factory('SearchOptionType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/repoTypeByArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting collection summary information by area.
   */
  taggerServices.factory('CollectionTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/count/types/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting link type summary information by area.
   */
  taggerServices.factory('CollectionLinkCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/count/linkTypes/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
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

  // AREA
  /**
   * Resource for getting a list of areas.
   */
  taggerServices.factory('AreaList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'areas', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting area information by area id.
   */
  taggerServices.factory('AreaById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for adding an area via POST.
   */
  taggerServices.factory('AreaAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/add');
    }
  ]);
  /**
   * Resource for deleting an area via POST.
   */
  taggerServices.factory('AreaDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/delete');
    }
  ]);
  /**
   * Resource for reordering areas via POST.
   */
  taggerServices.factory('ReorderAreas', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/reorder');
    }
  ]);
  /**
   * Resource for updating and area via POST.
   */
  taggerServices.factory('AreaUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/update');
    }
  ]);

  // CATEGORY (Collection Group)
  /**
   * Resource for getting category (a.k.a collection group) by it's id.
   */
  taggerServices.factory('Category', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting categories for a collection.
   */
  taggerServices.factory('CategoriesByCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/getCollections/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Resource for getting list of all categories.
   */
  taggerServices.factory('CategoryList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting categories or a specific area.
   */
  taggerServices.factory('CategoryByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   *  Resource for getting summary information on categories for a specific area.
   */
  taggerServices.factory('CategoryCountByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Resource for updating a category via POST.
   */
  taggerServices.factory('CategoryUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/update');
    }
  ]);
  /**
   * Resource for Adding a category via POST.
   */
  taggerServices.factory('CategoryAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/add');
    }
  ]);
  /**
   * Resource for deleting a category via POST.
   */
  taggerServices.factory('CategoryDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/delete');
    }
  ]);

  // CONTENT TYPE
  /**
   *  Resource for getting summary information on content types for a specific area.
   */
  taggerServices.factory('ContentTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/byArea/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting content type by it's id.
   */
  taggerServices.factory('ContentType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting list of all content types.
   */
  taggerServices.factory('ContentTypeList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for adding a content type via POST.
   */
  taggerServices.factory('ContentTypeAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/add');
    }
  ]);
  /**
   * Resource for deleting a content type via POST.
   */
  taggerServices.factory('ContentTypeDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/delete');
    }
  ]);
  /**
   * Resource for updating a content type via POST.
   */
  taggerServices.factory('ContentTypeUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/update');
    }
  ]);

  // TAG
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

  // TAG-AREA ASSOCIATIONS
  /**
   * Resource for adding a tag to an area.
   */
  taggerServices.factory('TagTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/:tagId/add/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for removing a tag from an area.
   */
  taggerServices.factory('TagTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/:tagId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Resource return a list of areas to which a tag has been assigned.
   */
  taggerServices.factory('TagTargets', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/targets/byId/:tagId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

})();
