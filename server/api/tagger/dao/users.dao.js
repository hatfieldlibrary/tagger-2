/*
 * Copyright (c) 2016.
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
 * Created by mspalti on 12/1/16.
 */

// jshint strict:false

const taggerSchema = require('../schema/index');
const logger = require('../utils/error-logger');
const path = require('path');
const filename = path.basename(__filename);
const paramErrorMessage = 'A parameter for a user query is not defined.';
const taggerDao = {};

/**
 * Returns 500 error for missing parameter. This error is thrown
 * before the dao promise is returned.
 * @returns {Error}
 * @private
 */
function _errorResponse() {
  let error = new Error('Error: missing query parameter - ' + filename);
  error.status = 500;
  return error;
}

taggerDao.findAllUsers = () => {

  return taggerSchema.Users.findAll({
      attributes:['id','name','email', 'area'],
      order: [['name', 'ASC']],
    }
  );

};


taggerDao.createNewUser = (name, email, area) => {

  if(!name || !email || !area) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Users.create({
      name: name,
      email: email,
      area: area
    }
  );
};

taggerDao.deleteUser = (id) => {

  if(!id) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Users.destroy({
    where: {
      id: id
    }
  });

};

taggerDao.updateUser = (name, email, area, id) => {

  if(!name || !email || !area) {
    logger.dao(paramErrorMessage);
    throw _errorResponse();
  }

  return taggerSchema.Users.update({
      name: name,
      email: email,
      area: area
    },
    {
      where: {
        id: id
      }
    });
};

module.exports = taggerDao;
