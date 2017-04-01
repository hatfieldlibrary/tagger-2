(function() {

  'use strict';

  exports.mapAreaList = function(areas) {
    return _mapAreaList(areas);
  };

  exports.mapArea = function(area) {
    return _mapArea(area);
  };

  exports.mapAreaCount = function(areas) {
    return _mapAreaListCount(areas);
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
      searchUrl: areaIn.searchUrl,
      desc: areaIn.description
    };

    return area;
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

})();
