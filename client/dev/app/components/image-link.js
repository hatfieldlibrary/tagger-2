/**
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
    }
  }

  taggerComponents.component('thumbImageLink', {
    bindings: {
      imgname: '@'
    },
    template: '<img style="max-width: 120px;" ng-src="{{$ctrl.getLink()}}">',
    controller: LinkCtrl
  })

})();
