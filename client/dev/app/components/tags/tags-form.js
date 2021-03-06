/*
 * Copyright (c) 2017.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 12/15/16.
 */

(function () {

  'use strict';

  function FormController(UserAreaObservable,
                          TagListObservable,
                          TagObservable,
                          TagById,
                          TagUpdate,
                          TagList,
                          TaggerToast) {

    const vm = this;

    function _setSubscriptions() {

      TagObservable.subscribe((id) => {
        _getTagInfo(id);
      });

      UserAreaObservable.subscribe((areaId) => {
        vm.userAreaId = areaId;
      });

    }

    function _getTagInfo(tagId) {
      const tag = TagById.query({id: tagId});
      tag.$promise.then(function (data) {
        vm.tag = data;
        vm.menu({id: vm.tag.id, title: vm.tag.name});
      });
    }

    vm.updateTag = function () {

      var success = TagUpdate.update({
        id: vm.tag.id,
        name: vm.tag.name

      });
      success.$promise.then(function (data) {
        if (data.status === 'success') {
          let tags = TagList.query();
          tags.$promise.then(function (list) {
            vm.tags = list;
            TagListObservable.set(list);
            // Toast upon success
            TaggerToast.toast('Tag Updated');
          });

        }
      });
    };

    vm.$onInit = function () {

      _setSubscriptions();

      vm.userAreaId = UserAreaObservable.get();
      let tagId = TagObservable.get();
      vm.tags = TagListObservable.get();
      if (tagId) {
        _getTagInfo(tagId);
      }
    };

  }

  taggerComponents.component('tagsForm', {

    bindings: {
      menu: '&'
    },
    template: '<md-content ng-if="vm.tag.id &gt; 0"  layout="row" layout-align="start start">' +
    ' <tag-list></tag-list>' +
    '   <md-card-content class="md-subhead grey-text" flex="80" layout="column">' +
    '     <md-button class="md-raised md-accent large-button" ng-show="vm.userAreaId==0" ng-click="vm.updateTag()">Update Tag </md-button>' +
    '      <md-input-container ng-show="vm.userAreaId==0">' +
    '        <label>Tag Name</label> ' +
    '       <input type="text" ng-model="vm.tag.name"/>' +
    '      </md-input-container>' +
    '     <div style="height: 507px; margin-bottom: 40px;overflow: auto;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc" flex="100" ng-show="vm.userAreaId &gt; 0">' +
    '       <md-content flex="flex"> ' +
    '      <md-list>' +
    '         <md-list-item ng-repeat="tag in vm.tags">' +
    '          <toggle-tag-area-button flex="100" tag-id="{{tag.id}}" tag-name="{{tag.name}}" area-id="vm.currentAreaIndex" ng-click="showDialog($event, vm.deleteMessage)"></toggle-tag-area-button>' +
    '         </md-list-item>' +
    '       </md-list>' +
    '     </md-content>' +
    '   </div>' +
    '  </md-card-content>' +
    '</md-content>',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
