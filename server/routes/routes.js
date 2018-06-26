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
'use strict';
module.exports = function (app, config) {

  const userInfo = require('../../server/api/tagger/controllers/user-info');
  const tag = require('../api/tagger/controllers/tag/admin');
  const apiTag = require('../api/tagger/controllers/tag/public');
  const tagTarget = require('../../server/api/tagger/controllers/tag-target.js');
  const area = require('../api/tagger/controllers/area/admin');
  const apiArea = require('../api/tagger/controllers/area/public');
  const content = require('../api/tagger/controllers/content-type/content');
  const apiContentType = require('../api/tagger/controllers/content-type/public');
  const collection = require('../api/tagger/controllers/collection/admin');
  const apiCollection = require('../api/tagger/controllers/collection/public');
  const category = require('../api/tagger/controllers/category/category');
  const apiCategory = require('../api/tagger/controllers/category/public');
  const users = require('../../server/api/tagger/controllers/users');
  /**
   * Indicates whether the request has an authenticated session.
   * @type {boolean}
   */
  const ensureAuthenticated = app.ensureAuthenticated;

  app.get('/rest/t/user', ensureAuthenticated, (req, res) => {
    userInfo.returnUserInfo(req, res, config);
  });

  // COLLECTIONS
  app.get('/rest/t/collection/id/:id', ensureAuthenticated, collection.byId);
  app.get('/rest/t/collection/area/:areaId', ensureAuthenticated, collection.list);
  app.get('/rest/t/collection/repoTypeByArea/:areaId', ensureAuthenticated, collection.repoTypesByArea);
  app.get('/rest/t/collection/count/types/byArea/:areaId', ensureAuthenticated, collection.countCTypesByArea);
  app.get('/rest/t/collection/count/linkTypes/byArea/:areaId', ensureAuthenticated, collection.browseTypesByArea);
  app.get('/rest/t/collection/first/inArea/:areaId', ensureAuthenticated, collection.getFirstCollectionInArea);
  app.get('/rest/t/collection/:collId/pubstatus/:status', ensureAuthenticated, collection.setPublicationStatus);
  app.get('/rest/t/collection/:collId/pubstatus', ensureAuthenticated, collection.getPublicationStatus);
  app.get('/rest/t/collection/areas/:collId', ensureAuthenticated, collection.areas);
  app.get('/rest/t/collection/tags/:collId', ensureAuthenticated, apiTag.subjectsForCollection); // controller shared with public route
  app.get('/rest/t/collection/types/:collId', ensureAuthenticated, apiCollection.typesForCollection);  // controller shared with public route
  app.post('/tagger/collection/image', ensureAuthenticated, function (req, res) {
    collection.updateImage(req, res, config);
  });
  app.post('/rest/t/collection/add', ensureAuthenticated, collection.add);
  app.post('/rest/t/collection/add/area', ensureAuthenticated, collection.addAreaTarget);
  app.post('/rest/t/collection/add/tag', ensureAuthenticated, collection.addTagTarget);
  app.post('/rest/t/collection/add/type', ensureAuthenticated, collection.addTypeTarget);
  app.put('/rest/t/collection/update', ensureAuthenticated, collection.update);
  app.delete('/rest/t/collection/:collId/remove/area/:areaId', ensureAuthenticated, collection.removeAreaTarget);
  app.delete('/rest/t/collection/:collId/remove/tag/:tagId', ensureAuthenticated, collection.removeTagTarget);
  app.delete('/rest/t/collection/:collId/remove/type/:typeId', ensureAuthenticated, collection.removeTypeTarget);
  app.delete('/rest/t/collection/delete/:id', ensureAuthenticated, collection.delete);
  app.patch('/rest/t/collection/:collId/parent', ensureAuthenticated, collection.updateParentCollection);

  // AREAS
  app.get('/rest/t/area/collection', ensureAuthenticated, apiArea.listAreasWithCount); // controller shared with public route
  app.get('/rest/t/area/id/:id', ensureAuthenticated, apiArea.byId); // controller shared with public route
  app.get('/rest/t/area', ensureAuthenticated, apiArea.list); // controller shared with public route
  app.get('/rest/t/area/collection', ensureAuthenticated, apiArea.listAreasWithCount);// controller shared with public route
  app.get('/rest/t/area/collection/:id', ensureAuthenticated, apiArea.areasForCollection);// controller shared with public route
  app.post('/rest/t/area/add', ensureAuthenticated, area.add);
  app.post('/rest/t/area/reorder', ensureAuthenticated, area.reorder);
  app.put('/rest/t/area/update', ensureAuthenticated, area.update);
  app.delete('/rest/t/area/delete/:areaId', ensureAuthenticated, area.delete);

  // CATEGORIES
  app.get('/rest/t/category/byId/:id', ensureAuthenticated, category.byId);
  app.get('/rest/t/category/show/list', ensureAuthenticated, category.list);
  app.get('/rest/t/category/byArea/:areaId', ensureAuthenticated, category.listByArea);
  app.get('/rest/t/category/count/:areaId', ensureAuthenticated, category.categoryCountByArea);
  app.get('/rest/t/category/getCollections/:collId', ensureAuthenticated, category.categoryByCollection);// controller shared with public route
  app.post('/rest/t/category/add', ensureAuthenticated, category.add);
  app.put('/rest/t/category/update', ensureAuthenticated, category.update);
  app.delete('/rest/t/category/delete/:id', ensureAuthenticated, category.delete);

  // CONTENT TYPES
  app.get('/rest/t/content/byId/:id', ensureAuthenticated, content.byId);
  app.get('/rest/t/content/show/list', ensureAuthenticated, content.list);
  app.get('/rest/t/content/byArea/count/:areaId', ensureAuthenticated, content.countByArea);
  app.get('/rest/t/type/collection/:id', ensureAuthenticated, apiCollection.typesForCollection);// controller shared with public route
  app.post('/rest/t/content/add', ensureAuthenticated, content.add);
  app.put('/rest/t/content/update', ensureAuthenticated, content.update);
  app.delete('/rest/t/content/delete/:id', ensureAuthenticated, content.delete);

  // TAGS
  app.get('/rest/t/subject', ensureAuthenticated, tag.subjectListAdmin);
  app.get('/rest/t/subject/byId/:id', ensureAuthenticated, tag.byId);
  app.get('/rest/t/subject/byArea/:areaId', ensureAuthenticated, tag.tagByArea);
  app.get('/rest/t/subject/count/byArea/:areaId', ensureAuthenticated, tag.tagByAreaCount);
  app.get('/rest/t/subject/targets/byId/:tagId', ensureAuthenticated, tagTarget.getAreaTargets);
  app.get('/rest/t/subject/collection/:id', ensureAuthenticated, apiTag.subjectsForCollection);
  app.post('/rest/t/subject/area/add', ensureAuthenticated, tagTarget.addTarget);
  app.post('/rest/t/subject/add', ensureAuthenticated, tag.add);
  app.put('/rest/t/subject/update', ensureAuthenticated, tag.update);
  app.delete('/rest/t/subject/delete/:id', ensureAuthenticated, tag.delete);
  app.delete('/rest/t/subject/:tagId/remove/area/:areaId', ensureAuthenticated, tagTarget.removeTarget);

  // USERS
  app.get('/rest/t/user/list', ensureAuthenticated, users.list);
  app.post('/rest/t/user/add', ensureAuthenticated, users.add);
  app.put('/rest/t/user/update', ensureAuthenticated, users.update);
  app.delete('/rest/t/user/delete/:id', ensureAuthenticated, users.delete);

  // Public API routes
  // individual collection
  app.get('/rest/collection/id/:id', apiCollection.collectionById);
  // basic collection
  app.get('/rest/collection', apiCollection.allCollections);
  // collections by area, subject, or type
  app.get('/rest/collection/area/:id', apiCollection.collectionsByArea);
  app.get('/rest/collection/subject/:id', apiCollection.collectionsBySubject);
  app.get('/rest/collection/type/:id', apiCollection.collectionsByContentType);
  // advanced collection queries
  app.get('/rest/collection/area/:areaId/type/:typeId', apiCollection.collectionsByAreaAndContentType);
  app.get('/rest/collection/area/:areaId/subject/:subjectId', apiCollection.collectionsBySubjectArea);
  app.get('/rest/collection/area/:areaId/type/:typeId/subject/:subjectId',
    apiCollection.collectionsByAreaSubjectAndContentType);
  // combined type and subject
  app.get('/rest/collection/type/:typeId/subject/:subjectId', apiCollection.collectionsBySubjectAndContentType);
  // related collections
  app.get('/rest/collection/:id/related/:subjects', apiCollection.findRelatedCollections);
  // collections in category (collection group)
  app.get('/rest/collection/category/:categoryId', apiCollection.collectionsByCategory);
  // advanced collections by category
  app.get('/rest/collection/category/:categoryId/area/:areaId', apiCollection.collectionsByCategoryAndArea);
  app.get('/rest/collection/category/:categoryId/type/:typeId', apiCollection.collectionsByCategoryAndType);
  app.get('/rest/collection/category/:categoryId/subject/:subjectId', apiCollection.collectionsByCategoryAndSubject);
  app.get('/rest/collection/category/:categoryId/area/:areaId/subject/:subjectId', apiCollection.collectionsByAreaCategoryAndSubject);
  app.get('/rest/collection/category/:categoryId/area/:areaId/type/:typeId', apiCollection.collectionsByAreaCategoryAndType);
  app.get('/rest/collection/category/:categoryId/area/:areaId/subject/:subjectId/type/:typeId', apiCollection.collectionsByAreaCategorySubjectAndType);
  // subject lists
  app.get('/rest/subject', apiTag.subjectList);
  app.get('/rest/subject/area/:id', apiTag.subjectsByArea);
  app.get('/rest/subject/type/:id', apiTag.subjectsByContentType);
  app.get('/rest/subject/subject/:id', apiTag.subjectsBySubject);
  app.get('/rest/subject/area/:id/type/:typeId', apiTag.subjectsByAreaAndContentType);
  app.get('/rest/subject/subject/:subjectId/type/:typeId', apiTag.subjectsBySubjectAndContentType);
  app.get('/rest/subject/area/:areaId/subject/:subjectId', apiTag.subjectsByAreaAndSubject);
  app.get('/rest/subject/area/:areaId/subject/:subjectId/type/:typeId', apiTag.subjectsByAreaSubjectAndContentType);
  app.get('/rest/subject/category/:categoryId/subject/:subjectId', apiTag.subjectsByCategoryAndSubject);
  app.get('/rest/subject/category/:categoryId/type/:typeId', apiTag.subjectsByCategoryAndContentType);
  app.get('/rest/subject/category/:categoryId/subject/:subjectId/type/:typeId',
    apiTag.subjectsByCategorySubjectAndContentType);
  // type lists
  app.get('/rest/type/collection/:id', apiCollection.typesForCollection);
  app.get('/rest/type', apiContentType.contentTypes);
  app.get('/rest/type/area/:id', apiContentType.contentTypesByArea);
  app.get('/rest/type/subject/:id', apiContentType.contentTypesBySubject);
  app.get('/rest/type/area/:id/subject/:subjectId', apiContentType.contentTypesByAreaAndSubject);
  app.get('/rest/type/type/:id', apiContentType.contentTypesByContentType);
  app.get('/rest/type/area/:id/type/:typeId', apiContentType.contentTypesByAreaAndContentType);
  app.get('/rest/type/subject/:areaId/type/:typeId', apiContentType.contentTypesBySubjectAndContentType);
  app.get('/rest/type/area/:areaId/type/:typeId/subject/:subjectId',
    apiContentType.contentTypesByAreaAndSubjectAndContentType);
  app.get('/rest/type/category/:categoryId/type/:typeId', apiContentType.contentTypesByCategoryAndContentType);
  app.get('/rest/type/category/:categoryId/subject/:subjectId', apiContentType.contentTypesByCategoryAndSubject);
  app.get('/rest/type/category/:categoryId/subject/:subjectId/type/:typeId',
    apiContentType.contentTypesByCategorySubjectAndContentType);
  // individual area
  app.get('/rest/area/id/:id', apiArea.byId);
  // area lists
  app.get('/rest/area', apiArea.list);
  app.get('/rest/area/collection', apiArea.listAreasWithCount);
  app.get('/rest/area/type/:typeId', apiArea.listByTypeWithCount);
  app.get('/rest/area/subject/:subjectId', apiArea.listBySubjectWithCount);
  app.get('/rest/area/type/:typeId/subject/:subjectId', apiArea.listByTypeAndSubjectWithCount);
  app.get('/rest/area/collection/:id', apiArea.areasForCollection);
  // categories
  app.get('/rest/category', apiCategory.list);
  app.get('/rest/category/area/:areaId', apiCategory.categoriesByArea);
  app.get('/rest/category/type/:typeId', apiCategory.categoryByContentType);
  app.get('/rest/category/subject/:subjectId', apiCategory.categoryBySubject);
  app.get('/rest/category/area/:areaId/type/:typeId', apiCategory.categoryByAreaAndContentType);
  app.get('/rest/category/subject/:subjectId/type/:typeId', apiCategory.categoryBySubjectAndContentType);
  app.get('/rest/category/area/:areaId/subject/:subjectId', apiCategory.categoryByAreaAndSubject);
  app.get('/rest/category/area/:areaId/subject/:subjectId/type/:typeId',
    apiCategory.categoryByAreaSubjectAndContentType);

  // This external options service communicates with a target host to retrieve a browse list.
  // It addresses a very specific use case, is not generalized provides no guarantees
  // about the data returned. Currently in use.
  app.get('/rest/options/external/:collection', apiCollection.browseList);

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
      '/partials/' + name + '.html'
    );
  });

  /**
   * Catch-all required by html5 mode.
   */
  app.get(['/tagger*', '/tagger/*'], function (req, res) {

      res.sendFile(
        app.get('appPath') + '/index.html'
      );
    }
  );

};

