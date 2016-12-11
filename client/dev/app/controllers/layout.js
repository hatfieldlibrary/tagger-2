(function () {

  'use strict';

  /*globals taggerControllers*/

  /**
   * Layout controller for updating the collection area.
   * This controller initializes and updates the singleton
   * used by other controllers.  It effectively initializes
   * the application and updates global state.
   */
  taggerControllers.controller('LayoutCtrl', [

    '$scope',
    '$timeout',
    '$mdSidenav',
    '$log',
    'AreaList',
    'CollectionsByArea',
    'TagsForCollection',
    'TypesForCollection',
    'CategoryList',
    'CategoryByArea',
    'ContentTypeList',
    'TagList',
    'TagsForArea',
    'getUserInfo',
    'AreaObserver',
    'AreaListObserver',
    'Data',
    function ($scope,
              $timeout,
              $mdSidenav,
              $log,
              AreaList,
              CollectionsByArea,
              TagsForCollection,
              TypesForCollection,
              CategoryList,
              CategoryByArea,
              ContentTypeList,
              TagList,
              TagsForArea,
              getUserInfo,
              AreaObserver,
              AreaListObserver,
              Data) {

      var vm = this;

      vm.authorized = false;

      /** @type {number} */
      vm.currentIndex = 0;

      /** @type {Array.<Object>} */
      vm.areas = [];

      /** @type {number} */
      vm.currentId = 0;

      /** @type {number} */
      vm.userAreaId = 0;


      AreaObserver.subscribe(function onNext() {

        const areaId = AreaObserver.get();
        // The userAreaId can be zero (administrator).
        // Set the view model user area id before continuing.
        vm.userAreaId = areaId;

        var areas = AreaList.query();
        areas.$promise.then(function (data) {

          vm.areas = data;
          Data.areas = data;

          // update list observer
          AreaListObserver.set(data);

          // Assure we have a non-zero area id.
          // For the admin user, this method will
          // return the id of the first area.
          var actualId = setAreaId(areaId);

          // Continue updating the context using
          // the area id.
          Data.currentAreaIndex = actualId;
          vm.currentId = actualId;
          initializeApp(actualId);

        });
      });

      AreaListObserver.subscribe(function onNext() {

        const areas = AreaListObserver.get();
        console.log('got new area list');
        vm.currentId = areas[0].id;
        vm.areas = areas;
        Data.areaLabel = areas[0].title;
        updateAreaContext(vm.currentId);


      });


      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      /*jshint unused: false*/
      function debounce(func, wait, context) {
        var timer;

        return function debounced() {
          var context = $scope,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function () {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }

      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
        return debounce(function () {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug('toggle ' + navID + ' is done');
            });
        }, 200);
      }

      vm.toggleLeft = buildDelayedToggler('left');

      $scope.$watch(function () {
          return Data.isAuth;
        },
        function (newValue, oldValue) {
             if (newValue === true) {
               vm.authorized = true;
               vm.userName = Data.user.name;
               vm.userPicture = Data.user.picture;
             }

        });

      /**
       * Watches for update to the user's area. Data.userAreaId should change
       * only when the app is loaded.  The value is obtained in the Passport
       * OAUTH login procedure and is used here to initialize state.
       */
      // $scope.$watch(function () {
      //     return Data.userAreaId;
      //   },
      //   function (newValue, oldValue) {
      //
      //
      //     // In initial state, userAreaId is null (object).
      //     if (typeof(newValue) === 'number') {
      //
      //       // The userAreaId can be zero (administrator).
      //       // Set the view model user area id before continuing.
      //       vm.userAreaId = newValue;
      //
      //       if (newValue !== oldValue) {
      //
      //         var areas = AreaList.query();
      //
      //         areas.$promise.then(function (data) {
      //
      //           vm.areas = data;
      //           Data.areas = data;
      //
      //           console.log(vm.areas)
      //
      //           // Assure we have a non-zero area id.
      //           // For the admin user, this method will
      //           // return the id of the first area.
      //           var actualId = setAreaId(newValue);
      //
      //           // Continue updating the context using
      //           // the area id.
      //           Data.currentAreaIndex = actualId;
      //           vm.currentId = actualId;
      //           initializeApp(actualId);
      //
      //         });
      //
      //       }
      //     }
      //
      //   });

      /**
       * Sets the role of the user based on the
       * area to which they belong. Called on the
       * initial page load after successful authentication.
       * @param areaId the current area id
       */
      function getRole(areaId) {

        console.log('area id is ' + areaId);

        // update the app state
        Data.userAreaId = areaId;
        //oberver test
        AreaObserver.set(areaId);
        // set the string
        vm.role = getUserRole(areaId);
        // set area default for non-admin user
        if (areaId > 0) {
          Data.currentAreaIndex = areaId;
        }
      }

      /**
       * Returns the user role based on the area id in their
       * user profile.
       * @param areaId
       * @returns string for role
       */
      function getUserRole(areaId) {

        if (areaId === 0) {
          return 'Administrator';
        } else {
          return 'Area Maintainer';
        }

      }

      vm.authorized = function () {

        return vm.isAuth;

      };

      function retrieveUserInfo() {

        var userinfo = getUserInfo.query();
        userinfo.$promise.then(function (user) {
          console.log(user)
          Data.isAuth = true;
          Data.user = user;
          vm.userAreaId = user.areaId;
          Data.userAreaId = user.areaId;
          // observer test
          AreaObserver.set(user.areaId);
          getRole(user.areaId);
        }).catch(function(err) {
          console.log(err);
        });

      }

      /**
       * Convenience method for initialization.
       */
      function initializeApp(userAreaId) {

        vm.areaLabel = getAreaLabel(userAreaId);
        Data.areaLabel = vm.areaLabel;
        // Continue initialization.
        setContext(userAreaId);
      }


      /**
       * Look up area label at initialization.
       * @param id  the area id
       */
      function getAreaLabel(id) {
        for (var i = 0; i < Data.areas.length; i++) {
          if (Data.areas[i].id === id) {
            return Data.areas[i].title;
          }
        }
        return;
      }

      /**
       * Update the current area.
       * @param id the area id
       * @param index the position of the area in the
       *          current area array
       */
      vm.updateArea = function (id, index) {
        if (Data.userAreaId === 0) { // admin user
          // update area id after user input
          Data.currentAreaIndex = id;
          Data.areaLabel = Data.areas[index].title;
          updateAreaContext(id);
        }


      };

      /**
       * Set the selected option index.
       * @param index
       */
      vm.setCurrentIndex = function (index) {
        vm.currentIndex = index;

      };

      /**
       * Initializes the shared Data context with global
       * values not specific to the area.
       * @param id   the area id
       */
      function setContext(id) {

        if (typeof(id) === 'number') {

          // Initialize global categories.
          var categories = CategoryList.query();
          categories.$promise.then(function (data) {
            Data.categories = data;
            Data.currentCategoryIndex = data[0].id;
          });

          // Initialize global tags.
          var tags = TagList.query();
          tags.$promise.then(function (data) {
            if (data.length > 0) {

              Data.tags = data;
              Data.currentTagIndex = data[0].id;
            }
          });

          // Initialize global content types
          var types = ContentTypeList.query();
          types.$promise.then(function (data) {
            if (data.length > 0) {
              Data.contentTypes = data;
              Data.currentContentIndex = data[0].id;
            }

          });

          updateAreaContext(id);

        }

      }

      /**
       * Updates the shared Data context with new area information for
       * collections, tags and content groups.
       * @param id   the area id
       */
      function updateAreaContext(id) {

        if (typeof(id) === 'number') {
          // Set collections for area collections.
          var collections = CollectionsByArea.query({areaId: id});
          collections.$promise.then(function (data) {

            if (data !== undefined) {

              if (data.length > 0) {
                // Set the new collection information.
                Data.collections = data;
                Data.currentCollectionIndex = data[0].Collection.id;
                Data.tagsForCollection =
                  TagsForCollection.query({collId: Data.currentCollectionIndex});
                Data.typesForCollection =
                  TypesForCollection.query({collId: Data.currentCollectionIndex});
              } else {
                // No collections for area.  Reset.
                Data.collections = [];
                Data.currentCollectionIndex = -1;
              }
            }

          });

          // Get subject tags for area.
          var tagsForArea = TagsForArea.query({areaId: id});
          tagsForArea.$promise.then(function (data) {
            if (data.length > 0) {
              Data.tagsForArea = data;
            }
          });
          // Get collection groups for area.
          var categoriesForArea = CategoryByArea.query({areaId: id});
          categoriesForArea.$promise.then(function (categories) {
            if (categories.length > 0) {
              Data.categoriesForArea = categories;
            }
          });
        }
      }


      /**
       * Updates the area list and selected area id
       * values when areas change.   Changes occur when
       * area is added or deleted, or when the position
       * attribute of the area is changed.
       */
      // $scope.$watch(function () {
      //     return Data.areas;
      //   },
      //   function (newValue, oldValue) {
      //     // Verify that the list is being update rather
      //     // than initialized for the first time.
      //     if (oldValue.length > 0) {
      //       console.log('got new area list');
      //       vm.currentId = Data.areas[0].id;
      //       vm.areas = newValue;
      //       console.log(vm.areas)
      //       Data.areaLabel = Data.areas[0].title;
      //       updateAreaContext(vm.currentId);
      //       $scope.$apply();
      //     }
      //
      //   });


      /**
       * Administrators will be assigned to the non-existing
       * area id of zero.  This method assigns a real area
       * id to the administrator session, otherwise returns
       * the area id for the collection manager.
       * @param id
       * @returns {*}
       */
      function setAreaId(id) {
        if (id === 0) {
          return Data.areas[0].id;
        } else {
          return id;
        }
      }

      vm.$onInit = function () {
        retrieveUserInfo();
      }

    }]);

})();


