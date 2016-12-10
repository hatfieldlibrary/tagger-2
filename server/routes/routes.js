module.exports = function(app,config,passport){

  'use strict';

  var userInfo = require('../../server/api/tagger/controllers/user-info');
  var tag = require('../../server/api/tagger/controllers/tags');
  var tagTarget = require('../../server/api/tagger/controllers/tag-target.js');
  var area = require('../../server/api/tagger/controllers/area');
  var content = require('../../server/api/tagger/controllers/content');
  var collection = require('../../server/api/tagger/controllers/collection');
  var category = require('../../server/api/tagger/controllers/category');
  var users = require('../../server/api/tagger/controllers/users');
  /**
   * Indicates whether the request has an authenticated session.
   * @type {boolean}
   */
  var ensureAuthenticated = app.ensureAuthenticated;

  // AUTHENTICATION

  // Use passport.authenticate() as middleware. The first step in Google authentication
  // redirects the user to google.com.  After authorization, Google
  // will redirect the user back to the callback URL /auth/google/callback
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){
      // The request will be redirected to Google for authentication, so this
      // function will not be called.
    });

  // If authentication failed, redirect the login page.  Otherwise, redirect
  // to the admin page page.
  app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: '/tagger/',
      failureRedirect: '/login' }));

  app.use('/rest/userinfo', ensureAuthenticated, userInfo.returnUserInfo);

  // COLLECTIONS
  app.use('/rest/collection/byId/:id', ensureAuthenticated, collection.byId);
  app.use('/rest/collection/show/list/:areaId', ensureAuthenticated, collection.list);
  app.use('/rest/collection/tags/:collId', collection.tagsForCollection); // public
  app.use('/rest/collection/types/:collId', collection.typesForCollection);  // public
  app.use('/rest/collection/areas/:collId', ensureAuthenticated, collection.areas);
  app.post('/rest/collection/add', ensureAuthenticated, collection.add);
  app.post('/rest/collection/delete', ensureAuthenticated, collection.delete);
  app.post('/rest/collection/update', ensureAuthenticated, collection.update);
  app.post('/tagger/collection/image', ensureAuthenticated, function (res, req) {
    collection.updateImage(res, req, config);
  });
  app.get('/rest/collection/:collId/add/area/:areaId', ensureAuthenticated, collection.addAreaTarget);
  app.get('/rest/collection/:collId/remove/area/:areaId', ensureAuthenticated, collection.removeAreaTarget);
  app.get('/rest/collection/:collId/add/tag/:tagId', ensureAuthenticated, collection.addTagTarget);
  app.get('/rest/collection/:collId/remove/tag/:tagId', ensureAuthenticated, collection.removeTagTarget);
  app.get('/rest/collection/:collId/add/type/:typeId', ensureAuthenticated, collection.addTypeTarget);
  app.get('/rest/collection/:collId/remove/type/:typeId', ensureAuthenticated, collection.removeTypeTarget);
  app.get('/rest/collection/repoTypeByArea/:areaId', ensureAuthenticated, collection.repoTypesByArea);
  app.get('/rest/collection/count/types/byArea/:areaId', ensureAuthenticated, collection.countCTypesByArea);
  app.get('/rest/collection/count/linkTypes/byArea/:areaId', ensureAuthenticated, collection.browseTypesByArea);

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
  app.use('/rest/collection/info/byId/:id',      collection.collectionById);
  app.use('/rest/getBrowseList/:collection', collection.browseList);
  app.use('/rest/collections/all',          collection.allCollections);
  app.use('/rest/collection/byArea/:id',    collection.collectionsByArea);
  app.use('/rest/collection/bySubject/:id/area/:areaId', collection.collectionsBySubject);
  app.use('/rest/collection/byCategory/:id', collection.allCollectionsByCategory);
  app.use('/rest/collection/bySubject/:id', collection.allCollectionsBySubject);
  app.use('/rest/subjects/byArea/:id',      tag.subjectsByArea);
  app.use('/rest/collection/tags/:id',   collection.tagsForCollection);
  app.use('/rest/collection/types/:id',   collection.typesForCollection);

  // HTML5 MODE ROUTING
  /**
   * Route to page partials.
   */

  app.get('/login', function (req, res) {
    res.sendFile(
      app.get('appPath') + '/tagger/partials/login.html'
    );
  });
  app.get('/tagger/:name', ensureAuthenticated, function (req, res) {

    var name = req.params.name;

    res.sendFile(
      app.get('appPath') +
      '/tagger/partials/' + name  + '.html'
    );
  });

  /**
   * Catch-all required by html5 mode.
   */
  app.get('/tagger/*', function (req, res) {

      res.sendFile(
        app.get('appPath') + '/tagger/index.html'
      );
    }
  );

};

