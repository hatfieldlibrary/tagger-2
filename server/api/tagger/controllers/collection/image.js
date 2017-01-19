/**
 * Created by mspalti on 1/17/17.
 */
'use strict';

const utils = require('../../utils/response-utility');
const imageConvert = require('../../utils/image-convert');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Image upload. Reads multipart form data and creates
 * thumbnail image. Writes thumbnail and full size image to
 * directories in the configuration's image path directory.
 * @param req
 * @param res
 * @param config
 */
exports.updateImage = function (req, res, config) {

  const multiparty = require('multiparty');

  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {

    if (err) {
      logger.form(err);
      res.end();
    }

    if (files.file !== undefined) {
      try {
        imageConvert(res, files, fields, config, updateImageInDb);
      } catch (err) {
        logger.image(err);
        res.end();
      }
    }
    else {
      logger.missing('No image files were received. Aborting upload.');
      res.end();
    }
  });

  /**
   * Updates the data base with new image information.
   * @param id
   * @param imageName
   */
  function updateImageInDb(res, id, imageName) {
    taggerDao.updateCollectionImage(id, imageName).then(function () {
        utils.sendSuccessJson(res);
      }
    ).catch(function (err) {
      logger.dao(err);
    });
  }
};
