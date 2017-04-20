/**
 * Created by mspalti on 4/4/17.
 */
'use strict';

const async = require('async');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Add a subject tag to the collection after first checking
 * whether the association already exists.
 * @param req
 * @param callback success response callbak
 * @param errorHandler failure response callback
 */
exports.addTagTarget = function (req, callback, errorHandler) {
  const collId = req.body.collId;
  const tagId = req.body.tagId;

  async.series(
    {
      check: function (series) {
        taggerDao.checkForExistingTagTarget(collId, tagId)
          .then(function (result) {
            series(null, result);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.dao(err);
        errorHandler(err);
      }
      // if new, add target
      if (result.check === null) {

        taggerDao.addTagTarget(collId, tagId)
          .then(callback({status: 'success'}))
          .catch(function (err) {
            logger.dao(err);
          });

      }
      // otherwise, just inform the client that the association already exists
      else {
        callback({status: 'exists'});
      }

    });

};

/**
 * Removes a subject tag from the collection.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.removeTagTarget = function (req, callback, errorHandler) {
  const collId = req.params.collId;
  const tagId = req.params.tagId;

  taggerDao.deleteTagTarget(collId, tagId)
    .then(() => {
    callback();
  })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });

};
