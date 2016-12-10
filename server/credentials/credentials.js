/**
 * Created by mspalti on 12/6/16.
 */
'use strict';

/**
 * Update credentials, user names, and passwords here.  This file is included in .gitignore. Do not track in VCS.
 *
 * @type {{develuid: string, develgid: string, develdbuser: string, develdbpassword: string, googleClientId: string, googleClientSecret: string, googleCallback: string, uid: string, gid: string, user: string, password: string, productiondbhost: string}}
 */

var credentials = {

  develuid: 'mspalti',
  develgid: 'staff',
  develdbuser: 'mspalti',
  develdbpassword: 'coffee',
  googleClientId: '85240803633-enf8ou7eg3cvu77c7qv6ns86v733mse2.apps.googleusercontent.com',
  googleClientSecret: 'x9zgRgnwRJaSk_r8LlQX2Lji',
  googleCallback: 'http://libapps.willamette.edu:3000/auth/google/callback',
  uid: 'node',
  gid: 'node',
  user: 'tagger',
  password: 'c0fFee12',
  productiondbhost: 'libdb.willamette.edu'

};

module.exports = credentials;
