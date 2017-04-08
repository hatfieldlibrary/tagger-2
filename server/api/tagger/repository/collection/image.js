/**
 * Created by mspalti on 4/4/17.
 */
'use strict';

const imageConvert = require('../../utils/image-convert');
const taggerDao = require('../../dao/collection-dao');
const logger = require('../../utils/error-logger');

/**
 * Image upload. Reads multipart form data and creates
 * thumbnail image. Writes thumbnail and full size image to
 * directories in the configuration's image path directory.
 * @param req
 * @param config
 * @param callback success response callback
 * @param errorHandler failure response callback

 */
exports.updateImage = function (req, config, callback, errorHandler) {

  const multiparty = require('multiparty');

  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {

    if (err) {
      logger.form(err);
      errorHandler(err);
      //res.end();
    }

    if (files.file !== undefined) {
      try {
        imageConvert(files, fields, config, updateImageInDb);
      } catch (err) {
        logger.image(err);
        errorHandler(err);
        //res.end();
      }
    }
    else {
      logger.missing('No image files were received. Aborting upload.');
      errorHandler(err);
      //res.end();
    }
  });

  /**
   * Updates the data base with new image information.
   * @param id
   * @param imageName
   */
  function updateImageInDb(id, imageName) {
    taggerDao.updateCollectionImage(id, imageName)
      .then(() => {
          callback();
        }
      )
      .catch(function (err) {
        errorHandler(err);
        logger.dao(err);
      });
  }
};
