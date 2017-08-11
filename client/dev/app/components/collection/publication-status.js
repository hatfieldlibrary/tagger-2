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
 * Set pub status for a collection.
 *
 * Created by mspalti on 12/22/16.
 */
(function () {

  'use strict';

  function PublicationController(UpdatePublicationStatus,
                                 GetPublicationStatus,
                                 CollectionObservable,
                                 PublicationStatusObservable,
                                 TaggerToast) {

    const ctrl = this;

    function _setSubscriptions() {
      /**
       * Watch for new collection id.
       * Update the pub status when collection changes.
       */
      CollectionObservable.subscribe((id) => {

        const status = GetPublicationStatus.query({collId: id});
        status.$promise.then(function (pub) {
          ctrl.pubstatus = pub.published;
          _setPubMessage(pub.published);
          PublicationStatusObservable.set(pub.published);
        });

      });
    }

    ctrl.onChange = function (state) {
      if (state) {
        ctrl.message = 'Published';
      }
      else {
        ctrl.message = 'Unpublished';
      }
      const update = UpdatePublicationStatus.query({collId: CollectionObservable.get(), status: state});
      update.$promise.then(function (data) {
        if (data.status === 'success') {

          TaggerToast.toast('Publication Status Changed.');
          PublicationStatusObservable.set(state);
        } else {
          TaggerToast.toast('WARNING: Unable to update publication status!');
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

      _setSubscriptions();

      // initial pub status.
      const status = GetPublicationStatus.query({collId: CollectionObservable.get()});
      status.$promise.then(function (pub) {
        ctrl.pubstatus = pub.published;
        _setPubMessage(pub.published);
        PublicationStatusObservable.set(pub.published);
      });
    };

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
