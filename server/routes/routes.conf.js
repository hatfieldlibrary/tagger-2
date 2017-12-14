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
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const helmet = require('helmet');
//var helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const cors = require('cors');


module.exports = function(app, config) {


  app.set('port', config.port);
  app.set('view engine', 'pug');

  // This is hard-coded! Is cors being used?
  var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));

  let _root = path.normalize(__dirname + '/../..');

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

  app.use(helmet());


};
