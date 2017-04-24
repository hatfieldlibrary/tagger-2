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
 * Created by mspalti on 12/19/16.
 */
(function () {
  'use strict';

  function OverviewController(AreaObservable,
                              AreaById,
                              CollectionsByArea,
                              CategoryCountByArea,
                              ContentTypeCount,
                              TagCountForArea) {

    const ctrl = this;

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
        let catCount = 0;
        let data = [];
        for (let i = 0; i < categories.length; i++) {
          catCount = catCount + categories[i].count;
        }
        for (let i = 0; i < categories.length; i++) {
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
        let count = 0;
        let data = [];
        for (let i = 0; i < types.length; i++) {
          count = count + types[i].count;
        }
        for (let i = 0; i < types.length; i++) {
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
      let subs = TagCountForArea.query({areaId: areaId});
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
      let areaId = AreaObservable.get();
      _setCollections(areaId);
      _getCategories(areaId);
      _getTypes(areaId);
      _getTagCounts(areaId);
      _getAreaInfo(areaId);
    };

    ctrl.$onInit = () => {

      AreaObservable.subscribe((areaId) => {
        _setCollections(areaId);
        _getCategories(areaId);
        _getTypes(areaId);
        _getTagCounts(areaId);
        _getAreaInfo(areaId);
      });

    };

  }

  taggerComponents.component('overviewComponent', {

    templateUrl: 'templates/component/overview.html',
    controller: OverviewController
  });

})();
