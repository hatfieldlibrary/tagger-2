/*
 * Copyright (c) 2017.
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

'use strict';

import {config} from './db-conf';
import fs from 'fs';
import path  from 'path';
import lodash from 'lodash';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  config.test.mysql.db,
  config.test.mysql.user,
  config.test.mysql.password,
  {
    host: config.test.mysql.host,
    port: config.test.mysql.port,
    dialect: config.test.mysql.dialect,
    logging: false
  }),
  database = {};

fs
  .readdirSync(__dirname + '/../../../../server/api/tagger/schema/')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname + '/../../../../server/api/tagger/schema/', file));
    database[model.name] = model;
  });

Object.keys(database).forEach(function (modelName) {
  if ('associate' in database[modelName]) {
    database[modelName].associate(database);
  }
});

const db = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, database);

module.exports = db;



