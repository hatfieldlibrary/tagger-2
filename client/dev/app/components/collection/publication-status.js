/*
 * Copyright (c) 2016.
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
 * Created by mspalti on 12/22/16.
 */
(function () {

  function PublicationController(UpdatePublicationStatus,
                                 GetPublicationStatus,
                                 CollectionObserver,
                                 PublicationStatusObserver,
                                 TaggerToast) {

    const ctrl = this;

    /**
     * Watch for new collection id.
     * Update the tags when collection changes.
     */
    CollectionObserver.subscribe(function onNext() {
      let collid = CollectionObserver.get();
      ctrl.collectionId = collid;
      const status = GetPublicationStatus.query({collId: ctrl.collectionId});
      status.$promise.then(function (pub) {
        ctrl.pubstatus = pub.published;
        _setPubMessage(pub.published);
        PublicationStatusObserver.set(pub.published);
      });

    });

    ctrl.pubstatus = false;

    ctrl.onChange = function (state) {
      if (state) {
        ctrl.message = 'Published';
      }
      else {
        ctrl.message = 'Unpublished';
      }
      const update = UpdatePublicationStatus.query({collId: ctrl.collectionId, status: state});
      update.$promise.then(function (data) {
        if (data.status === 'success') {
          new TaggerToast('Publication Status Changed.');
          PublicationStatusObserver.set(state);
        } else {
          new TaggerToast('WARNING: Unable to update publication status!');
          return {};
        }
      });
    };

    function _setPubMessage(status) {
      if (status) {
        ctrl.message = 'Published';
      } else {
        ctrl.message = 'Unpublished';
      }
    }

    ctrl.$onInit = function () {
      let id = CollectionObserver.get();
      const status = GetPublicationStatus.query({collId: id});
      status.$promise.then(function (pub) {
        console.log(pub);
        ctrl.pubstatus = pub.published;
        _setPubMessage(pub.published);
        PublicationStatusObserver.set(pub.published);
      });
    }

  }

  taggerComponents.component('pubStatusSwitch', {

    bindings: {
      collectionId: '@'
    },
    template: '<md-card flex>' +
    ' <md-card-content>' +
    '    <div layout="row">' +
    '  <md-switch ng-model="$ctrl.pubstatus" aria-label="Publication Status" ng-change="$ctrl.onChange($ctrl.pubstatus)" class="md-primary">' +
    '{{ $ctrl.message }} ' +
    '</md-switch>' +
    '     </div>' +
    ' </md-card-content>' +
    '</md-card>',
    controller: PublicationController

  });

})();
