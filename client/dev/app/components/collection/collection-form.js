/**
 * Created by mspalti on 12/14/16.
 */

(function () {

  'use strict';

  function FormController($scope,
                          CollectionsByArea,
                          CollectionById,
                          CollectionUpdate,
                          CategoryByArea,
                          AreaObserver,
                          UserAreaObserver,
                          CollectionObserver,
                          CollectionListObserver,
                          FirstCollectionInArea,
                          ThumbImageObserver,
                          TaggerToast) {

    const vm = this;

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

    /** @type {number} */
    vm.userAreaId = UserAreaObserver.get();

    vm.noCollectionMessage = 'No collections for this area.';


    ThumbImageObserver.subscribe(function onNext() {
      vm.thumbnailImage = ThumbImageObserver.get();
    });


    AreaObserver.subscribe(function onNext() {

      const areaId = AreaObserver.get();
      _getCategories();
      _getCollectionForNewArea(areaId);
      // var collectionList = CollectionsByArea.query(
      //   {
      //     areaId: areaId
      //   }
      // );
      // collectionList.$promise.then(function (data) {
      //   vm.collectionList = data;
      //   vm.collectionId = data[0].id;
      // });
    });


    CollectionObserver.subscribe(function onNext() {
      const id = CollectionObserver.get();
      vm.collectionId = id;
      _getCollectionById(id);
    });

    CollectionListObserver.subscribe(function onNext() {
      vm.collectionList = CollectionListObserver.get();
    });


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

    function _getCollectionForNewArea(areaId) {
      const first = FirstCollectionInArea.query({areaId: areaId});
      first.$promise.then(function (data) {
        vm.collection = data;
        vm.thumbnailImage = data.image;
        ThumbImageObserver.set(data.image);
      });
    }

    /**
     * Retrieves collection information, tags and
     * content types associated with the collection.
     * @param id  {number} the collection id
     */
    function _getCollectionById(id) {
      var col = CollectionById.query({id: id});
      col.$promise.then(function (data) {
        vm.collection = data;
        vm.thumbnailImage = data.image;
        ThumbImageObserver.set(data.image);
      });

    }



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


    /**
     * Sets vm.browseType string for choosing the URL label.
     * @param type array index
     */
    vm.setBrowseType = function (index) {
      vm.browseType = vm.urlLabels[index];

    };

    vm.$onInit = function () {
      vm.collectionId = CollectionObserver.get();
      _getCollectionById(vm.collectionId);
      vm.categoryList = _getCategories();
      vm.collection.browseType = 'link';
    }
  }


  taggerComponents.component('collectionForm', {

    templateUrl: 'templates/component/collection-form.html',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
