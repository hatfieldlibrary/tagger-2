'use strict';
/**
 * Created by mspalti on 7/7/15.
 */

module.exports = function(sequelize, DataTypes) {

  var Category = sequelize.define('Category',
    {
      id: {
        type: DataTypes.INTEGER(2),
        primaryKey: true,
        autoIncrement: true
      },
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
      secondaryUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(4096),
        allowNull: true
      },
      areaId: {
        type: DataTypes.STRING(6),
        allowNull: true
      }
    }, {
      getterMethods: {
        getCollectionObject: function () {
          return {
            'id': this.getDataValue('id'),
            'title': this.getDataValue('title'),
            'url': this.getDataValue('url'),
            'secondaryUrl': this.getDataValue('secondaryUrl'),
            'desc': this.getDataValue('description'),
            'area': this.getDataValue('area')
          };
        }
      },
      setterMethods: {
        name: function (val) {
          this.setDataValue('title', val);
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Category.hasMany((models.CategoryTarget));
        }
      }

    });

  return Category;
};
