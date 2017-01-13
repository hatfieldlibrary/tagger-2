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

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.findAllUsers = () => {

  return taggerSchema.Users.findAll({
      attributes:['id','name','email', 'area'],
      order: [['name', 'ASC']],
    }
  );

};


taggerDao.createNewUser = (name, email, area) => {

  return taggerSchema.Users.create({
      name: name,
      email: email,
      area: area
    }
  );
};

taggerDao.deleteUser = (id) => {

  return taggerSchema.Users.destroy({
    where: {
      id: id
    }
  });

};

taggerDao.updateUser = (name, email, area, id) => {

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
