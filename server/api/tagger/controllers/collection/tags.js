/**
 * Created by mspalti on 1/17/17.
 */
'use strict';

const async = require('async');
const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Add a subject tag to the collection after first checking
 * whether the association already exists.
 * @param req
 * @param res
 */
exports.addTagTarget = function (req, res) {
  const collId = req.body.collId;
  const tagId = req.body.tagId;

  async.series(
    {
      check: function (callback) {

        taggerDao.checkForExistingTagTarget(collId, tagId)
          .then(function (result) {
            callback(null, result);
          }).catch(function (err) {
          logger.dao(err);
        });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
      }
      // if new, add target
      if (result.check === null) {

        taggerDao.addTagTarget(collId, tagId)
          .then(function () {
            utils.sendResponse(res, {status: 'success'});
          }).catch(function (err) {
          logger.dao(err);
        });

      } else {
        utils.sendResponse(res, {status: 'exists'});
      }

    });

};

/**
 * Removes a subject tag from the collection.
 * @param req
 * @param res
 */
exports.removeTagTarget = function (req, res) {
  const collId = req.params.collId;
  const tagId = req.params.tagId;

  taggerDao.deleteTagTarget(collId, tagId).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};
