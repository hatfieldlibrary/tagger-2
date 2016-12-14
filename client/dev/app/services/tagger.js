/**
 * Tagger UI directives.
 */
(function () {

  'use strict';


  /**
   * D3 service lazyloads the d3 script and
   * calls onScriptLoad function when ready.
   * Note that the path to the javascript
   * library is hardcoded.  It should be injected
   * into this service or perhaps configured via
   * the provider in app.js.
   */
  taggerServices.factory('d3Service', [
    '$document',
    '$q',
    '$rootScope',
    function ($document,
              $q,
              $rootScope) {

      var d = $q.defer();

      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function () {
          d.resolve(window.d3);
        });
      }

      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = '/bower_components/d3/d3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') {
          onScriptLoad();
        }
      };
      scriptTag.onload = onScriptLoad;
      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
      return {
        d3: function () {
          return d.promise;
        }
      };

    }]);


  /**
   * ngResource services
   */


  taggerServices.factory('getUserInfo', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'userinfo', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: users.list
   */
  taggerServices.factory('UserList', ['$resource', 'config',
    function ($resource, config) {
      console.log(config);
      return $resource(config.restHost + 'users/list');
    }
  ])
  ;
  /**
   * Maps to controller: users.add
   */
  taggerServices.factory('UserAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/add');
    }
  ]);
  /**
   * Maps to controller: users.delete
   */
  taggerServices.factory('UserDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/delete');
    }
  ]);
  /**
   * Maps to controller: users.update
   */
  taggerServices.factory('UserUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/update');
    }
  ]);
  /**
   * Maps to controller: collection.repoTypeByArea
   */
  taggerServices.factory('SearchOptionType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/repoTypeByArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.countCTypesByArea
   */
  taggerServices.factory('CollectionTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/count/types/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.browseTypesByArea
   */
  taggerServices.factory('CollectionLinkCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/count/linkTypes/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.list
   */
  taggerServices.factory('CollectionsByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/show/list/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.byId
   */
  taggerServices.factory('CollectionById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: collection.add
   */
  taggerServices.factory('CollectionAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/add');
    }
  ]);
  /**
   * Maps to controller: collection.delete
   */
  taggerServices.factory('CollectionDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/delete');
    }
  ]);
  /**
   * Maps to controller: collection.update
   */
  taggerServices.factory('CollectionUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/update');
    }
  ]);
  /**
   * Maps to controller: collection.areas
   */
  taggerServices.factory('AreasForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/areas/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.tagsForCollection
   */
  taggerServices.factory('TagsForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/tags/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.typesForCollection
   */
  taggerServices.factory('TypesForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/types/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: collection.addAreaTarget
   */
  taggerServices.factory('AreaTargetAdd', ['$resource', 'config',

    function Resource($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: collection.removeAreaTarget
   */
  taggerServices.factory('AreaTargetRemove', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Maps to controller: collection.addTagTarget
   */
  taggerServices.factory('CollectionTagTargetAdd', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/tag/:tagId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: collection.removeTagTarget
   */
  taggerServices.factory('CollectionTagTargetRemove', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/tag/:tagId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Maps to controller: collection.removeTypeTaget
   */
  taggerServices.factory('CollectionTypeTargetRemove', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/type/:typeId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Maps to controller: collection.addTypeTarget
   */
  taggerServices.factory('CollectionTypeTargetAdd', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/type/:typeId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

// AREAS

  /**
   * Maps to controller: areas.list
   */
  taggerServices.factory('AreaList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'areas', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: areas.byId
   */
  taggerServices.factory('AreaById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: areas.add
   */
  taggerServices.factory('AreaAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/add');
    }
  ]);
  /**
   * Maps to controller: areas.delete
   */
  taggerServices.factory('AreaDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/delete');
    }
  ]);
  /**
   * Maps to controller: areas.reorder
   */
  taggerServices.factory('ReorderAreas', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/reorder');
    }
  ]);
  /**
   * Maps to controller: areas.update
   */
  taggerServices.factory('AreaUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/update');
    }
  ]);

// CATEGORY

  /**
   * Maps to controller: category.byId
   */
  taggerServices.factory('Category', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: category.list
   */
  taggerServices.factory('CategoryList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: category.listByArea
   */
  taggerServices.factory('CategoryByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Maps to controller: category.categoryCountByArea
   */
  taggerServices.factory('CategoryCountByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Maps to controller: category.update
   */
  taggerServices.factory('CategoryUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/update');
    }
  ]);
  /**
   * Maps to controller: category.add
   */
  taggerServices.factory('CategoryAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/add');
    }
  ]);
  /**
   * Maps to controller: category.delete
   */
  taggerServices.factory('CategoryDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/delete');
    }
  ]);

// CONTENT TYPE

  /**
   * Maps to controller: content.countByArea
   */
  taggerServices.factory('ContentTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/byArea/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: content.byId
   */
  taggerServices.factory('ContentType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: content.list
   */
  taggerServices.factory('ContentTypeList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: content.add
   */
  taggerServices.factory('ContentTypeAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/add');
    }
  ]);
  /**
   * Maps to controller: content.delete
   */
  taggerServices.factory('ContentTypeDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/delete');
    }
  ]);

  taggerServices.factory('ContentTypeUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/update');
    }
  ]);

// TAG
  /**
   * Maps to controller: tags.tagByAreaCount
   */
  taggerServices.factory('TagCountForArea', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'tags/count/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Maps to controller: tags.tagByArea
   */
  taggerServices.factory('TagsForArea', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'tags/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Maps to controller: tags.byId
   */
  taggerServices.factory('TagById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: tags.list
   */
  taggerServices.factory('TagList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Maps to controller: tags.add
   */
  taggerServices.factory('TagAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/add');
    }
  ]);
  /**
   * Maps to controller: tags.delete
   */
  taggerServices.factory('TagDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/delete');
    }
  ]);
  /**
   * Maps to controller: tags.update
   */
  taggerServices.factory('TagUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/update');
    }
  ]);

// Tag area services

  /**
   * Maps to controller: tagTarget.addTarget
   */
  taggerServices.factory('TagTargetAdd', ['$resource', 'config',

    function Resource($resource, config) {
      return $resource(config.restHost + 'tag/:tagId/add/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Maps to controller: tags.removeTarget
   */
  taggerServices.factory('TagTargetRemove', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'tag/:tagId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);
  /**
   * Maps to controller: tags.getAreaTarget
   */
  taggerServices.factory('TagTargets', ['$resource', 'config',
    function Resource($resource, config) {
      return $resource(config.restHost + 'tag/targets/byId/:tagId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);


})();
