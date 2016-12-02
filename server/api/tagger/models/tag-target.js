'use strict';
/**
 * Created by mspalti on 5/29/14.
 */

module.exports = function(sequelize, DataTypes) {

    var TagTarget = sequelize.define('TagTarget',
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
                    TagTarget.belongsTo(models.Tag, { onDelete: 'cascade' }) ;
                    TagTarget.belongsTo(models.Collection, { onDelete: 'cascade' });
                }
            }
        }
    );

    return TagTarget;
};
