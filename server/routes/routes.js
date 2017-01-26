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
'use strict';
module.exports = function(app,config){



  const userInfo = require('../../server/api/tagger/controllers/user-info');
  const tag = require('../../server/api/tagger/controllers/tags/admin');
  const apiTag = require('../api/tagger/controllers/tags/public');
  const tagTarget = require('../../server/api/tagger/controllers/tag-target.js');
  const area = require('../../server/api/tagger/controllers/area');
  const content = require('../../server/api/tagger/controllers/content');
  const collection = require('../api/tagger/controllers/collection/admin');
  const collectionArea = require('../api/tagger/controllers/collection/areas');
  const collectionTag = require('../api/tagger/controllers/collection/tags');
  const collectionType = require('../api/tagger/controllers/collection/types');
  const collectionImage = require('../api/tagger/controllers/collection/image');
  const apiCollection = require('../api/tagger/controllers/collection/public');
  const category = require('../../server/api/tagger/controllers/category');
  const users = require('../../server/api/tagger/controllers/users');
  /**
   * Indicates whether the request has an authenticated session.
   * @type {boolean}
   */
  const ensureAuthenticated = app.ensureAuthenticated;

  app.use('/rest/userinfo', ensureAuthenticated, (req, res) => {
    userInfo.returnUserInfo(req, res, config);
  });

  // COLLECTIONS
  app.use('/rest/collection/byId/:id', ensureAuthenticated, collection.byId);
  app.use('/rest/collection/show/list/:areaId', ensureAuthenticated, collection.list);
  app.use('/rest/collection/tags/:collId', apiCollection.tagsForCollection); // public
  app.use('/rest/collection/types/:collId', apiCollection.typesForCollection);  // public
  app.post('/rest/collection/add', ensureAuthenticated, collection.add);
  app.post('/rest/collection/delete', ensureAuthenticated, collection.delete);
  app.post('/rest/collection/update', ensureAuthenticated, collection.update);
  app.get('/rest/collection/repoTypeByArea/:areaId', ensureAuthenticated, collection.repoTypesByArea);
  app.get('/rest/collection/count/types/byArea/:areaId', ensureAuthenticated, collection.countCTypesByArea);
  app.get('/rest/collection/count/linkTypes/byArea/:areaId', ensureAuthenticated, collection.browseTypesByArea);
  app.get('/rest/collection/first/inArea/:areaId', ensureAuthenticated, collection.getFirstCollectionInArea);
  app.get('/rest/collection/:collId/pubstatus/:status', ensureAuthenticated, collection.setPublicationStatus);
  app.get('/rest/collection/:collId/pubstatus', ensureAuthenticated, collection.getPublicationStatus);
  app.post('/tagger/collection/image', ensureAuthenticated, function (req, res) {
    collectionImage.updateImage(req, res, config);
  });
  app.use('/rest/collection/areas/:collId', ensureAuthenticated, collectionArea.areas);
  app.get('/rest/collection/:collId/add/area/:areaId', ensureAuthenticated, collectionArea.addAreaTarget);
  app.get('/rest/collection/:collId/remove/area/:areaId', ensureAuthenticated, collectionArea.removeAreaTarget);
  app.get('/rest/collection/:collId/add/tag/:tagId', ensureAuthenticated, collectionTag.addTagTarget);
  app.get('/rest/collection/:collId/remove/tag/:tagId', ensureAuthenticated, collectionTag.removeTagTarget);
  app.get('/rest/collection/:collId/add/type/:typeId', ensureAuthenticated, collectionType.addTypeTarget);
  app.get('/rest/collection/:collId/remove/type/:typeId', ensureAuthenticated, collectionType.removeTypeTarget);

  // AREAS
  app.use('/rest/area/byId/:id', area.byId);  // used by public and admin views, no authentication
  app.use('/rest/areas',         area.list);  // used by public and admin views, no authentication
  app.post('/rest/area/add', ensureAuthenticated, area.add);
  app.post('/rest/area/delete', ensureAuthenticated, area.delete);
  app.post('/rest/area/update', ensureAuthenticated, area.update);
  app.post('/rest/area/reorder', ensureAuthenticated, area.reorder);

  // CATEGORIES
  app.get('/rest/category/byId/:id', ensureAuthenticated, category.byId);
  app.get('/rest/category/show/list', ensureAuthenticated, category.list);
  app.get('/rest/category/byArea/:areaId', ensureAuthenticated, category.listByArea);
  app.get('/rest/category/count/:areaId', ensureAuthenticated, category.categoryCountByArea);
  app.post('/rest/category/add', ensureAuthenticated, category.add);
  app.post('/rest/category/update', ensureAuthenticated, category.update);
  app.post('/rest/category/delete', ensureAuthenticated, category.delete);
  app.get('/rest/category/getCollections/:collId', ensureAuthenticated, category.collectionsByCategory);

  // CONTENT TYPES
  app.use('/rest/content/byId/:id', ensureAuthenticated, content.byId);
  app.use('/rest/content/show/list', ensureAuthenticated, content.list);
  app.get('/rest/content/byArea/count/:areaId', ensureAuthenticated, content.countByArea);
  app.post('/rest/content/add', ensureAuthenticated, content.add);
  app.post('/rest/content/delete', ensureAuthenticated, content.delete);
  app.post('/rest/content/update', ensureAuthenticated, content.update);

  // TAGS
  app.use('/rest/tag/byId/:id', ensureAuthenticated, tag.byId);
  app.use('/rest/tag/show/list', tag.list);
  app.use('/rest/tags/byArea/:areaId', ensureAuthenticated, tag.tagByArea);
  app.post('/rest/tag/add', ensureAuthenticated, tag.add);
  app.post('/rest/tag/delete', ensureAuthenticated, tag.delete);
  app.post('/rest/tag/update', ensureAuthenticated, tag.update);
  app.use('/rest/tags/count/byArea/:areaId', ensureAuthenticated, tag.tagByAreaCount);
  app.get('/rest/tag/targets/byId/:tagId', ensureAuthenticated, tagTarget.getAreaTargets);
  app.get('/rest/tag/:tagId/add/area/:areaId', ensureAuthenticated, tagTarget.addTarget);
  app.get('/rest/tag/:tagId/remove/area/:areaId', ensureAuthenticated, tagTarget.removeTarget);

  // USERS
  app.use('/rest/users/list', ensureAuthenticated, users.list);
  app.post('/rest/users/add', ensureAuthenticated, users.add);
  app.post('/rest/users/delete', ensureAuthenticated, users.delete);
  app.post('/rest/users/update', ensureAuthenticated, users.update);

  // Public API routes
  app.use('/rest/collection/info/byId/:id',      apiCollection.collectionById);
  app.use('/rest/getBrowseList/:collection', apiCollection.browseList);
  app.use('/rest/collections/all',          apiCollection.allCollections);
  app.use('/rest/collection/byArea/:id',    apiCollection.collectionsByArea);
  app.use('/rest/collection/bySubject/:id/area/:areaId', apiCollection.collectionsBySubject);
  app.use('/rest/collection/byCategory/:id', apiCollection.allCollectionsByCategory);
  app.use('/rest/collection/bySubject/:id', apiCollection.allCollectionsBySubject);
  app.use('/rest/subjects/byArea/:id',      apiTag.subjectsByArea);
  app.use('/rest/collection/tags/:id',   apiCollection.tagsForCollection);
  app.use('/rest/collection/types/:id',   apiCollection.typesForCollection);

  // HTML5 MODE ROUTING
  /**
   * Route to page partials.
   */

  app.get('/tagger/login', function (req, res) {
    res.sendFile(
      app.get('appPath') + '/partials/login.html'
    );
  });
  app.get('/tagger/partials/:name', ensureAuthenticated, function (req, res) {

    const name = req.params.name;

    res.sendFile(
      app.get('appPath') +
      '/partials/' + name  + '.html'
    );
  });

  /**
   * Catch-all required by html5 mode.
   */
  app.get('/tagger*', function (req, res) {

      res.sendFile(
        app.get('appPath') + '/index.html'
      );
    }
  );

};

