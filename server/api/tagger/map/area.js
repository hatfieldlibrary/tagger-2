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

(function() {

  'use strict';

  const logger = require('../utils/error-logger');

  exports.mapAreaList = function(areas) {
    return _mapAreaList(areas);

  };

  exports.mapArea = function(area) {
      return _mapAreaList(area);

  };

  exports.mapAreaCount = function(areas) {
      return _mapAreaListCount(areas);

  };

  exports.mapAreasForCollectionList = function(areas) {
      return _mapAreaForCollectionList(areas);

  };

  function _mapAreaList(areas) {

    let areaArray = [];

    for (let i = 0; i < areas.length; i++) {
      let area = _mapArea(areas[i].dataValues);
      areaArray.push(area);
    }

    return areaArray;

  }
  function _mapArea(areaIn) {

    let area = {
      id: areaIn.id,
      title: areaIn.title,
      url: areaIn.url,
      linkLabel: areaIn.linkLabel,
      image: areaIn.image,
      description: areaIn.description,
      searchUrl: areaIn.searchUrl
    };

    return area;
  }

  function _mapAreaForCollectionList(areas) {

    let areaArray = [];

    for (let i = 0; i < areas.length; i++) {
      let area = _mapAreaForCollection(areas[i]);
      areaArray.push(area);
    }

    return areaArray;
  }

  function _mapAreaListCount(areas) {

    let areaArray = [];
    let count = 0;
    for (let i = 0; i < areas.length; i++) {
      let area = _mapAreaCount(areas[i]);
      areaArray.push(area);
      count += areas[i]['count(*)'];
    }

   // areaArray.unshift({id: 0, title: 'All Collections', count: count});
    return areaArray;

  }

  function _mapAreaCount(areaIn) {

    let area = {
      id: areaIn.id,
      title: areaIn.title,
      count: areaIn['count(*)']
    };

    return area;
  }

  function _mapAreaForCollection(areaIn) {

    let area = {
      AreaId: areaIn.AreaId
    };

    return area;
  }


})();
