/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('CollectionListObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let collections = [];

    return {
      set: function set(update){
        if (update !== collections) {
          collections = update;
          Subject.onNext(collections);
        }
      },
      get: function get() {
        return collections;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);


})();
