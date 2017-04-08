/**
 * Created by mspalti on 4/4/17.
 */
'use strict';

const async = require('async');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Adds a content type to the collection metadata after first
 * checking whether the association already exists.
 * @param req
 * @param callback success reponse callback
 * @param errorHandler failure response callback
 */
exports.addTypeTarget = function (req, callback, errorHandler) {
  const collId = req.body.collId;
  const typeId = req.body.typeId;

  async.series({
      check: function (series) {
        taggerDao.findItemContentTarget(collId, typeId)
          .then(function (result) {
            series(null, result);
          });
      }
    },
    function (err, result) {
      if (err) {
        logger.repository(err);
        errorHandler(err);
      }
      if (result.check === null) {
        taggerDao.createItemContentTarget(collId, typeId, errorHandler)
          .then(() => {
            callback({status: 'success'})
          })
          .catch((err) => {
            logger.repository(err);
            errorHandler(err);
          });

      } else {
        callback({status: 'exists'});

      }
    }
  );
};

/**
 * Removes a content type association from the collection.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.removeTypeTarget = function (req, callback, errorHandler) {
  const collId = req.params.collId;
  const typeId = req.params.typeId;

  taggerDao.deleteItemContentTarget(collId, typeId)
    .then(() => {
      callback()
    })
    .catch((err) => {
      logger.dao(err);
      errorHandler(err);
    });

};

