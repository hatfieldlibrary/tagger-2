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
    'AreaLabelObserver',
    'AreaListObserver',
    'IsAuthObserver',
    'UserObserver',
    'UserAreaObserver',
    'TagsForAreaObserver',
    'CollectionTagsObserver',
    'CollectionTypesObserver',
    'CollectionListObserver',
    'CollectionObserver',
    'TagObserver',
    'TagsListObserver',
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
              AreaLabelObserver,
              AreaListObserver,
              IsAuthObserver,
              UserObserver,
              UserAreaObserver,
              TagsForAreaObserver,
              CollectionTagsObserver,
              CollectionTypesObserver,
              CollectionListObserver,
              CollectionObserver,
              TagObserver,
              TagsListObserver,
              Data) {


      var vm = this;

      vm.authorized = false;

      /** @type {number} */
      vm.currentIndex = 0;

      /** @type {Array.<Object>} */
      vm.areas = [];

      /** @type {number} */
      vm.currentAreaId = 0;

      /** @type {number} */
      vm.userAreaId = 0;

      vm.toggleLeft = buildDelayedToggler('left');

      vm.authorized = function () {
        return vm.isAuth;

      };
      /**
       * Update the current area.
       * @param id the area id
       * @param index the position of the area in the
       *          current area array
       */
      vm.updateArea = function (id, index) {
        if (UserAreaObserver.get() === 0) { // admin user
          // update area id after user input
          AreaObserver.set(id);
          //Data.currentAreaIndex = id;
          const areas = AreaListObserver.get();
          AreaLabelObserver.set(areas[index].title);
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
       * Watches for update to the user's area. Data.userAreaId should change
       * only when the app is loaded.  The value is obtained in the Passport
       * OAUTH login procedure and is used here to initialize state. (If only
       * used here, why the observable?
       */
      UserAreaObserver.subscribe(function onNext() {
        vm.userAreaId = UserAreaObserver.get();
        if (vm.userAreaId === 0) {

          var areas = AreaList.query();
          areas.$promise.then(function (data) {
            vm.areas = data;
            AreaListObserver.set(data);
            AreaObserver.set(data[0].id);
            vm.currentAreaId = setAreaId(data[0].id);
            setContext();

          });
        }
        else {
          vm.currentAreaId = id;
          setContext();
        }
      });

      AreaObserver.subscribe(function onNext() {

      });



      AreaListObserver.subscribe(function onNext() {

        const areas = AreaListObserver.get();
        console.log('got new area list');
        vm.currentAreaId = areas[0].id;
        vm.areas = areas;
        Data.areaLabel = areas[0].title;
        console.log('hello')
        updateAreaContext(vm.currentAreaId);

      });

      IsAuthObserver.subscribe(function onNext() {

        const auth = IsAuthObserver.get();
        if (auth) {
          vm.authorized = true;
        }

      });

      UserObserver.subscribe(function onNext() {
        const user = UserObserver.get();
        vm.userName = user.name;
        vm.userPicture = user.picture;
      });

      CollectionObserver.subscribe(function onNext() {

      });

      AreaLabelObserver.subscribe(function onNext() {

        vm.areaLabel = AreaLabelObserver.get();
      });

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
          return AreaObserver.get();
        } else {
          return id;
        }
      }

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

      /**
       * Sets the role of the user based on the
       * area to which they belong. Called on the
       * initial page load after successful authentication.
       * @param areaId the current area id
       */
      function getRole(areaId) {

        vm.role = getUserRole(areaId);
        // set area default for non-admin user
        if (areaId > 0) {
       //   AreaObserver.set(areaId);
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

      /**
       * Look up area label at initialization.
       * @param id  the area id
       */
      function getAreaLabel(id) {
        const areas = AreaListObserver.get();
        for (var i = 0; i < areas.length; i++) {
          if (areas[i].id === id) {
            return areas[i].title;
          }
        }
        return;
      }

      /**
       * Initializes the shared Data context with global
       * values not specific to the area.
       * @param id   the area id
       */
      function setContext() {

        vm.areaLabel = getAreaLabel(vm.currentAreaId);
        AreaLabelObserver.set(vm.areaLabel);
        const id = vm.currentAreaId;

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

              TagsListObserver.set(data);
              TagObserver.set(data[0].id);

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
                CollectionListObserver.set(data);
                CollectionObserver.set(data[0].Collection.id);
                // TagsForCollection.query({collId: CollectionObserver.get()})
                //   .$promise.then(function (data) {
                //     alert()
                //   CollectionTagsObserver.set(data);
                //});
                TypesForCollection.query({collId: CollectionObserver.get()})
                  .$promise.then(function (data) {
                  CollectionTypesObserver.set(data);
                });
              } else {
                // No collections for area.  Reset.
                Data.collections = [];
                CollectionListObserver.set([]);
                Data.currentCollectionIndex = -1;
                CollectionObserver.set(-1);
              }
            }

          });

          // Get subject tags for area.
          var tagsForArea = TagsForArea.query({areaId: id});
          tagsForArea.$promise.then(function (data) {
            if (data.length > 0) {
              //Data.tagsForArea = data;
              TagsForAreaObserver.set(data);
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

      vm.$onInit = function () {

        var userinfo = getUserInfo.query();
        userinfo.$promise.then(function (user) {

          IsAuthObserver.set(true);
          UserObserver.set(user);
          UserAreaObserver.set(user.areaId);
          getRole(user.areaId);

        }).catch(function (err) {
          console.log(err);
        });
      }

    }]);

})();


