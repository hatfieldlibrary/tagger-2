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

var taggerEnvironment = angular.module('taggerEnvironment', []);

(function() {

  /**
   * Returns settings for the application environment.
   */
  taggerEnvironment.factory('config', function() {

    return {
      // If you need to define full path to the host, include the
      // protocol and trailing forward slash
      //  restHost: 'http://localhost:3001/rest/'

      // Relative paths also work.
      restHost: '/rest/'

    };

  });

})();
