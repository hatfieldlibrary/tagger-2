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
                          CategoriesByCollection,
                          AreaObserver,
                          UserAreaObserver,
                          CollectionObserver,
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
      _checkCategory(id)
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
        vm.collectionId = data.id;
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
     * Checks the status of the category, if one has
     * been assigned previously.  Categories are specific
     * to an area. Collections can live in more than
     * one area.
     * @param id
     * @private
     */
    function _checkCategory(id) {
      if (id > 0) {
        var categories = CategoriesByCollection.query({collId: id});
        categories.$promise.then(function (cats) {
          if (cats.length > 0) {
            let area = AreaObserver.get();
            if (cats[0].Category.areaId == area) {
              // The current category belongs to this area.
              _getCategories();
              vm.showCollectionCategories = true;
            } else {
              // The current category belongs to a different area.
              // Do not offer edit option.
              vm.showCollectionCategories = false;
            }
          } else {
            // Not category has been chosen yet for this collection.
            vm.showCollectionCategories = true;
          }
        });
      }

    }


    vm.overrideCategory = function() {
      vm.showCollectionCategories = true;
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

      let collection = CollectionObserver.get();

      if (collection) {
        vm.collectionId = collection;
        _getCollectionById(collection);
      } else {
        _getCollectionForNewArea(AreaObserver.get());
      }
      _checkCategory(collection);
    }
  }


  taggerComponents.component('collectionForm', {

    templateUrl: 'templates/component/collection-form.html',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
