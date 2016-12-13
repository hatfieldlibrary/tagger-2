(function() {

  'use strict';
  /**
   * Controller for the area overview page.
   */

  /*globals taggerControllers*/

  taggerControllers.controller('OverviewCtrl', [

    '$scope',
    'CategoryByArea',
    'CategoryCountByArea',
    'ContentTypeCount',
    'TagCountForArea',
    'AreaLabelObserver',
    'AreaObserver',
    'TotalTypesObserver',
    'Data',
    function(

      $scope,
      CategoryByArea,
      CategoryCountByArea,
      ContentTypeCount,
      TagCountForArea,
      AreaLabelObserver,
      AreaObserver,
      TotalTypesObserver,
      Data ) {


      var vm = this;
      var collectionTotal = Data.collectionsTotal;
      let collectionTypeTotal = 0;
      var searchOptionsTotal = Data.searchOptionsTotal;
      var collectionLinksTotal = Data.collectionLinksTotal;


    TotalTypesObserver.subscribe(function onNext() {
          collectionTypeTotal = TotalTypesObserver.get();
    });

      vm.categoryCounts ={data: null};
      vm.typeCounts = {data: null};

      /**
       * Watch for changes in the current area id and initialize.
       */
      AreaObserver.subscribe(function onNext() {
        _init();
      });
      /**
       * Watch for updates to the area label.  Assures that initialization and
       * area context switches are recognized.
       */
      AreaLabelObserver.subscribe(function onNext() {
        vm.areaLabel = AreaLabelObserver.get();
      });

      /**
       * Init function called on load and after change to
       * the selected area.
       */
      var _init = function() {

        const areaId = AreaObserver.get();
        if (areaId !== null) {

          // initialize count checks
          vm.collectionSearchMatch = (collectionTotal === searchOptionsTotal);
          vm.collectionTypeMatch = (collectionTotal === collectionTypeTotal);
          vm.collectionLinksMatch = (collectionTotal === collectionLinksTotal);


          var categoryCount =
            CategoryCountByArea.query(
              {
                areaId: areaId
              }
            );
          categoryCount.$promise.then(
            function (categories) {
              var catCount = 0;
              var data = [];
              for (var i = 0; i < categories.length; i++) {
                catCount = catCount + categories[i].count;
              }
              for (i = 0; i < categories.length; i++) {
                data[i] = {title: categories[i].title, value: categories[i].count};
              }
              vm.categoryCounts = {
                total: catCount,
                data: data
              };

            });

          var contentTypeCount =
            ContentTypeCount.query(
              {
                areaId: areaId
              }
            );
          contentTypeCount.$promise.then(
            function (types) {
              var count = 0;
              var data = [];
              for (var i = 0; i < types.length; i++) {
                count = count + types[i].count;
              }
              for (i = 0; i < types.length; i++) {
                data[i] = {title: types[i].name, value: types[i].count};
              }
              vm.typeCounts = {
                total: count,
                data: data
              };

            });

          var subs = TagCountForArea.query({areaId: areaId});
          subs.$promise.then(function (data) {

            vm.subjects = data;
          });


        }
      };

      /**
       * Watch for changes in the search option type total.  Update
       * local variable and view model's collectionTypeMatch variable..
       */
      $scope.$watch(function() {return Data.searchOptionsTotal;},

        function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue !== 0) {
              searchOptionsTotal = newValue;
              if ( newValue ) {
                vm.collectionSearchMatch = (collectionTotal === searchOptionsTotal);
              }

            }
          }
        });

      /**
       * Watch for changes in the collection type total.  Update
       * local variable and view model's collectionTypeMatch variable..
       */
      $scope.$watch(function() {return Data.collectionTypeTotal;},

        function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue !== 0) {
              collectionTypeTotal = newValue;
              if ( newValue ) {
                vm.collectionTypeMatch = (collectionTotal === collectionTypeTotal);

              }

            }
          }
        });

      /**
       * Watch for changes in the collection links total.  Update
       * local variable and view model's collectionLinkMatch variable.
       */
      $scope.$watch(function() {return Data.collectionLinksTotal;},

        function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue !== 0) {
              collectionLinksTotal = newValue;
              if ( newValue ) {
                vm.collectionLinksMatch = (collectionTotal === collectionLinksTotal);
              }
            }
          }
        });

      /**
       * Watch for changes in the collections total.  Update
       * local variable and view model's collectionTypeMatch variable..
       */
      $scope.$watch(function() {return Data.collectionsTotal;},

        function(newValue, oldValue) {
          if (newValue !== oldValue) {
            _init();
            if (newValue !== 0) {
              collectionTotal = newValue;
              if ( newValue ) {
                vm.collectionTypeMatch = (collectionTotal === collectionTypeTotal);
                vm.collectionSearchMatch = (collectionTotal === searchOptionsTotal);
                vm.collectionLinksMatch =  (collectionTotal === collectionLinksTotal);
              }
            }
          }
        });


      // self-executing
      _init();

    }
  ]);

})();


