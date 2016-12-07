'use strict';

const taggerDao = require('../dao/area-dao');
const utils = require('../utils/response-utility');

/**
 * Retrieves area information by area id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  const areaId = req.params.id;

  taggerDao.findAreaById(areaId).then(function (areas) {
    utils.sendResponse(res, areas);

  }).catch(
    function (err) {
      console.log(err);
    });
};

/**
 * Retrieves a list of all areas.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.listAllAreas().then(function (areas) {
    utils.sendResponse(res, areas);

  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Adds new area, setting the area position to the
 * end of the current area list.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const title = req.body.title;

  // the area count function has been changed to return the count.
  taggerDao.getAreaCount()
    .then(function (result) {
      taggerDao.addArea(title, result.count + 1)
        .then(
          function () {
            utils.sendResponse(res, {status: 'success'});
          })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });

};

/**
 * Updates an existing area.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const title = req.body.title;
  const url = req.body.url;
  const searchUrl = req.body.searchUrl;
  const description = req.body.description;
  const linkLabel = req.body.linkLabel;
  const id = req.body.id;

  const data = {
    title: title,
    url: url,
    linkLabel: linkLabel,
    searchUrl: searchUrl,
    description: description
  };

  taggerDao.Area.updateArea(data, id)
    .then(function (result) {
      utils.sendResponse(res, {status: 'success', id: result.id});
    }).catch(
    function (err) {
      console.log(err);
    });
};

/**
 * Updates area position to new value based on the
 * order of the new array passed in via POST. The new position
 * can be used to order query results for clients (order by position).
 * @param req
 * @param res
 */
exports.reorder = function (req, res) {
  const areas = req.body.areas;
  const areaCount = areas.length;

  taggerDao.reorder(areas, areaCount)
    .then(function () {
      utils.sendResponse(res, {status: 'success'});
    })
    .catch(function (err) {
      console.log(err);
    });
};

/**
 * Delete an area.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.body.id;

  taggerDao.deleteArea(id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(
    function (err) {
      console.log(err);
    });

};


