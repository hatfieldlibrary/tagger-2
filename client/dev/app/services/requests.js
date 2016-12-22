(function () {

  'use strict';


  taggerServices.factory('getUserInfo', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'userinfo', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('UserList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/list');
    }
  ]);

  taggerServices.factory('UserAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/add');
    }
  ]);

  taggerServices.factory('UserDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/delete');
    }
  ]);

  taggerServices.factory('UserUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'users/update');
    }
  ]);

  taggerServices.factory('FirstCollectionInArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/first/inArea/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('SearchOptionType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/repoTypeByArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('CollectionTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/count/types/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('UpdatePublicationStatus', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/pubstatus/:status', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('GetPublicationStatus', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/pubstatus', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('CollectionLinkCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/count/linkTypes/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('CollectionsByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/show/list/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('CollectionById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('CollectionAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/add');
    }
  ]);

  taggerServices.factory('CollectionDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/delete');
    }
  ]);

  taggerServices.factory('CollectionUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/update');
    }
  ]);

  taggerServices.factory('AreasForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/areas/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('TagsForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/tags/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('TypesForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/types/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('AreaTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('AreaTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

  taggerServices.factory('CollectionTagTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/tag/:tagId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('CollectionTagTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/tag/:tagId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

  taggerServices.factory('CollectionTypeTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/remove/type/:typeId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

  taggerServices.factory('CollectionTypeTargetAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'collection/:collId/add/type/:typeId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

// AREAS

  taggerServices.factory('AreaList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'areas', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('AreaById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('AreaAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/add');
    }
  ]);

  taggerServices.factory('AreaDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/delete');
    }
  ]);

  taggerServices.factory('ReorderAreas', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/reorder');
    }
  ]);

  taggerServices.factory('AreaUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'area/update');
    }
  ]);

// CATEGORY

  taggerServices.factory('Category', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('CategoriesByCollection', ['$resource', 'config',
  function ($resource, config) {
    return $resource(config.restHost + 'category/getCollections/:collId', {}, {
      query: {method: 'GET', isArray: true}
    });
  }]);

  taggerServices.factory('CategoryList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('CategoryByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

  taggerServices.factory('CategoryCountByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

  taggerServices.factory('CategoryUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/update');
    }
  ]);

  taggerServices.factory('CategoryAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/add');
    }
  ]);

  taggerServices.factory('CategoryDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'category/delete');
    }
  ]);

// CONTENT TYPE

  taggerServices.factory('ContentTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/byArea/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('ContentType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('ContentTypeList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('ContentTypeAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'content/add');
    }
  ]);

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

  taggerServices.factory('TagCountForArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tags/count/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

  taggerServices.factory('TagsForArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tags/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

  taggerServices.factory('TagById', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('TagList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);

  taggerServices.factory('TagAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/add');
    }
  ]);

  taggerServices.factory('TagDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/delete');
    }
  ]);

  taggerServices.factory('TagUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/update');
    }
  ]);

// Tag area services

  taggerServices.factory('TagTargetAdd', ['$resource', 'config',

    function ($resource, config) {
      return $resource(config.restHost + 'tag/:tagId/add/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);

  taggerServices.factory('TagTargetRemove', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/:tagId/remove/area/:areaId', {}, {
        query: {method: 'GET', isArray: false}
      });
    }]);

  taggerServices.factory('TagTargets', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 'tag/targets/byId/:tagId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);

})();
