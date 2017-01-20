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
 * Created by mspalti on 12/13/16.
 */
(function () {
  'use strict';

  function ImageController(ThumbImageObserver,
                           DialogStrategy) {

    const vm = this;

    /** @type {string} */
    vm.updateImageMessage = 'templates/dialog/updateImageMessage.html';

    /**
     * Get the dialog object for this component.
     * Call with showDialog($event,message).
     * @type {*}
     */
    vm.dialog =  DialogStrategy.makeDialog(vm);

    /**
     * Set the component subscriptions.
     * @private
     */
    function _setSubscriptions() {

      ThumbImageObserver.subscribe(function onNext() {
        vm.thumbnailImage = ThumbImageObserver.get();
      });
    }

    vm.$onInit = function () {
      _setSubscriptions();
    };
  }

  taggerComponents.component('imageSelector', {
    template:
    '<md-card class="flex" flex="flex"> ' +
    ' <md-toolbar class="md_primary"> ' +
    '   <div class="md-toolbar-tools"> ' +
    '    <i class="material-icons">image</i> ' +
    '    <h3 class="md-display-1">&nbsp;Image</h3> ' +
    '    <div flex="flex"> ' +
    '      <md-button class="md-accent md-raised md-fab md-mini" ng-click="vm.dialog.showDialog($event, vm.updateImageMessage)" style="float: right"> ' +
    '        <i class="material-icons">file_upload</i> ' +
    '      </md-button> ' +
    '    </div> ' +
    '  </div> ' +
    ' </md-toolbar> ' +
    ' <md-card-content> ' +
    '   <div layout="row"> ' +
    '     <div flex="40" style="margin:0;max-width: 120px"> ' +
    '       <thumb-image-link imgname="{{vm.thumbnailImage}}"></thumb-image-link> ' +
    '     </div> ' +
    '     <md-card-content> ' +
    '     <span class="md-caption">Image size 500px wide by 600px high</span> ' +
    '   </md-card-content> ' +
    '  </div> ' +
    ' </md-card-content> ' +
    '</md-card>',
    controller: ImageController,
    transclude: true,
    controllerAs: 'vm'
  });

})();

