(function() {

  'use strict';

  const logger = require('../utils/error-logger');

  exports.mapAreaList = function(areas) {
    return _mapAreaList(areas);

  };

  exports.mapArea = function(area) {
      return _mapArea(area);

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
      description: areaIn.description,
      searchUrl: areaIn.searchUrl,
      desc: areaIn.description
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

    for (let i = 0; i < areas.length; i++) {
      let area = _mapAreaCount(areas[i]);
      areaArray.push(area);
    }

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
