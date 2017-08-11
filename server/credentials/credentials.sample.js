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

'use strict';

var credentials = {

  /**
   * The uid and gid that the Express server will
   * run under in development.
   */
  develuid: '<your local system uid>',
  develgid: '<your local system gid>',
  /**
   * The user name and password for your development
   * database.
   */
  develdbuser: '<development database user name>',
  develdbpassword: '<development database password>',
  /**
   * Google OAUTH2 credentials.
   */
  googleClientId: '<google oauth client id>',
  googleClientSecret: '<google oauth client secret>',
  googleCallback: '<google oauth callback>',
  /**
   * The uid and gid that the Express server will
   * run under in production (typically user node).
   */
  uid: '<node uid on production system>',
  gid: '<node gid on production system>',
  /**
   * The user name, password  and host for the production
   * database.
   */
  user: '<production database user>',
  password: '<production database password>',
  productiondbhost: '<production database host>',
  /**
   * The expected email domain returned with Google profile
   * of the authenticated user.
   */
  domain: '<email domain used for authentication>',
  /**
   * The port used by redis.
   */
  redisPort: '<the redis port number>',
  /**
   * Configuration for external host services.
   */
  externalHostA: {  // This is the browse-by-year API for exist collections. Disappearing soon.
    host: '<external host name>',
    port: '<external host port>',
    path: '<external host api query path>'
  }

};

module.exports = credentials;
