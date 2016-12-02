'use strict';
/**
 * Created by mspalti on 5/23/14.
 */


var fs = require('fs'),
  path      = require('path'),
  Sequelize = require('sequelize'),
  lodash    = require('lodash'),
  config    = require('../../config/environment'),
  sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.password,
    { host: config.mysql.host,
      port: config.mysql.port,
      dialect: config.mysql.dialect
    }),
  database  = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    database[model.name] = model;
  });

Object.keys(database).forEach(function(modelName) {
  if ('associate' in database[modelName]) {
    database[modelName].associate(database);
  }
});


module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, database);
