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

const express = require('express');
const  http = require('http');

  /* jshint unused:false */
const  multiparty = require('multiparty');
const config = require('./config/environment');
const app = express();
// initialize database.
const taggerSchema = require('./api/tagger/models/index');

const logger = require('winston');
logger.level = config.logLevel;

// // configure express
// require('./config/')(app, config);

// configure passport and session before route middleware.
require('./auth/authenticate')(app, config);

// static routes
require('./routes/routes.conf')(app, config);

// configure angular and api routes
require('./routes/routes')(app, config);

function startServer() {

  const server = http.createServer(app).listen(config.port, function () {

    if (config.nodeEnv !== 'development') {
      try {
        console.log('Old User ID: ' + process.getuid() + ', Old Group ID: ' + process.getgid());
        process.setgid(config.gid);
        process.setuid(config.uid);
        console.log('New User ID: ' + process.getuid() + ', New Group ID: ' + process.getgid());
        console.log('Express server listening on port ' + config.port);
      } catch (err) {
        console.log('Refusing to keep the process alive as root.');
        process.exit(1);
      }
    } else {
      console.log('Running with User Id: ' + process.getuid());
      console.log('Express server listening on port ' + config.port);
    }
  });

}

// Catch 404 and forward to error handler. Any request
// not handled by express or routes configuration will
// invoke this middleware.
app.use(function (req, res, next) {
  var err = new Error('Not Found: ' + req.originalUrl);
  err.status = 404;
  err.request = req.originalUrl;
  next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'runlocal') {
  /* jshint unused:false   */
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).end();
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// This is needed when running from IDE
module.exports = app;

// Snyc database if not in test mode
if (config.nodeEnv !== 'test') {
  taggerSchema
    .sequelize
    .sync(config.sync)
    .error(function (err) {
      if (err) {
        throw err[0];
      }
    }).then(function () {
    startServer();

  });
}
else {
  // Integration tests. No need to sync.
  startServer();
}



