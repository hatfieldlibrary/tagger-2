/**
 * Created by mspalti on 1/3/17.
 */

(function () {

  'use strict';

  function ToggleController(TagTargets,
                            TagObservable,
                            AreaObservable,
                            TagListObservable,
                            DialogStrategy) {

    const vm = this;

    let targetList = [];
    let currentArea = AreaObservable.get();
    const removeMessage = 'templates/dialog/removeTagFromAreaMessage.html';
    const addMessage = 'templates/dialog/addTagToAreaMessage.html';

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html to display in dialog
     */
    vm.showDialog = function ($event, tagId) {

      let message = '';
      TagObservable.set(tagId);

      if (_findArea(currentArea, targetList)) {
        message = removeMessage;
      }
      else {
        message = addMessage;
      }
      vm.dialog.showDialog($event, message);

    };

    /**
     * Gets the tag targets to use in comparison.
     * @private
     */
    function _getTagList() {

      let targets = TagTargets.query({tagId: vm.tagId});
      targets.$promise.then(function (data) {
        targetList = data;
        _checkArea();
      });

    }

    /**
     * Sets CSS class based on whether tag is currently in list of
     * tags associated with the area.
     */
    function _checkArea() {

      if (_findArea(currentArea, targetList)) {
        vm.buttonClass = 'md-warn';
        vm.buttonIcon = 'clear';
        vm.buttonText = 'Remove';
        vm.textClass = 'grey-label';
      } else {
        vm.textClass = 'grey-item';
        vm.buttonClass = 'md-accent';
        vm.buttonText = 'Add';
        vm.buttonIcon = 'add';
      }
    }

    function _findArea(areaId, tar) {
      let targets = tar;
      for (let i = 0; i < targets.length; i++) {
        if (targets[i].AreaId === areaId) {
          return true;
        }
      }
      return false;
    }

    vm.$onInit = () => {

      /**
       * Get the dialog object for this component.
       * Call with showDialog($event,message).
       * @type {*}
       */
      vm.dialog = DialogStrategy.makeDialog(vm);



      TagListObservable.subscribe(() => {
        _getTagList();
      });

      _getTagList();

    };
  }

  taggerComponents.component('toggleTagAreaButton', {

    bindings: {
      tagId: '@',
      tagName: '@'
    },
    template: '<div style="width: 20%;float:left;">' +
    '   <md-button class="{{vm.buttonClass}} md-raised"  ng-click="vm.showDialog($event, vm.tagId);">' +
    '     {{vm.buttonText}}' +
    '     <div class="md-ripple-container"></div>' +
    '   </md-button>' +
    '</div>' +
    '<div style="width: 80%;float:left;line-height: 3.3rem;" class="{{vm.textClass}} md-subhead">' +
    '   {{vm.tagName}}' +
    '</div>',
    controller: ToggleController,
    controllerAs: 'vm'

  });

})();
