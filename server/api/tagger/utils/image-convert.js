/*
 * Copyright (c) 2017.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 12/2/16.
 */

//https://github.com/danialfarid/ng-file-upload
//https://github.com/danialfarid/ng-file-upload/wiki/node.js-example


'use strict';

const convert = (files, fields, config) => {

  const fs = require('fs'),
    magick = require('imagemagick');

  const magicConvert = config.convert,
    identify = config.identify,
    imagePath = config.taggerImageDir;

  magick.identify.path = identify;
  magick.convert.path = magicConvert;

  let imageName;

// read in the temp file from the upload
  fs.readFile(files.file[0].path, function (err, data) {
    if (err !== null) {
      return err;
    }
    imageName = files.file[0].originalFilename;
    let id = fields.id;
    if (!imageName) {
      return new Error('Image name not found');

    } else {
      // use imagemagick to transform the full image to thumbnail.
      // write to thumb directory
      let fullPath = imagePath + '/full/' + imageName;
      let thumbPath = imagePath + '/thumb/' + imageName;
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
              callback(id, imageName);
            });
        }
      });
    }
  });
};

module.exports = convert;
