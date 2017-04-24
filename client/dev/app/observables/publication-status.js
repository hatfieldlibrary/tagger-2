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
 * Created by mspalti on 12/22/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('PublicationStatusObservable', ['rxSubject', function(rxSubject){

    const Subject = rxSubject.getSubject();
    /**
     * Default value.
     * @type {boolean}
     */
    let status = false;

    return {
      set: function set(update){
        status = update;
        Subject.onNext(status);
      },
      get: function get() {
        return status;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
