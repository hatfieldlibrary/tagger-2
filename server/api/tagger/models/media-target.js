'use strict';
/**
 * Created by mspalti on 8/1/14.
 */

module.exports = function(sequelize, DataTypes) {

    var ItemContentTarget = sequelize.define('ItemContentTarget',
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
                    ItemContentTarget.belongsTo(models.ItemContent, { onDelete: 'cascade' }) ;
                    ItemContentTarget.belongsTo(models.Collection, { onDelete: 'cascade' });
                }
            }
        }
    );

    return ItemContentTarget;
};
