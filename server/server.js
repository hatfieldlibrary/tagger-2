'use strict';

var server;

var express = require('express'),
  http = require('http'),
  passport = require('passport'),
  /* jshint unused:false */
  multiparty = require('multiparty');

var config = require('./config/environment');
var app = express();

const dbSchema = require('./api/tagger/models/index');

// configure express
require('./config/express')(app, config);
// static routes
require('./routes/routes.conf')(app, config);
// configure passport and session
require('./auth/authenticate')(app, config, passport);
// configure angular and api routes
require('./routes/routes')(app, config, passport);

function startServer() {

  // stop annoying error message when testing.
  if (server !== undefined) {
    server.close();
  }

  // start server
  server = http.createServer(app).listen(config.port, function () {

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
  dbSchema
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
  // Doing integration tests. No need to sync.
  startServer();
}



