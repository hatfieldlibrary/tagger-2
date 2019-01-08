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
 * Created by mspalti on 1/21/17.
 */
'use strict';
(function () {

  // User's home directory. Should be OS agnostic.
  function getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  }
  // Home of the development/test credentials file.
  const devDirectory = getUserHome() + '/etc/tagger/';
  // Home of the production credentials file.
  const prodDirectory =  '/etc/tagger/';

  const path = {
    development: devDirectory,
    test: devDirectory,
    production: prodDirectory
  };

  function _getPath(env) {
    return path[env];
  }

  const creds = {

    path: _getPath

  };

  module.exports = creds;

})();
