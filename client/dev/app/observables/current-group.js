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
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('GroupObservable', ['rxSubject', function(rxSubject){

    const Subject = rxSubject.getSubject();
    /**
     * Default value.
     * @type {number}
     */
    let category = 0;

    return {
      set: function set(update){
        if (update !== category) {
          category = update;
          Subject.onNext(category);
        }
      },
      get: function get() {
        return category;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
