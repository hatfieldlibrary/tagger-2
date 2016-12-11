var path = require('path'),
  rootPath = path.normalize(__dirname + '/../../'),
  credentials = require('../credentials/credentials');

var env = process.env.NODE_ENV || 'development';

var config = {

  development: {
    root: rootPath,
    app: {
      name: 'tagger'
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
    adminPath: '/server/views',
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: 'http://localhost:3000/auth/google/callback',
    externalHostA: '',
    externalHostB: '', // not in use
    nodeEnv: env
  },

  runlocal: {
    root: rootPath,
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
    root: rootPath,
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
    externalHostB: credentials.externalHostB, // not in use
    nodeEnv: env
  },

  production: {
    root: rootPath,
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
    externalHostB: credentials.externalHostB, // not in use
    nodeEnv: env
  }
};

module.exports = config[env];
