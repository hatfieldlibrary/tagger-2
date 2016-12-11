/**
 * Created by mspalti on 12/11/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('AreaListObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let areas = [];

    return {
      set: function set(update){
        areas = update;
        Subject.onNext(areas);
      },
      get: function get() {
        return areas;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);


})();
