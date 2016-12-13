/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('CategoryListObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let categories = [];

    return {
      set: function set(update){
        categories = update;
        Subject.onNext(categories);
      },
      get: function get() {
        return categories;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);


})();
