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

'use strict';

module.exports = function(sequelize, DataTypes) {

  var Area = sequelize.define('Area',
    {
      id: {
        type: DataTypes.INTEGER(2),
        primaryKey: true,
        autoIncrement: true},
      title: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      linkLabel: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      searchUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(4096),
        allowNull: true
      },
      position: {
        type: DataTypes.INTEGER(3),
        allowNull: false
      }
    },  {
      getterMethods: {
        getCollectionObject: function() {
          return {
            'id': this.getDataValue('id'),
            'title': this.getDataValue('title'),
            'url': this.getDataValue('url'),
            'searchUrl': this.getDataValue('searchUrl'),
            'desc': this.getDataValue('description')
          };
        }
      },
      setterMethods: {
        name: function(val) {
          this.setDataValue('title', val);
        }
      }
    });

  return Area;
};
