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
