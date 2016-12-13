/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('UserAreaObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let areaId = 0;

    return {
      set: function set(update){
        areaId = update;
        Subject.onNext(areaId);
      },
      get: function get() {
        return areaId;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
