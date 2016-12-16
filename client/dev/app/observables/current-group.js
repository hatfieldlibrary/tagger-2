/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('GroupObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let category = 0;

    return {
      set: function set(update){
        if (update !== category) {
          category = update;
          Subject.onNext(category);
        }
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
