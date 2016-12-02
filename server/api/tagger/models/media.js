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
      },  {
        classMethods: {
          associate: function(models) {
            ItemContent.belongsTo(models.ItemContentTarget);
          }
        }
      });

  return ItemContent;
};
