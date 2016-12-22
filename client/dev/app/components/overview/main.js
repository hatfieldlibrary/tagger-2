/**
 * Created by mspalti on 12/19/16.
 */
(function () {
  'use strict';

  function OverviewController(AreaObserver,
                              AreaById,
                              CollectionsByArea,
                              CategoryCountByArea,
                              ContentTypeCount,
                              TagCountForArea) {

    const ctrl = this;

    AreaObserver.subscribe(() => {
      let areaId = AreaObserver.get();
      _setCollections(areaId);
      _getCategories(areaId);
      _getTypes(areaId);
      _getTagCounts(areaId);
      _getAreaInfo(areaId);
    });

    function _setCollections(areaId) {
      let collections = CollectionsByArea.query({areaId: areaId});
      collections.$promise.then((data) => {
        ctrl.collectionCount = data.length;
      });
    }

    function _getCategories(areaId) {
      ctrl.categoriesReady = false;
      let categories = CategoryCountByArea.query({areaId: areaId});
      categories.$promise.then((categories) => {
        var catCount = 0;
        var data = [];
        for (var i = 0; i < categories.length; i++) {
          catCount = catCount + categories[i].count;
        }
        for (i = 0; i < categories.length; i++) {
          data[i] = {title: categories[i].title, value: categories[i].count};
        }
        ctrl.categoryCounts = {
          total: catCount,
          data: data
        };
        ctrl.categoriesReady = true;

      });

    }

    ctrl.getCategoryCounts = function () {
      return ctrl.categoryCounts;
    };

    function _getTypes(areaId) {
      ctrl.typesReady = false;
      const contentTypeCount = ContentTypeCount.query({areaId: areaId});
      contentTypeCount.$promise.then(function (types) {
        var count = 0;
        var data = [];
        for (var i = 0; i < types.length; i++) {
          count = count + types[i].count;
        }
        for (i = 0; i < types.length; i++) {
          data[i] = {title: types[i].name, value: types[i].count};
        }
        ctrl.typeCounts = {
          total: count,
          data: data
        };
        ctrl.typesReady = true;
      });

    }

    function _getTagCounts(areaId) {
      ctrl.subjectsReady = false;
      var subs = TagCountForArea.query({areaId: areaId});
      subs.$promise.then(function (data) {
        ctrl.subjects = data;
        ctrl.subjectsReady = true;
      });

    }

    function _getAreaInfo(areaId) {
      const area = AreaById.query({id: areaId});
      area.$promise.then((data) => {
        ctrl.areaLabel = data.title;
        ctrl.areaId = areaId;
      });
    }

    ctrl.$postLink = function () {
      ctrl.collectionCount = 0;
      let areaId = AreaObserver.get();
      _setCollections(areaId);
      _getCategories(areaId);
      _getTypes(areaId);
      _getTagCounts(areaId);
      _getAreaInfo(areaId);
    };

  }

  taggerComponents.component('overviewComponent', {

    templateUrl: 'templates/component/overview.html',
    controller: OverviewController
  });

})();
