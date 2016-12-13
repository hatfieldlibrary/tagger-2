/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('CategoryObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let category = 0;

    return {
      set: function set(update){
        category = update;
        Subject.onNext(category);
      },
      get: function get() {
        return category;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
