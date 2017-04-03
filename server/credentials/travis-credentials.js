/**
 * Created by mspalti on 1/13/17.
 */
'use strict';
/**
 * Credential and path definitions for travis test build.
*/
const credentials = {
  develgid: '',
  develdbuser: 'test_user',
  develdbpassword: '1234',
  googleClientId: '',
  googleClientSecret: '',
  googleCallback: 'http://localhost:3000/auth/google/callback',
  externalHostA: {
    host: '',
    port: '',
    path: ''
  }

};

module.exports = credentials;
