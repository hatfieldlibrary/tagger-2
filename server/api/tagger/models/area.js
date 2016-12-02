'use strict';
/**
 * Created by mspalti on 7/7/15.
 */

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
