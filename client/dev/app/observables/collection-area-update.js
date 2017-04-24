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
 * Created by mspalti on 12/20/16.
 */
(function()  {

  'use strict';

  /**
   * Observable used by the area-selector and collection-list components.
   * Use it to notify subscribers that the area list has changed.
   */
  taggerServices.factory('CollectionAreasObservable', ['rxSubject', function(rxSubject){

    const Subject = rxSubject.getSubject();

    return {
      set: function set(){
          Subject.onNext();
      },
      get: function get() {
        return null;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
