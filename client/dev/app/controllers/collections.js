(function () {

  'use strict';

  /*globals taggerControllers*/

  /**
   * Controller for managing collections.
   */
  taggerControllers.controller('CollectionCtrl', [

    '$scope',
    '$resource',
    'CollectionsByArea',
    'CollectionById',
    'CollectionUpdate',
    'TagsForCollection',
    'TypesForCollection',
    'TagsForArea',
    'CategoryList',
    'CategoryByArea',
    'AreaObserver',
    'UserAreaObserver',
    'CollectionObserver',
    'CollectionListObserver',
    'CategoryListObserver',
    'CollectionTagsObserver',
    'CollectionTypesObserver',
    'ThumbImageObserver',
    'TaggerDialog',
    'TaggerToast',

    function ($scope,
              $resource,
              CollectionsByArea,
              CollectionById,
              CollectionUpdate,
              TagsForCollection,
              TypesForCollection,
              TagsForArea,
              CategoryList,
              CategoryByArea,
              AreaObserver,
              UserAreaObserver,
              CollectionObserver,
              CollectionListObserver,
              CategoryListObserver,
              CollectionTagsObserver,
              CollectionTypesObserver,
              ThumbImageObserver,
              TaggerDialog,
              TaggerToast) {

      var vm = this;

      /** @type {Object} */
      vm.collection = {};

      /** @type {Array.<Object>} */
      vm.collectionList = [];

      /** @type {Array.<Object>} */
      vm.categoryList = [];

      /** @type {number} */
      vm.collectionId = -1;

      /** @type {string} */
      vm.thumbnailImage = '';

      // Tag dialog message templates
      /** @type {string} */
      vm.addMessage = 'templates/addCollectionMessage.html';

      /** @type {string} */
      vm.deleteMessage = 'templates/deleteCollectionMessage.html';

      /** @type {string} */
      vm.updateImageMessage = 'templates/updateImageMessage.html';

      /** @type {number} */
      vm.userAreaId = UserAreaObserver.get();

      vm.noCollectionMessage = 'No collections for this area.';

      /** @type {Array.string} */
      vm.urlLabels = ['Add the collection URL, e.g.: http://host.domain.edu/wombats?type=hungry', 'Add the collection name for select option, e.g. wallulah'];

      /** @type {string} */
      vm.browseType = vm.urlLabels[0];


      ThumbImageObserver.subscribe(function onNext() {
        vm.thumbnailImage = ThumbImageObserver.get();
      });


      AreaObserver.subscribe(function onNext() {

        const areaId = AreaObserver.get();
        _getCategories();

        var collectionList = CollectionsByArea.query(
          {
            areaId: areaId
          }
        );
        collectionList.$promise.then(function (data) {
          vm.collectionList = data;
          vm.collectionId = data[0].id;
        });
      });


      CollectionObserver.subscribe(function onNext() {
        const id = CollectionObserver.get();
        vm.collectionId = id;
        _getCollectionById(id);
      });

      vm.getCollectionById = function (id) {
        CollectionObserver.set(id);
      };

      CollectionListObserver.subscribe(function onNext() {
        vm.collectionList = CollectionListObserver.get();
      });

      /**
       * Show the $mdDialog.
       * @param $event click event object (location of event used as
       *                    animation starting point)
       * @param message  html template to display in dialog
       */
      vm.showDialog = function ($event, message) {
        new TaggerDialog($event, message);
      };

      /**
       * Updates the collection and reloads the collection
       * list for the current area upon success.
       */
      vm.updateCollection = function () {

        var update = CollectionUpdate.save({
          id: vm.collection.id,
          title: vm.collection.title,
          url: vm.collection.url,
          description: vm.collection.description,
          dates: vm.collection.dates,
          repoType: vm.collection.repoType,
          category: vm.collection.category,
          items: vm.collection.items,
          browseType: vm.collection.browseType,
          restricted: vm.collection.restricted,
          ctype: vm.collection.ctype

        });
        update.$promise.then(function (data) {
          if (data.status === 'success') {
            vm.collectionList = CollectionsByArea.query(
              {
                areaId: AreaObserver.get()
              }
            );
            // Toast upon success
            new TaggerToast('Collection Updated');
          }
        });

      };

      function _getCategories() {

        var cats = CategoryByArea.query(
          {
            areaId: AreaObserver.get()
          }
        );
        cats.$promise.then(function (data) {
          vm.categoryList = data;
        });

      }

      /**
       * Retrieves collection information, tags and
       * content types associated with the collection.
       * @param id  {number} the collection id
       */
      function _getCollectionById(id) {
        vm.collectionId = id;

        var col = CollectionById.query({id: id});
        col.$promise.then(function (data) {
          vm.collection = data;
          vm.thumbnailImage = data.image;
          ThumbImageObserver.set(data.image);
          // Set the browse options label, ouch, looks like a directive..
          if (data.browseType === 'opts') {
            vm.browseType = vm.urlLabels[1];
          }
        });

      }


      /**
       * Sets vm.browseType string for choosing the URL label.
       * @param type array index
       */
      vm.setBrowseType = function (index) {
        vm.browseType = vm.urlLabels[index];

      };

      vm.$onInit = () => {
        vm.collectionId = CollectionObserver.get();
        vm.getCollectionById(vm.collectionId);
        vm.categoryList = _getCategories();
        vm.collection.browseType = 'link';
        vm.collectionList = CollectionListObserver.get();


      };

      /**
       * Listens for event emitted after the collection has
       * been removed from and area.  This updates the collection
       * list in the current view in the event that the collection
       * was removed from the area currently in view.
       *
       * Updates the collection list on event.
       *
       * This could be observable on collection list.
       */
      $scope.$on('removedFromArea', function () {
        vm.collectionList = CollectionsByArea.query(
          {
            areaId: AreaObserver.get()
          }
        );

      });

    }]);

})();



