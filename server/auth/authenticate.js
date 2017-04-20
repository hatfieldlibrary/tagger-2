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
 * Modified by mspalti on 2/9/2017
 */

'use strict';

let
  /**
   * Express session store
   * @type {session|exports|module.exports}
   */
  session = require('express-session'),

  passport = require('passport'),

  cookieParser = require('cookie-parser'),

  bodyParser = require('body-parser'),

  /**
   * Redis session store
   */
  RedisStore = require('connect-redis')(session);


const db = require('../api/tagger/schema');


module.exports = function (app, config) {


  let sessionMiddleware;

  // For development purposes, use express-session in lieu of Redisstore.
  if (app.get('env') === 'development' || app.get('env') === 'runlocal') {
    sessionMiddleware = session({
      secret: 'keyboard cat',
      saveUninitialized: true,
      resave: true
    });

    // Use redis as the production session store.
    // http://redis.io/
  }
  else if (app.get('env') === 'production') {

    sessionMiddleware = session(
      {
        secret: 'insideoutorup',
        store: new RedisStore({host: '127.0.0.1', port: config.redisPort}),
        saveUninitialized: false, // don't create session until something stored,
        resave: false // don't save session if unmodified
      });

  }

  /**
   * Returns user's email if it matches the domain provided
   * in configuration. Otherwise returns null.
   * @param email
   * @returns {null}
   */
  function getEmail(email) {

    let userEmail = email.value;
    let emailDomain = config.domain;
    let regex = new RegExp(emailDomain, 'i');
    if (userEmail.match(regex)) {
      return userEmail;
    }
    return null;
  }

  /**
   * Google passport OAUTH2 authentication
   */
  let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  app.use(sessionMiddleware);
  // Passport authentication and session.
  app.use(passport.initialize());
  app.use(passport.session());
  // for parsing the body of urlencoded post requests
  app.use(bodyParser.urlencoded({extended: true}));
  // angularjs posts data as json so using the json parser, too.
  app.use(bodyParser.json());
  app.use(cookieParser());


  // Google OAUTH2.
  const GOOGLE_CLIENT_ID = config.googleClientId;
  const GOOGLE_CLIENT_SECRET = config.googleClientSecret;
  const GOOGLE_CALLBACK = config.googleCallback;

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

        // emails from profile (expecting array)
        let emails = profile.emails;
        let email;
        /* Check email array in profile. */
        if (Array.isArray(emails)) {
          for (let i = 0; i < emails.length; i++) {
            let emailMatch = getEmail(emails[i]);
            if (emailMatch !== null) {
              email = emailMatch;
              break;
            }
          }
        }
        /* But also be ready in case OAUTH returns
           a single object. */
        else {
          let emailMatch = getEmail(emails);
          if (emailMatch !== null) {
            email = emailMatch;
          }
        }

        // email will be undefined if no domain match is found.
        if (typeof email !== 'undefined') {
          // Use Sequelize to look up the user's
          // email address in the local user database.
          db.Users.find({
            attributes: ['id', 'area'],
            where: {
              email: email
            }
          }).then(function (user, err) {
            // If email lookup succeeded, pass
            // profile information to the passport
            // callback.
            if (user) {
              try {
                profile.areaId = user.area;
                profile.picture = user.picture;
                return done(err, profile);
              } catch(err) {
                done(err, null);
              }
            }
            // Otherwise pass null user profile
            // to the passport callback.
            done(null, null);
          }).catch(function (err) {
            console.log(err);
          });
        }
        else {
          console.log('User domain is not authorized.')
        }

      });
    }
  ));

  // Use passport.authenticate() as middleware. The first step in Google authentication
  // redirects the user to google.com.  After authorization, Google
  // will redirect the user back to the callback URL /auth/google/callback
  // jshint unused: false
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
    }),

    function (req, res) {
      // The request will be redirected to Google for authentication, so this
      // function will not be called.
    });

  // If authentication failed, redirect the login page.  Otherwise, redirect
  // to the admin page page.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/tagger/',
      failureRedirect: '/tagger/login'
    }));

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
