/**
 * Created by mspalti on 4/4/17.
 */

(function () {

  'use strict';

  function MenuController($mdSidenav) {

    const vm = this;

    vm.toggleLeft = function () {
      $mdSidenav('left').toggle();
    }

  }

  taggerComponents.component('topMenu', {

    templateUrl: 'templates/component/top-menu.html',
    controller: MenuController,
    controllerAs: 'vm'

  });

})();
