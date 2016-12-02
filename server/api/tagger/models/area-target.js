'use strict';
/**
 * Created by mspalti on 5/29/14.
 */

module.exports = function(sequelize, DataTypes) {

  var AreaTarget = sequelize.define('AreaTarget',
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
          AreaTarget.belongsTo(models.Area, { onDelete: 'cascade' }) ;
          AreaTarget.belongsTo(models.Collection, { onDelete: 'cascade' });
        }
      }
    }
  );

  return AreaTarget;
};
