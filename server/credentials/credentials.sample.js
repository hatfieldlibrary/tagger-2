'use strict';

var credentials = {

  develuid: '<your local system uid>',
  develgid: '<your local system gid>',
  develdbuser: '<development database user name>',
  develdbpassword: '<development database password>',
  googleClientId: '<google oauth client id>',
  googleClientSecret: '<google oauth client secret>',
  googleCallback: '<google oauth callback>',
  uid: '<node uid on production system>',
  gid: '<node gid on production system>',
  user: '<production database user>',
  password: '<production database password>',
  productiondbhost: '<production database host>',
  domain: '<email domain used for authentication>',
  redisPort: '<the redis port number>',
  externalHostA: {  // This is the browse-by-year API for exist collections. Disappearing soon.
    host: '<external host name>',
    port: '<external host port>',
    path: '<external host api query path>'
  }

};

module.exports = credentials;
