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
 * Created by mspalti on 1/3/17.
 */

(function () {

  'use strict';

  function NavigationController($mdSidenav, UserAreaObservable) {

    const vm = this;

    vm.currentIndex = 0;

    vm.toggleLeft = () => {
      $mdSidenav('left').toggle();
    };

    vm.setCurrentIndex = (index) => {
      vm.currentIndex = index;
    };

    vm.$onInit = () => {

      // get area id if it's already available.
      vm.userAreaId = UserAreaObservable.get();

      /**
       * Watches for update to the user's area. The value is obtained in the Passport
       * OAUTH login procedure and is used here to initialize state.
       */
      UserAreaObservable.subscribe((id) => {
        vm.userAreaId = id;

      });

    };

  }

  taggerComponents.component('sideNavigationComponent', {

    templateUrl: 'templates/component/side-nav.html',
    controller: NavigationController,
    controllerAs: 'vm'

  });

})();
