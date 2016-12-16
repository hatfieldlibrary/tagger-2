//
// (function() {
//
//   'use strict';
//
//   /*globals taggerControllers*/
//
//   /**
//    * Controller for managing subject tags.
//    */
//   taggerControllers.controller('TagCtrl', [
//
//     '$rootScope',
//     '$scope',
//     '$animate',
//     'TagList',
//     'TagById',
//     'TagUpdate',
//     'TagsForArea',
//     'TaggerToast',
//     'TaggerDialog',
//     'UserAreaObserver',
//     'AreaObserver',
//     'AreaLabelObserver',
//     'TagListObserver',
//     'TagObserver',
//     'UserAreaObserver',
//
//     function(
//       $rootScope,
//       $scope,
//       $animate,
//       TagList,
//       // TagById,
//       TagUpdate,
//       TagsForArea,
//       TaggerToast,
//       TaggerDialog,
//       UserAreaObserver,
//       AreaObserver,
//       AreaLabelObserver,
//       TagListObserver,
//       TagObserver
//      ) {
//
//       var vm = this;
//
//       /** @type {number} */
//       vm.currentTag = 10000;
//
//       /** @type {number} */
//       vm.userAreaId = UserAreaObserver.get();
//
//       /* Tag dialog messages */
//       /** @type {string} */
//       vm.addMessage = 'templates/dialog/addTagMessage.html';
//
//       /** @type {string} */
//       vm.deleteMessage = 'templates/deleteTagMessage.html';
//
//       /** @type {string} */
//       vm.areaLabel = AreaLabelObserver.get();
//
//       /** @type {number} */
//       vm.userAreaId = UserAreaObserver.get();
//
//       /** @type {Array.<Object>} */
//       vm.tags = TagListObserver.get();
//
//       /** @type {Object} */
//       vm.tag = TagObserver.get();
//
//       if (vm.tag) {
//         /** @type {number} */
//         vm.currentTag = vm.tag.id;
//       }
//
//       AreaLabelObserver.subscribe(function onNext() {
//         vm.areaLabel = AreaLabelObserver.get();
//       });
//
//       /**
//        * Watches for new tags in the shared context. This watch
//        * should pick up area context changes and the updated tag list
//        * after adding or deleting a tag.
//        */
//       AreaObserver.subscribe(function onNext() {
//         vm.resetTag(AreaObserver.get());
//       });
//
//       TagListObserver.subscribe(function onNext() {
//           vm.tags = TagListObserver.get();
//       });
//
//       TagObserver.subscribe(function onNext() {
//          vm.currentTag = TagObserver.get();
//          _setCurrentTag(vm.currentTag);
//       });
//
//       function _setCurrentTag(tagId) {
//         TagById.query({id: tagId}).$promise.then(function(data) {
//           vm.tag = data;
//         });
//       }
//       /**
//        * Show the $mdDialog.
//        * @param $event click event object (location of event used as
//        *                    animation starting point)
//        * @param message  html to display in dialog
//        */
//       vm.showDialog = function ($event, message) {
//         new TaggerDialog($event, message);
//       };
//
//       /**
//        * Get the tag by ID. If the id is null, defaults to the currentTagIndex (id)
//        * @param id the id of the newly chosen tag
//        */
//       vm.resetTag = function(id) {
//         if (id !== null) {
//           TagObserver.set(id);
//           vm.currentTag = id;
//         }
//         //vm.tag = TagById.query({id:  id});
//       };
//
//       /**
//        * Updates tag information and retrieves new
//        * tag list upon success.
//        */
//       vm.updateTag = function() {
//
//         var success = TagUpdate.save({
//           id: vm.tag.id,
//           name: vm.tag.name
//
//         });
//         success.$promise.then(function(data) {
//           if (data.status === 'success') {
//             vm.tags =TagList.query();
//
//             // Toast upon success
//             new TaggerToast('Tag Updated');
//           }
//         });
//
//       };
//
//       vm.$onInit = function () {
//           const tagId = TagObserver.get();
//           vm.currentTag = tagId;
//           _setCurrentTag(tagId);
//       }
//
//
//     }]);
//
//
// })();
//
