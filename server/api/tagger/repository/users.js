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

const utils = require('../utils/response-utility');
const taggerDao = require('../dao/users.dao');
const logger = require('../utils/error-logger');

/**
 * Retrieves list of current users.
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.list = function (callback, errorHandler) {

  taggerDao.findAllUsers()
    .then((users) => {
      callback(users);
    })
    .catch((err) => {
      logger.repository(err);
      errorHandler(err);
    });

};

/**
 * Adds a new user.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.add = function (req, callback, errorHandler) {
  const name = req.body.name;
  const email = req.body.email;
  const area = req.body.area;

  taggerDao.createNewUser(name, email, area)
    .then(() => {
      callback();
    })
    .catch(function (err) {
      logger.repository(err);
      errorHandler(err);
    });

};

/**
 * Deletes user.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.delete = function (req, callback, errorHandler) {
  const id = req.params.id;

  taggerDao.deleteUser(id)
    .then(() => {
      callback();
    })
    .catch(function (err) {
      logger.repository(err);
      errorHandler(err);
    });

};

/**
 * Updates user information.
 * @param req
 * @param callback success response callback
 * @param errorHandler failure response callback
 */
exports.update = function (req, callback, errorHandler) {
  const name = req.body.name;
  const email = req.body.email;
  const area = req.body.area;
  const id = req.body.id;

  taggerDao.updateUser(name, email, area, id)
    .then(() => {
      callback({status: 'success'});
    })
    .catch((err) => {
      logger.repository(err);
      errorHandler(err);
    });

};
