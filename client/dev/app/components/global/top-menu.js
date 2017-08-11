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
 * Created by mspalti on 4/4/17.
 */

(function () {

  'use strict';

  function MenuController($mdSidenav) {

    const vm = this;

    vm.toggleLeft = function () {
      $mdSidenav('left').toggle();
    };

  }

  taggerComponents.component('topMenu', {

    templateUrl: 'templates/component/top-menu.html',
    controller: MenuController,
    controllerAs: 'vm'

  });

})();
