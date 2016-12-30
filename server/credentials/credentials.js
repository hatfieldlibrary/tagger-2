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

/**
 * Created by mspalti on 12/6/16.
 */
'use strict';
/**
 * Credential and path definitions.
 *
 * @type {{develuid: string, develgid: string, develdbuser: string, develdbpassword: string, googleClientId: string, googleClientSecret: string, googleCallback: string, uid: string, gid: string, user: string, password: string, productiondbhost: string, externalHostA: {host: string, port: string, path: string}}}
 */
const credentials = {

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
  productiondbhost: 'libdb.willamette.edu',
  externalHostA: {
    host: 'exist.willamette.edu',
    port: '8080',
    path: '/exist/apps/METSALTO/api/BrowseList.xquery?collection='
  }

};

module.exports = credentials;
