/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('TotalLinksObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let total = 0;

    return {
      set: function set(update){
        total = update;
        Subject.onNext(total);
      },
      get: function get() {
        return total;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
