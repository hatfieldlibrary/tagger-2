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
 * Authentication module.
 * Created by mspalti on 12/4/14.
 * Modified by mspalti on 11/10/2015
 */

'use strict';

var
  /**
   * Express session store
   * @type {session|exports|module.exports}
   */
  session = require('express-session'),
  /**
   * cookie header parser used with sessions
   * @type {*|exports|module.exports}
   */
  cookieParser = require('cookie-parser'),
  /**
   * Google passport OAUTH2 authentication
   */
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  /**
   * Redis client
   * @type {exports|module.exports}
   */
  redis = require('redis'),
  /**
   * Redis session store
   */
  RedisStore = require('connect-redis')(session);

  const db = require('../api/tagger/models');


module.exports = function (app, config, passport) {

  // For development purposes, use express-session in lieu of Redisstore.
  if (app.get('env') === 'development' || app.get('env') === 'runlocal') {
    app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true
      })
    );
    // Use redis as the production session store.
    // http://redis.io/
  } else if (app.get('env') === 'production') {
    var client = redis.createClient(
      config.redisPort, '127.0.0.1',
      {}
    );
    app.use(cookieParser());
    app.use(session(
      {

        secret: 'insideoutorup',
        store: new RedisStore({host: '127.0.0.1', port: config.redisPort, client: client}),
        saveUninitialized: false, // don't create session until something stored,
        resave: false // don't save session if unmodified
      }
    ));
  }

  // Set up authentication and session.
  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAUTH2.
  var GOOGLE_CLIENT_ID = config.googleClientId;
  var GOOGLE_CLIENT_SECRET = config.googleClientSecret;
  var GOOGLE_CALLBACK = config.googleCallback;

  // define serializer and deserializer
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {

    done(null, user);
  });
  // Configure Google authentication for this application
  passport.use(new GoogleStrategy({

      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK
    },
    function (accessToken,
              refreshToken,
              profile,
              done) {

      // asynchronous verification
      process.nextTick(function () {
        // Use Sequelize to look up the user's
        // email address in the local user database.
        db.Users.find({
          attributes: ['id', 'area'],
          where: {
            email: profile._json.email
          }
        }).then(function (user, err) {
          // If email lookup succeeded, pass
          // profile information to the passport
          // callback.
          if (user) {
            profile.areaId = user.area;
            profile.picture = user.picture;
            return done(err, profile);
          }
          // Otherwise pass null user profile
          // to the passport callback.
          done(null, null);
        }).catch( function (err) {
            console.log(err);
          });
      });
    }
  ));

  /* jshint unused: false */
  app.isAuthenticated = function (req, res, next) {
    if (req.isAthenticated()) {
      return true;
    }
    return false;
  };

// Route middleware ensures user is authenticated.
// Use this middleware on any resource that needs to be protected.  If
// the request is authenticated (typically via a persistent login session),
// the request will proceed.  Otherwise, the user will be redirected to the
// login page.
  app.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() || !config.useAuth) {
      return next();
    }
    res.redirect('/tagger/login');
  };

};
