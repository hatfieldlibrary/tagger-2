/*
 * Copyright (c) 2017.
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
 * Created by mspalti on 1/13/17.
 */
'use strict';
/**
 * Credential and path definitions for travis test build.
*/
const credentials = {
  develgid: '',
  dbUser: 'test_user',
  dbPassword: '1234',
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
