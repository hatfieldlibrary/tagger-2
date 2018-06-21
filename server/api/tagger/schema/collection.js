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
 * Created by mspalti on 5/23/14.
 */

module.exports = function (sequelize, DataTypes) {

  var Collection = sequelize.define('Collection',
    {
      id: {
        type: DataTypes.INTEGER(4),
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(80),
        allowNull: false,
        defaultValue: 'no_image.jpg'
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      searchUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      /**
       * Indicates the type of collection browsing option
       * (static link or pull down menu)
       */
      browseType: {
        type: DataTypes.STRING(4),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(4096),
        allowNull: true
      },
      dates: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      items: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      /**
       * Indicates the collection type (item,
       * collection, or finding aid.
       */
      ctype: {
        type: DataTypes.STRING(3),
        allowNull: true
      },
      /**
       * Indicates whether the data source provides search query access,
       * a direct link (canned query), or both.
       */
      repoType: {
        type: DataTypes.STRING(7),
        //defaultValue: 'DEFAULT',
        allowNull: true
      },
      parent: {
        type: DataTypes.STRING(240),
        allowNull: false
      },
      /**
       * Indicates whether the collection is public access or restricted.
       */
      restricted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      /**
       * Indicates whether the collection is published by setting
       * the flag to true.  As of 10/20/2015, this is unused but available
       * for future use.
       */
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      getterMethods: {
        getCollectionObject: function () {
          return {
            'id': this.getDataValue('id'),
            'title': this.getDataValue('title'),
            'url': this.getDataValue('url'),
            'browseType': this.getDataValue('browseType'),
            'image': this.getDataValue('image'),
            'desc': this.getDataValue('description'),
            'dates': this.getDataValue('dates'),
            'items': this.getDataValue('items'),
            'ctype': this.getDataValue('ctype'),
            'repoType': this.getDataValue('repoType'),
            'categoryId': this.getDataValue('categoryId'),
            'restricted': this.getDataValue('restricted'),
            'published': this.getDataValue('published')
          };
        }
      },
      setterMethods: {
        name: function (val) {
          this.setDataValue('title', val);
        }
      }
    });

  Collection.associate = function (models) {
    Collection.hasMany(models.TagTarget);
    Collection.hasMany(models.ItemContentTarget);
    Collection.hasMany(models.AreaTarget);
    Collection.hasOne((models.CategoryTarget));
  };

  return Collection;
};
