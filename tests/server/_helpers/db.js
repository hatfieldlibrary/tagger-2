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
    dialect: config.test.mysql.dialect
  }),
  database = {};

fs
  .readdirSync(__dirname + '/../../../server/api/tagger/models/')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname + '/../../../server/api/tagger/models/', file));
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



