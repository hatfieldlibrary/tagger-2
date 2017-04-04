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

'use strict';
/**
 * Created by mspalti on 10/13/14.
 */

module.exports =  function(sequelize, DataTypes) {

  var Users =
    sequelize.define('Users',
      {
        id: {
          type: DataTypes.INTEGER(3),
          primaryKey: true,
          autoIncrement: true },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(25),
          allowNull: false
        },
        area: {
          type: DataTypes.INTEGER(2),
          allowNull: false
        }
      });

  return Users;
};
