'use strict';
const express = require('express');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
//var helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

module.exports = function(app, config) {


  app.set('port', config.port);
  app.set('view engine', 'pug');

  var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(cors(corsOptions));

  let _root = process.cwd();
  let _nodeModules = '/node_modules/';
  let _clientFiles = (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/';
  app.use(express.static(_root + _nodeModules));
  app.use(express.static(_root + _clientFiles));


  /** Application directory. */
  app.set('appPath', _root + _clientFiles);

  app.set('views', path.join(_root, '/server/common/views'));
  //app.use(helmet());

  // setup static file paths
  // admin ui
  // app.use('/img', express.static(config.root + '/public/images'));
  // app.use('/javascripts', express.static(config.root + '/public/javascripts'));
  // app.use('/javascripts/vendor', express.static(config.root + '/public/javascripts/vendor'));
  // app.use('/admin/templates', express.static(config.root + '/public/templates'));
  // app.use('/stylesheets', express.static( config.root + '/public/stylesheets'));
  // collection images
  app.use('/resources/img', express.static(config.taggerImageDir));
  // public ui
  // app.use('/js', express.static(config.root + config.resourcePath + '/js'));
  // app.use('/css', express.static(config.root + config.resourcePath + '/css'));
  // app.use('/images', express.static(config.root + config.resourcePath + '/images'));
  // app.use('/fonts', express.static(config.root + config.modulePath + '/fonts'));
  // app.use('/commons/info/images', express.static(config.root + config.modulePath + '/info/images'));
  // app.use('/info/student/swf', express.static(config.root + config.modulePath + '/info/student/swf'));
  // app.use('/commons/robots.txt', express.static(config.root + config.modulePath + '/robots.txt'));

  // development
 // app.use('/bower_components', express.static(config.root + '/bower_components'));
  // app.use('/commons/bower_components', express.static(config.root ));


  app.use(favicon(path.join(_root, 'server/common/favicon.ico'), {}));
  // setup the access logger
  var accessLogStream = fs.createWriteStream('/var/log/tagger/public/access.log', {flags: 'a'});
  app.use(logger('combined', {stream: accessLogStream}));
  // for parsing the body of urlencoded post requests
  app.use(bodyParser.urlencoded({ extended: true }));
  // angularjs posts data as json so using the json parser, too.
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(helmet());


};
