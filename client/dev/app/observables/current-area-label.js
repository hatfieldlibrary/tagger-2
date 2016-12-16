/**
 * Created by mspalti on 12/12/16.
 */
(function()  {

  'use strict';

  taggerServices.factory('AreaLabelObserver', ['rx', function(rx){

    const Subject = new rx.Subject();
    let label = '';

    return {
      set: function set(update){
        if (update !== label) {
          label = update;
          Subject.onNext(label);
        }
      },
      get: function get() {
        return label;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
