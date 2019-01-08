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
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const cors = require('cors');


module.exports = function(app, config) {


  app.set('port', config.port);
  app.set('view engine', 'pug');

  // This is hard-coded! Is cors being used?
  // Cors is necessary for development.  In production, proxy
  // makes it unnecessary.
  var corsOptions = {
    origin: 'http://158.104.4.106:3005',
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

  // collection images
  app.use('/resources/img', express.static(config.taggerImageDir));

  app.use(favicon(path.join(_root, 'server/common/favicon.ico'), {}));

  app.use(helmet());

};
