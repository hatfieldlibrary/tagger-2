/**
 * Created by mspalti on 1/17/17.
 */
'use strict';

const async = require('async');
const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Adds a content type to the collection metadata after first
 * checking whether the association already exists.
 * @param req
 * @param res
 */
exports.addTypeTarget = function (req, res) {
  const collId = req.body.collId;
  const typeId = req.body.typeId;

  async.series({
      check: function (callback) {
        taggerDao.findItemContentTarget(collId, typeId).then(function (result) {
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
      if (result.check === null) {

        taggerDao.createItemContentTarget(collId, typeId).then(function () {
          utils.sendResponse(res, {status: 'success'});
        }).catch(function (err) {
          logger.dao(err);
        });

      } else {
        utils.sendResponse(res, {status: 'exists'});

      }
    }
  );
};

/**
 * Removes a content type association from the collection.
 * @param req
 * @param res
 */
exports.removeTypeTarget = function (req, res) {
  const collId = req.params.collId;
  const typeId = req.params.typeId;

  taggerDao.deleteItemContentTarget(collId, typeId).then(function () {
    utils.sendSuccessJson(res);
  }).catch(function (err) {
    logger.dao(err);
  });

};

