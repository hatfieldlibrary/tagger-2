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
/**
 * Created by mspalti on 8/1/14.
 */

module.exports =  function(sequelize, DataTypes) {

  var ItemContent =
    sequelize.define('ItemContent',
      {
        id: {
          type: DataTypes.INTEGER(4),
          primaryKey: true,
          autoIncrement: true },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false
        },
        icon: {
          type: DataTypes.STRING(50)
        }
      },  {
        getterMethods: {
          getContentObject: function() {
            return {'id': this.getDataValue('id'), 'name': this.getDataValue('name'), 'icon': this.getDataValue('icon')};
          }
        },
        setterMethods: {
          name: function(val) {
            this.setDataValue('name', val);
          },
          icon: function(val) {
            this.setDataValue('icon', val);
          }
        }
      });

  ItemContent.associate = function(models) {
    ItemContent.hasMany(models.ItemContentTarget);
  };

  return ItemContent;
};
