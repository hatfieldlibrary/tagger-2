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

const env = process.env.NODE_ENV || 'development';

let credentials;

let credentialsPath = require('./require-paths');

try {
  // The path to credentials.
  credentials = require(credentialsPath.path(env) + 'credentials');

} catch (ex) {
  // No credentials ... try travis-ci credentials.
  console.log('Using travis credentials');
  credentials = require('../credentials/travis-credentials')

}

const config = {

  development: {
    app: {
      name: 'tagger'
    },
    uid: credentials.uid,
    gid: credentials.gid,
    logLevel: 'debug',
    port: credentials.hostPort,
    mysql: {
      db: credentials.dbName,
      user: credentials.dbUser,
      password: credentials.dbPassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    dbLog: console.log,
    sync: {force: false},
    convert: '/usr/local/Cellar/imagemagick/7.0.7-22/bin/convert',
    identify: '/usr/local/Cellar/imagemagick/7.0.7-22/bin/identify',
    taggerImageDir: credentials.taggerImageDir,
    domain: credentials.domain,
    useAuth: true,
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: credentials.googleCallback,
    externalHostA: credentials.externalHostA,
    externalHostB: '', // not in use
    nodeEnv: env
  },

  test: {
    app: {
      name: 'tagger'
    },
    credentialsPath: '',
    uid: credentials.develuid,
    gid: credentials.develgid,
    port: credentials.hostPort,
    mysql: {
      db: 'tagger_test',
      user: credentials.dbUser,
      password: credentials.dbPassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    logLevel: 'debug',
    dbLog: false,
    sync: {force: true},
    useAuth: false,
    domain: credentials.domain,
    convert: '/usr/local/bin/convert',
    identify: '/usr/local/bin/identify',
    taggerImageDir: credentials.taggerImageDir,
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: credentials.googleCallback,
    externalHostA: credentials.externalHostA,
    externalHostB: '', // not in use
    nodeEnv: env
  },

  production: {
    app: {
      name: 'tagger'
    },
    credentialsPath: '',
    logLevel: 'info',
    dbLog: false,
    sync: {force: false},
    uid: credentials.uid,
    gid: credentials.gid,
    port: credentials.hostPort,
    redisPort: credentials.redisPort,
    mysql: {
      db: credentials.dbName,
      user: credentials.dbUser,
      password: credentials.dbPassword,
      host: credentials.productiondbhost,
      port: 3306,
      dialect: 'mysql'
    },
    convert: '/usr/bin/convert',
    identify: '/usr/bin/identify',
    taggerImageDir: credentials.taggerImageDir,
    domain: credentials.domain,
    useAuth: true,
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: credentials.googleCallback,
    externalHostA: credentials.externalHostA,
    externalHostB: '', // not in use
    nodeEnv: env
  }
};

module.exports = config[env];
