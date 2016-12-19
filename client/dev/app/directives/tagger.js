/**
 * Tagger UI directives.
 */

(function () {

  'use strict';

  /*globals taggerDirectives*/


  /**
   * Directive used to detect when a DOM element is ready.
  //  */
  // taggerDirectives.directive('elemReady', function ($parse) {
  //   return {
  //     restrict: 'A',
  //     scope: false,
  //     link: function ($scope, elem, attrs) {
  //       elem.ready(function () {
  //         $scope.$apply(function () {
  //           var func = $parse(attrs.elemReady);
  //           func($scope);
  //         });
  //       });
  //     }
  //   };
  //
  // });
  //
  // /**
  //  * Directive used by the Collection Manager function of
  //  * adding or removing subject tags from the area that
  //  * the manager maintains.
  //  */
  // taggerDirectives.directive('toggleTagAreaButton', [
  //
  //   'TaggerToast',
  //   'TagTargets',
  //   'TagTargetRemove',
  //   'TagTargetAdd',
  //   'TaggerDialog',
  //   'Data',
  //
  //   function (TaggerToast,
  //             TagTargets,
  //             TagTargetRemove,
  //             TagTargetAdd,
  //             TaggerDialog,
  //             Data) {
  //
  //     return {
  //       restrict: 'E',
  //       scope: {
  //         tagId: '@',
  //         tagName: '@'
  //       },
  //       template: '<div style="width: 20%;float:left;">' +
  //       '   <md-button class="{{buttonClass}} md-raised"  ng-click="showDialog($event, tagId);">' +
  //       '     {{buttonText}}' +
  //       '     <div class="md-ripple-container"></div>' +
  //       '   </md-button>' +
  //       '</div>' +
  //       '<div style="width: 80%;float:left;line-height: 3.3rem;" class="{{textClass}} md-subhead">' +
  //       '   {{tagName}}' +
  //       '</div>',
  //
  //       /* jshint unused:false  */
  //       link: function (scope, elem, attrs) {
  //
  //         var removeMessage = 'templates/removeTagFromAreaMessage.html';
  //         var addMessage = 'templates/addTagToAreaMessage.html';
  //         var targetList = [];
  //         scope.buttonClass = '';
  //
  //
  //         /**
  //          * Init the list.
  //          */
  //         scope.init = function () {
  //           var targets = TagTargets.query({tagId: scope.tagId});
  //           targets.$promise.then(function (data) {
  //             targetList = data;
  //             scope.checkArea();
  //           });
  //         };
  //
  //
  //         /**
  //          * Show the $mdDialog.
  //          * @param $event click event object (location of event used as
  //          *                    animation starting point)
  //          * @param message  html to display in dialog
  //          */
  //         scope.showDialog = function ($event, tagId) {
  //
  //           var message = '';
  //           Data.currentTagIndex = tagId;
  //
  //           if (findArea(Data.currentAreaIndex, targetList)) {
  //             message = removeMessage;
  //           }
  //           else {
  //             message = addMessage;
  //           }
  //
  //           new TaggerDialog($event, message, scope.tagId);
  //
  //         };
  //
  //         scope.init();
  //
  //         /**
  //          * Sets CSS class based on whether tag is currently in list of
  //          * tags associated with the area.
  //          */
  //         scope.checkArea = function () {
  //
  //           if (findArea(Data.currentAreaIndex, targetList)) {
  //             scope.buttonClass = 'md-warn';
  //             scope.buttonIcon = 'clear';
  //             scope.buttonText = 'Remove';
  //             scope.textClass = 'grey-label';
  //           } else {
  //             scope.textClass = 'grey-item';
  //             scope.buttonClass = 'md-accent';
  //             scope.buttonText = 'Add';
  //             scope.buttonIcon = 'add';
  //           }
  //         };
  //
  //         /**
  //          * Private method. Searches for area id in the current list of
  //          * area associations.
  //          * @param areaId  {number} the area ID
  //          * @param tar  {Array.<Object>} the areas associated with the collection.
  //          * @returns {boolean}
  //          */
  //         var findArea = function (areaId, tar) {
  //           var targets = tar;
  //           for (var i = 0; i < targets.length; i++) {
  //             if (targets[i].AreaId === areaId) {
  //               return true;
  //             }
  //           }
  //           return false;
  //         };
  //
  //
  //         /**
  //          * Watch for new area list.
  //          */
  //         scope.$watch(function () {
  //             return Data.tags;
  //           },
  //           function () {
  //             scope.init();
  //           });
  //
  //       }
  //     };
  //   }
  //
  // ]);

  /**
   * Private method. Searches for area id in the current list of
   * area associations.
   * @param areaId  {number} the area ID
   * @param tar  {Array.<Object>} the areas associated with the collection.
   * @returns {boolean}
   */
  var findArea = function (areaId, tar) {
    var targets = tar;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].AreaId === areaId) {
        return true;
      }
    }
    return false;
  };



  /**
   * Directive for adding TAG information to the OVERVIEW.
   */
  taggerDirectives.directive('subjectTagSummary', function () {

    return {
      restrict: 'E',
      scope: {},
      template: '<div style="margin-top: 40px;padding: 5px;font-size: 0.85em;"><p class=" grey-label">{{subjects}}</p></div>',
      controller: function ($scope,
                            TagCountForArea,
                            Data) {

        $scope.subjects = '';

        function init() {

          if (Data.currentAreaIndex !== null) {
            var subList = '';
            var subs = TagCountForArea.query({areaId: Data.currentAreaIndex});
            subs.$promise.then(function (data) {
              for (var i = 0; i < data.length; i++) {
                subList = subList + data[i].name + ' (' + data[i].count + ')';
                if (i < data.length - 1) {
                  subList = subList + ', ';
                }
              }
              $scope.subjects = subList;
            });
          }
        }

        init();

        $scope.$watch(function () {
            return Data.currentAreaIndex;
          },
          function (newValue, oldValue) {
            if (newValue !== oldValue) {
              init();
            }
          });
      }
    };

  });

  /**
   * Directive for adding a SEARCH OPTION SUMMARY to the OVERVIEW.
   */
  // taggerDirectives.directive('searchOptionSummary', function () {
  //
  //   return {
  //     restrict: 'E',
  //     scope: {},
  //     template: '<md-list style="width:100%;margin-top: 40px;">' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label">Search & Browse</p>' +
  //     '       <p class="list-alignment"> {{default}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label">Browse Only</p>' +
  //     '       <p class="list-alignment"> {{browse}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label">Search Only</p>' +
  //     '     <p class="list-alignment"> {{search}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '</md-list>',
  //
  //     controller: function ($scope,
  //                           SearchOptionType,
  //                           Data) {
  //
  //       $scope.default = 0;
  //       $scope.search = 0;
  //       $scope.browse = 0;
  //
  //       function init() {
  //         if (Data.currentAreaIndex !== null) {
  //           var types =
  //             SearchOptionType.query({areaId: Data.currentAreaIndex});
  //           types.$promise.then(function (data) {
  //             for (var i = 0; i < data.length; i++) {
  //               if (data[i].repoType === 'DEFAULT') {
  //                 $scope.default = data[i].count;
  //               } else if (data[i].repoType === 'SEARCH') {
  //                 $scope.search = data[i].count;
  //               } else if (data[i].repoType === 'BROWSE') {
  //                 $scope.browse = data[i].count;
  //               }
  //             }
  //             Data.searchOptionsTotal = $scope.default + $scope.search + $scope.browse;
  //           });
  //         }
  //       }
  //
  //       init();
  //
  //       $scope.$watch(function () {
  //           return Data.currentAreaIndex;
  //         },
  //         function (newValue, oldValue) {
  //           if (newValue !== undefined) {
  //             if (newValue !== oldValue) {
  //               init();
  //             }
  //           }
  //         });
  //     }
  //   };
  // });

  /**
   * Directive for adding a CONTENT TYPE SUMMARY information to the OVERVIEW.
   */
  // taggerDirectives.directive('collectionTypeSummary', function () {
  //
  //   return {
  //     restrict: 'E',
  //     scope: {},
  //     template: '<md-list style="width:100%;margin-top: 40px;">' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label">Collection</p>' +
  //     '       <p class="list-alignment"> {{digCount}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label">Single Item</p>' +
  //     '       <p class="list-alignment"> {{itmCount}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label">Finding Aid</p>' +
  //     '     <p class="list-alignment"> {{eadCount}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '</md-list>',
  //
  //     controller: function ($scope,
  //                           CollectionTypeCount,
  //                           Data) {
  //
  //       $scope.digCount = 0;
  //       $scope.itmCount = 0;
  //       $scope.eadCount = 0;
  //
  //       function init() {
  //
  //         if (Data.currentAreaIndex !== null) {
  //           var types =
  //             CollectionTypeCount.query({areaId: Data.currentAreaIndex});
  //           types.$promise.then(function (data) {
  //             for (var i = 0; i < data.length; i++) {
  //               if (data[i].ctype === 'dig') {
  //                 $scope.digCount = data[i].count;
  //               } else if (data[i].ctype === 'itm') {
  //                 $scope.itmCount = data[i].count;
  //               } else if (data[i].ctype === 'aid') {
  //                 $scope.eadCount = data[i].count;
  //               }
  //             }
  //             Data.collectionTypeTotal = $scope.digCount + $scope.itmCount + $scope.eadCount;
  //           });
  //         }
  //       }
  //
  //       init();
  //
  //       $scope.$watch(function () {
  //           return Data.currentAreaIndex;
  //         },
  //         function (newValue, oldValue) {
  //           if (newValue !== undefined) {
  //             if (newValue !== oldValue) {
  //               init();
  //             }
  //           }
  //         });
  //     }
  //   };
  // });
  //

  /**
   * Directive for adding COLLECTION LINKS SUMMARY information to the OVERVIEW.
   */
  // taggerDirectives.directive('linkSummary', [function () {
  //   return {
  //     restrict: 'E',
  //     scope: {},
  //     template: '<md-list style="width:100%;margin-top: 40px;">' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label"> Link</p>' +
  //     '       <p class="list-alignment"> {{linkCount}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '   <md-list-item>' +
  //     '     <p class="grey-label"> Selection Menu</p>' +
  //     '     <p class="list-alignment"> {{selectCount}}</p>' +
  //     '   </md-list-item>' +
  //     '   <md-divider/>' +
  //     '</md-list>',
  //
  //     controller: function ($scope,
  //                           CollectionLinkCount,
  //                           Data) {
  //
  //       $scope.linkCount = 0;
  //       $scope.selectCount = 0;
  //
  //
  //       function init() {
  //         if (Data.currentAreaIndex !== null) {
  //           var types =
  //             CollectionLinkCount.query({areaId: Data.currentAreaIndex});
  //           types.$promise.then(function (data) {
  //             for (var i = 0; i < data.length; i++) {
  //               if (data[i].browseType === 'link') {
  //                 $scope.linkCount = data[i].count;
  //               } else if (data[i].browseType === 'opts') {
  //                 $scope.selectCount = data[i].count;
  //               }
  //             }
  //             Data.collectionLinksTotal = $scope.linkCount + $scope.selectCount;
  //           });
  //         }
  //       }
  //
  //       init();
  //
  //       $scope.$watch(function () {
  //           return Data.currentAreaIndex;
  //         },
  //         function (newValue, oldValue) {
  //           if (newValue !== oldValue) {
  //             init();
  //           }
  //         });
  //     }
  //   };
  //
  // }]);


  /**
   * Directive for the thumbnail image on collection page.
   */
  // taggerDirectives.directive('thumbImage', function () {
  //   return {
  //     restrict: 'E',
  //     scope: {
  //       imgname: '@'
  //     },
  //     template: '<img style="max-width: 120px;" ng-src="{{thumbnailsrc}}">',
  //     link: function ($scope) {
  //
  //       $scope.$watch(function () {
  //           return $scope.imgname;
  //         },
  //         function (newValue) {
  //           if (newValue.length > 0) {
  //             $scope.thumbnailsrc = '/resources/img/thumb/' + newValue;
  //           } else {
  //             $scope.thumbnailsrc = '';
  //           }
  //         });
  //     }
  //
  //   };
  // });


})();
