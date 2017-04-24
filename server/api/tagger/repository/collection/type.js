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

