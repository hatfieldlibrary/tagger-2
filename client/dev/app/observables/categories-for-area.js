/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('CategoriesForAreaObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let catgories = [];

    return {
      set: function set(update){
        catgories = update;
        Subject.onNext(catgories);
      },
      get: function get() {
        return catgories;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);


})();
