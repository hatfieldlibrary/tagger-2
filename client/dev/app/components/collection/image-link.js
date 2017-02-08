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
 * Image link component.
 *
 * Created by mspalti on 12/13/16.
 */

(function () {

  'use strict';

  function LinkCtrl() {

    const ctrl = this;

    ctrl.getLink = function () {
      if (ctrl.imgname.length > 0) {
        return '/resources/img/thumb/' + ctrl.imgname;
      }
      return '';
    };
  }

  taggerComponents.component('thumbImageLink', {
    bindings: {
      imgname: '@'
    },
    template: '<img style="max-width: 120px;" ng-src="{{$ctrl.getLink()}}">',
    controller: LinkCtrl
  });

})();
