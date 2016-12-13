/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('TagsListObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let tags = [];

    return {
      set: function set(update){
        tags = update;
        Subject.onNext(tags);
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
