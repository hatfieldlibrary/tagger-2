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

'use strict';

var taggerContext = angular.module('taggerContext', []);

(function() {

  /**
   * Returns singleton object used to share state
   * among controllers. Controllers update fields
   * whenever a change needs to propagate and $watch
   * for updates to fields of interest.
   */
  taggerContext.factory('Data', function () {
    return {
      areas: [],
      areaLabel: '',
      currentAreaIndex: null,
      currentCategoryIndex: null,
      categories: [],
      categoriesForArea: [],
      currentContentIndex: null,
      contentTypes: [],
      contentTypesForArea: [],
      tags: [],
      currentTagIndex: null,
      currentTagAreaId: null,
      collections: [],
      initialCollection: {},
      collectionsTotal: 0,
      collectionTypeTotal: 0,
      searchOptionsTotal: 0,
      collectionLinksTotal: 0,
      currentCollectionIndex: null,
      currentThumbnailImage: null,
      tagsForArea: [],
      tagsForCollection: [],
      typesForCollection: [],
      userAreaId: null,
      isAuth: false,
      user: null
    };
  });

})();



