'use strict';

module.exports = function(sequelize, DataTypes) {

  var TagAreaTarget =
    sequelize.define('TagAreaTarget',
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
          TagAreaTarget.belongsTo(models.Tag, { onDelete: 'cascade' }) ;
          TagAreaTarget.belongsTo(models.Area, { onDelete: 'cascade' });
        }
      }
    }
  );

  return TagAreaTarget;
};
