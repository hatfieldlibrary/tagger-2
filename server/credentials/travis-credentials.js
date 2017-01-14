/**
 * Created by mspalti on 1/13/17.
 */
/**
 * Created by mspalti on 1/12/17.
 */
'use strict';
/**
 * Credential and path definitions.
 *
 * @type {{develuid: string, develgid: string, develdbuser: string, develdbpassword: string, googleClientId: string, googleClientSecret: string, googleCallback: string, uid: string, gid: string, user: string, password: string, productiondbhost: string, externalHostA: {host: string, port: string, path: string}}}
 */
const credentials = {
  develgid: 'staff',
  develdbuser: 'travis',
  develdbpassword: 'supersecret',
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
