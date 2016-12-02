/**
 * Created by mspalti on 12/1/16.
 */
'use strict';

const taggerSchema = require('../models/index');
const taggerDao = {};

taggerDao.countCTypesByArea = (areaId) => {

  taggerSchema.sequelize.query('SELECT ctype, COUNT(*) as count FROM AreaTargets ' +
    'LEFT JOIN Collections ON AreaTargets.CollectionId = Collections.id ' +
    'WHERE AreaTargets.AreaId = ? GROUP BY ctype',
    {
      replacements: [areaId],
      type: taggerSchema.Sequelize.QueryTypes.SELECT
    }
  )

};




module.exports = taggerDao;
