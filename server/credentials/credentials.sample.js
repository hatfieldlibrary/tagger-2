'use strict';

var credentials = {
  develuid: '<your system uid>',
  develgid: '<your system gid>',
  develdbuser: '<development database user name>',
  develdbpassword: '<development database password>',
  googleClientId: '<google oauth client id>',
  googleClientSecret: '<google oauth client secret>',
  googleCallback: '<path to google oauth callback>',
  uid: '<node uid>',
  gid: '<node gid>',
  user: '<production database user>',
  password: '<production database password>',
  productiondbhost: '<production database host>',
  externalHostA: {  // This is optional path to external host.
    host: '<external host name>',
    port: '<external host port>',
    path: '<external host api query path>'
  }
};

module.exports = credentials;
