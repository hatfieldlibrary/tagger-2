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

//const path = require('path');
const credentials = require('../credentials/credentials');
const env = process.env.NODE_ENV || 'development';

const config = {

  development: {
    app: {
      name: 'tagger'
    },
    uid: credentials.develuid,
    gid: credentials.develgid,
    port: 3333,
    mysql: {
      db: 'acomtags_development',
      user: credentials.develdbuser,
      password: credentials.develdbpassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    sync: {force: false},
    useAuth: false,
    convert: '/usr/local/bin/convert',
    identify: '/usr/local/bin/identify',
    taggerImageDir: '/usr/local/taggerImages',
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: 'http://localhost:3000/auth/google/callback',
    externalHostA: credentials.externalHostA,
    externalHostB: '', // not in use
    nodeEnv: env
  },

  runlocal: {
    app: {
      name: 'acomtags'
    },
    uid: credentials.develuid,
    gid: credentials.develgid,
    port: 3000,
    mysql: {
      db: 'acomtags_development',
      user: credentials.develdbuser,
      password: credentials.develdbpassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    sync: {force: false},
    useAuth: false,
    convert: '/usr/local/bin/convert',
    identify: '/usr/local/bin/identify',
    taggerImageDir: '/usr/local/taggerImages',
    adminPath: '/views',
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: 'http://localhost:3000/auth/google/callback',
    externalHostA: credentials.externalHostA,
    externalHostB: credentials.externalHostB, // not in use
    nodeEnv: env
  },

  test: {
    app: {
      name: 'tagger'
    },
    uid: credentials.develuid,
    gid: credentials.develgid,
    port: 3000,
    mysql: {
      db: 'acomtags_test',
      user: credentials.develdbuser,
      password: credentials.develdbpassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    sync: {force: true},
    useAuth: false,
    convert: '/usr/local/bin/convert',
    identify: '/usr/local/bin/identify',
    taggerImageDir: '/var/taggerImages',
    adminPath: '/views',
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: 'http://localhost:3000/auth/google/callback',
    externalHostA: credentials.externalHostA,
    externalHostB: '', // not in use
    nodeEnv: env
  },

  production: {
    app: {
      name: 'tagger'
    },
    sync: {force: false},
    useAuth: true,
    uid: credentials.uid,
    gid: credentials.gid,
    port: 3000,
    redisPort: 6379,
    mysql: {
      db: 'acomtags',
      user: credentials.user,
      password: credentials.password,
      host: credentials.productiondbhost,
      port: 3306,
      dialect: 'mariadb'
    },
    convert: '/usr/bin/convert',
    identify: '/usr/bin/identify',
    taggerImageDir: '/var/taggerImages',
    adminPath: '/views',
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: credentials.googleCallback,
    externalHostA: credentials.externalHostA,
    externalHostB: '', // not in use
    nodeEnv: env
  }
};

module.exports = config[env];
