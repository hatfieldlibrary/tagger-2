'use strict';


const async = require('async');
const utils = require('../utils/response-utility');
const taggerDao = require('../dao/content-dao');

/**
 * Retrieves content type by id
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  const id = req.params.id;

  taggerDao.retrieveContentTypeById(id).then(function (type) {
    utils.sendResponse(res, type);
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves list of all content types
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.getContentTypes().then(function (types) {
    utils.sendResponse(res, types);
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Returns name and frequency for content types in a single
 * area for use in dashboard.
 * @param req
 * @param res
 */
exports.countByArea = function (req, res) {
  const areaId = req.params.areaId;

  taggerDao.getAreaContentTypeSummary(areaId).then(function (types) {
    utils.sendResponse(res, types);
  });

};

/**
 * Adds new content type. First checks to see if it exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const name = req.body.title;

  async.parallel(
    {
      // Check to see if content type already exists.
      check: function (callback) {
        taggerDao.findContentTypesForCollection(name)
          .then(function (result) {
            callback(null, result);
          })
          .catch(function (err) {
            callback(err);
          });
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result.check === null) {
        // Add new content type
        taggerDao.createContentType(name)
          .then(function (result) {
            utils.sendResponse(res, {status: 'success', id: result.id});
          })
          .catch(function (err) {
            console.log(err);
          });

      } else {
        utils.sendResponse(res, {status: 'failure'});
      }
    }
  );
};
/**
 * Updates a content type.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const icon = req.body.icon;

  taggerDao.updateContentType(name, icon, id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    console.log(err);
  });
};

/**
 * Deletes a content type.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const contentId = req.body.id;

  taggerDao.deleteContentType(contentId).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    console.log(err);
  });

};

