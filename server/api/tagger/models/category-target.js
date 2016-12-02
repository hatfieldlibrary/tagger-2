'use strict';
/**
 * Created by mspalti on 7/14/15.
 */

module.exports = function(sequelize, DataTypes) {

  var CategoryTarget = sequelize.define('CategoryTarget',
    {
      id: {
        type: DataTypes.INTEGER(4),
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          CategoryTarget.belongsTo(models.Category, { onDelete: 'cascade' }) ;
          CategoryTarget.belongsTo(models.Collection, { onDelete: 'cascade' });
        }
      }
    }
  );

  return CategoryTarget;
};
