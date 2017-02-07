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
 * Created by mspalti on 12/14/16.
 */

(function () {
  'use strict';

  function AuthController(UserAreaObservable,
                          UserObserver,
                          IsAuthObserver,
                          SetGlobalValues,
                          getUserInfo,
                          $log) {

    const vm = this;

    /**
     * Sets the role of the user based on the
     * area to which they belong. Called on the
     * initial page load after successful authentication.
     * @param areaId the current area id
     */
    function _getRole(areaId) {

      vm.role = _getUserRole(areaId);

    }

    /**
     * Returns the user role based on the area id in their
     * user profile.
     * @param areaId
     * @returns string for role
     */
    function _getUserRole(areaId) {

      if (areaId === 0) {
        return 'Administrator';
      } else {
        return 'Area Maintainer';
      }

    }

    vm.$onInit = () => {

      let userInfo = getUserInfo.query();
      userInfo.$promise
        .then(function (user) {
          console.log(user)
          IsAuthObserver.set(true);
          UserObserver.set(user.areaId);
          UserAreaObservable.set(user.areaId);
          vm.authorized = true;
          vm.userPicture = user.picture;
          vm.userName = user.name;
          _getRole(user.areaId);
          SetGlobalValues.initializeGlobalValues();

        }).catch(function (err) {
        vm.authorized = false;
        $log.error(err);
      });
    };

  }

  taggerComponents.component('authorizationComponent', {

    template: '<md-toolbar class="md-default-theme"> ' +
    ' <md-card class="local-hue-1 margin-override"> ' +
    '   <md-card-content style="padding-left: 12px"> ' +
    '     <md-list> ' +
    '       <md-list-item class="contact-item">   ' +
    '       <!-- Passport login provides picture from Google profile-->   ' +
    '         <img ng-if="vm.authorized" class="md-avatar" ng-src="{{vm.userPicture}}"> ' +
    '       </md-list-item> ' +
    '     <md-list-item>  ' +
    '       {{vm.userName}} ' +
    '     </md-list-item> ' +
    '     <md-list-item> ' +
    '       <!-- The user and areaId are also from passport login.--> ' +
    '       <!-- Passing the areaId to the controller will initialize--> ' +
    '       <!-- the application context.--> ' +
    '       <div class="md-subhead"> ' +
    '         <div class="md-caption">{{vm.role}}</div> ' +
    '       </div> ' +
    '     </md-list-item> ' +
    '   </md-list> ' +
    ' </md-card-content> ' +
    ' </md-card> ' +
    '</md-toolbar>',
    controller: AuthController,
    controllerAs: 'vm'
  });

})();
