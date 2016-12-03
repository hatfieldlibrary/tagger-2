/**
 * Created by mspalti on 12/2/16.
 */

//https://github.com/danialfarid/ng-file-upload
//https://github.com/danialfarid/ng-file-upload/wiki/node.js-example

const convert = function (res, files, fields, config, callback) => {

  const fs = require('fs'),
    magick = require('imagemagick');

  const convert = config.convert,
    identify = config.identify,
    imagePath = config.taggerImageDir;

  magick.identify.path = identify;
  magick.convert.path = convert;

  var imageName;

// read in the temp file from the upload
  fs.readFile(files.file[0].path, function (err, data) {
    if (err !== null) {
      return err;
    }
    imageName = files.file[0].originalFilename;
    id = fields.id;
    if (!imageName) {
      return new Error("Image name not found");

    } else {
      // use imagemagick to transform the full image to thumbnail.
      // write to thumb directory
      var fullPath = imagePath + '/full/' + imageName;
      var thumbPath = imagePath + '/thumb/' + imageName;
      fs.writeFile(fullPath, data, function (err) {
        if (err) {
          return err;
        }
        else {
          magick.resize({
              srcPath: fullPath,
              dstPath: thumbPath,
              width: 200
            },
            /*jshint unused:false */
            function (err, stdout, stderr) {
              if (err) {
                return err;
              }
              // update database even if the conversion fails
              callback(res, id, imageName);
            });
        }
      });
    }
  });
};

module.exports = convert;
