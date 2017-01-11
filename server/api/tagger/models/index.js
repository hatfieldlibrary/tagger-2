/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Initializes the Sequelize database ORM for the models, using
 * connection parameters defined in configuration. This is called
 * at server startup and is required in each of the dao modules.
 * Node modules are not true singletons, so be careful.  As an
 * alternative to requiring this module in each dao, you can
 * declare the database object global at server initialization.
 * https://derickbailey.com/2016/03/09/creating-a-true-singleton-in-node-js-with-es6-symbols/
 * Created by mspalti on 5/23/14.
 */
'use strict';

const fs = require('fs'),
  path      = require('path'),
  Sequelize = require('sequelize'),
  lodash    = require('lodash'),
  config    = require('../../../config/environment');

const  sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.password,
    { host: config.mysql.host,
      port: config.mysql.port,
      dialect: config.mysql.dialect,
      logging: config.dbLog
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
