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
  develdbuser: 'mspalti',
  develdbpassword: 'coffee',
  googleClientId: '85240803633-joprl8lodm1h0p1qcm0aau1eie8ng4h6.apps.googleusercontent.com',
  googleClientSecret: 'jJHJydky3wtmXixsEJ37CEXR',
  googleCallback: 'http://localhost:3000/auth/google/callback',
  externalHostA: {  // This is the browse-by-year API for exist collections.
    host: '',
    port: '',
    path: ''
  }

};

module.exports = credentials;
