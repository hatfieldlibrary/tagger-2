/**
 * Created by mspalti on 12/14/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('AreaActionObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let area = null;

    return {
      set: function set(update){
        if (update !== area) {
          area = update;
          Subject.onNext(area);
        }
      },
      get: function get() {
        return area;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
