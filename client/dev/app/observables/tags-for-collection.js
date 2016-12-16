/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('CollectionTagsObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let tags = [];

    return {
      set: function set(update){
        if (update !== tags) {
          tags = update;
          Subject.onNext(tags);
        }
      },
      get: function get() {
        return tags;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);


})();
