/**
 * Created by mspalti on 12/13/16.
 */
(function () {
  'use strict';

  function ImageController(ThumbImageObserver,
                           TaggerDialog) {

    const vm = this;

    /** @type {string} */
    vm.updateImageMessage = 'templates/dialog/updateImageMessage.html';

    ThumbImageObserver.subscribe(function onNext() {
      vm.thumbnailImage = ThumbImageObserver.get();
    });

    vm.showDialog = function ($event, message) {
      new TaggerDialog($event, message);
    };

    vm.$onInit = function () {

    }
  }

  taggerComponents.component('imageSelector', {
    template: '    ' +
    '<md-card class="flex" flex="flex"> ' +
    ' <md-toolbar class="md_primary"> ' +
    '   <div class="md-toolbar-tools"> ' +
    '    <i class="material-icons">image</i> ' +
    '    <h3 class="md-display-1">&nbsp;Image</h3> ' +
    '    <div flex="flex"> ' +
    '      <md-button class="md-accent md-raised md-fab md-mini" ng-click="vm.showDialog($event, vm.updateImageMessage)" style="float: right"> ' +
    '        <i class="material-icons">file_upload</i> ' +
    '      </md-button> ' +
    '    </div> ' +
    '  </div> ' +
    ' </md-toolbar> ' +
    ' <md-card-content> ' +
    '   <div layout="row"> ' +
    '     <md-card flex="40" style="margin:0;max-width: 120px"> ' +
    '       <thumb-image-link imgname="{{vm.thumbnailImage}}"></thumb-image-link> ' +
    '     </md-card> ' +
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

