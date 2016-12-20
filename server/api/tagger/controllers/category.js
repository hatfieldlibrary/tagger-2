'use strict';

const taggerDao = require('../dao/category-dao');
const utils = require('../utils/response-utility');

/**
 * Retrieves the list of all collection groups.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.findAll().then(function (categories) {
    utils.sendResponse(res, categories);
  }).error(function (err) {
    console.log(err);
  });

};

/**
 * Returns collection group title and usage count for dashboard.
 * @param req
 * @param res
 */
exports.categoryCountByArea = function (req, res) {
  var areaId = req.params.areaId;

  taggerDao.categoryCountByArea(areaId).then(function (categories) {
    utils.sendResponse(res, categories);
  }).error(function (err) {
    console.log(err);
  });

};

exports.collectionsByCategory = function (req, res) {
   var collId = req.params.collId;
  taggerDao.categoriesByCollectionId(collId).then(function(categories) {
    utils.sendResponse(res, categories)
  })
};

/**
 * Retrieves list of collection groups by area.
 * @param req
 * @param res
 */
exports.listByArea = function (req, res) {
  var areaId = req.params.areaId;

  taggerDao.listByArea(areaId).then(function (categories) {
    utils.sendResponse(res, categories);
  }).error(function (err) {
    console.log(err);
  });
};

/**
 * Retrieves single collection group information by category id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  var categoryId = req.params.id;

  taggerDao.byId(categoryId).then(function (category) {
    utils.sendResponse(res, category);
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Adds a new collection group with title.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  var title = req.body.title;

  taggerDao.add(title).then(function (result) {
    utils.sendResponse(res, {status: 'success', id: result.id});
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Updates collection group.
 * @param req
 * @param res
 */
exports.update = function (req, res) {

  var title = req.body.title;
  var url = req.body.url;
  var description = req.body.description;
  var linkLabel = req.body.linkLabel;
  var id = req.body.id;
  var areaId = req.body.areaId;

  const data =  {
    title: title,
    url: url,
    linkLabel: linkLabel,
    description: description,
    areaId: areaId
  };

  taggerDao.update(data, id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Deletes collection group.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {

  var catId = req.body.id;

  taggerDao.delete(catId).then(function () {
    utils.sendResponse(res, {status: 'success', id: catId});
  }).catch(function (err) {
    console.log(err);
  });

};







