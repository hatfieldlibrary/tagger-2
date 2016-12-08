'use strict';

/**
 * Created by mspalti on 5/23/14.
 */

const async = require('async');
const utils = require('../utils/response-utility');
const taggerDao = require('../dao/tags-dao');


/**
 * Retrieves a list of all tags.
 * @param req
 * @param res
 */
exports.list = function (req, res) {

  taggerDao.findAllTags().then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves tag information by tag id.
 * @param req
 * @param res
 */
exports.byId = function (req, res) {
  const id = req.params.id;

  taggerDao.findTagById(id).then(function (tag) {
    utils.sendResponse(res, tag);
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Retrieves list of tags associated with an area. Query
 * by area id.
 * @param req
 * @param res
 */
exports.tagByArea = function (req, res) {

  var areaId = req.params.areaId;

  taggerDao.findTagsInArea(areaId).then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    console.log(err);
  });
};


/**
 * Retrieves tag name and use count by area id.
 * @param req
 * @param res
 */
exports.tagByAreaCount = function (req, res) {

  var areaId = req.params.areaId;

  taggerDao.getTagCountByArea(areaId).then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    console.log(err);
  });
};


/**
 * Adds a new tag.  First checks to see if tag with this name already
 * exists.
 * @param req
 * @param res
 */
exports.add = function (req, res) {
  const name = req.body.name;

  async.parallel(
    {
      // Check to see if content type already exists.
      check: function (callback) {
        taggerDao.findTagByName(name).then(function (result) {
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
        taggerDao.createTag(name).then(function (result) {
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
 * Update the tag name.
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  const id = req.body.id;
  const name = req.body.name;

  taggerDao.updateTag(name, id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  }).catch(function (err) {
    console.log(err);
  });

};

/**
 * Delete the tag.
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  const id = req.body.id;

  taggerDao.deleteTag(id).then(function () {
    utils.sendResponse(res, {status: 'success'});
  });

};


/**
 * Retrieves a list of subjects by area for the public API.
 * @param req
 * @param res
 */
exports.subjectsByArea = function (req, res) {
  const id = req.params.id;

  taggerDao.findTagsInArea(id).then(function (tags) {
    utils.sendResponse(res, tags);
  }).catch(function (err) {
    console.log(err);
  });

};

