/**
 * Created by mspalti on 1/9/17.
 */

'use strict';

const utils = require('../../utils/response-utility');
const taggerDao = require('../../dao/collection-dao');
const logger = require('winston');

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
    logger.log('warn', err.message);
    utils.sendErrorJson(res, err);
  });

};