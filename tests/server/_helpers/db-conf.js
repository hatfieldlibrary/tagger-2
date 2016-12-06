/**
 * Created by mspalti on 12/3/16.
 */

import path from 'path';

import credentials from '../../../server/config/credentials';

let rootPath = path.normalize(__dirname + '/../../../server');

exports.config = {
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
    convert: '/usr/local/bin/convert',
    identify: '/usr/local/bin/identify',
    taggerImageDir: '/var/taggerImages',
    adminPath: '/views',
    googleClientId: credentials.googleClientId,
    googleClientSecret: credentials.googleClientSecret,
    googleCallback: 'http://localhost:3000/auth/google/callback',
    externalHostA: credentials.externalHostA,
    externalHostB: credentials.externalHostB, // not in use
    nodeEnv: 'test'
  }

};
