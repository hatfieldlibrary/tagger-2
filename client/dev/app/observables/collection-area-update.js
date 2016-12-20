/**
 * Created by mspalti on 12/20/16.
 */
(function()  {

  'use strict';

  /**
   * Used by the area-selector and collection-list component.
   */
  taggerServices.factory('CollectionAreasObserver', ['rx', function(rx){

    const Subject = new rx.Subject();

    return {
      set: function set(){
          Subject.onNext();
      },
      get: function get() {
        return null;
      },
      subscribe: function (o) {
        return Subject.subscribe(o);
      }
    };
  }]);

})();
