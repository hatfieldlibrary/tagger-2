/**
 * Created by mspalti on 12/3/16.
 */

import path from 'path';

import credentials from '../../../server/credentials/credentials';

//let rootPath = path.normalize(__dirname + '/../../../server');

exports.config = {
  test: {
    mysql: {
      db: 'acomtags_test',
      user: credentials.develdbuser,
      password: credentials.develdbpassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    nodeEnv: 'test'
  }

};
