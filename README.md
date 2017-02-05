#  Tagger
 
[![Build Status](https://travis-ci.org/hatfieldlibrary/tagger-2.svg?branch=master)](https://travis-ci.org/hatfieldlibrary/tagger-2)
[![Coverage Status](https://coveralls.io/repos/github/hatfieldlibrary/tagger-2/badge.svg?branch=master)](https://coveralls.io/github/hatfieldlibrary/tagger-2?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/hatfieldlibrary/tagger-2/badges/dependencies.svg)](https://www.bithound.io/github/hatfieldlibrary/tagger-2/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/hatfieldlibrary/tagger-2/badges/code.svg)](https://www.bithound.io/github/hatfieldlibrary/tagger-2)
[![bitHound Overall Score](https://www.bithound.io/github/hatfieldlibrary/tagger-2/badges/score.svg)](https://www.bithound.io/github/hatfieldlibrary/tagger-2)

 
Tagger implements a specific approach to publishing information about the digital artifacts produced by a community or organization.

In this approach, artifacts are assigned to general Areas that can be topical or administrative (e.g. student research or University Archives). Areas are in turn given one or more Collection Groups (e.g. Northwest Art Collection) that are the specific home of digital artifacts or sub-collections.

All of the digital collections and items in Tagger are associated with one or more Areas and (optionally) with a single Collection Group. This provides structure, context and the ability to discover more about the people and departments who produce and own the content. Subject tags and content types can also be assigned to support browsing and discovery.

Every entity in Tagger has descriptive fields that are populated via Tagger's administrative user interface. Beyond titles and descriptions, these fields include URLs, link types, link labels, and restrictions.

Access to the administrative interface is limited to Administrators and Area Maintainers.

## Microservice

Tagger itself is not a fullstack, out-of-the-box publishing solution.  It is a modest microservice that shares information with external clients or other services
over the network. External clients can access information such as:

 * All Collections 
 * The Collections in an Area
 * The Collections in a Collection Group
 * Collections by Subject Tag
 
See documentation for the [Public API](https://github.com/hatfieldlibrary/tagger-2/wiki/Public-API).

Tagger persists information in a Mysql/MariaDb database. Tagger is written using [NodeJs](https://nodejs.org/en/), [Express](http://expressjs.com), [Sequelize](http://docs.sequelizejs.com/en/v3/), [AngularJs (1.6+)](https://angularjs.org/) and [Angular Material]( https://material.angularjs.org/latest/).
 The AngularJs administrative client is [Component-based](https://docs.angularjs.org/guide/component).
 
 
## Area Overview
 
![Area Overview Page](client/dev/resources/images/docs/overview_page.png "Area Overview Page")
 
## Collections Page
 
![Collections Page](client/dev/resources/images/docs/collection_view.png "Collections Page")
 
 
## Getting started
 
To get started with development, clone the project into your working directory.
 
 
Next install project dependencies using [npm](https://www.npmjs.com/) and [bower](https://bower.io/).  Node, npm and bower need to be installed
if you do not have them already.
 
     npm install
 
     bower install
     

## Mysql/MariaDb
 
The application requires mysql or MariaDb.  For development, you need to install mysql on your machine and create databases. The database names 
are set in configuration and can be whatever you like so long as separate databases are created for development, testing and production.
(Note: in this example tagger is the production database. You don't need the production database for local development work. You will want development
and test databases)
 
     tagger_development
     tagger_test
     tagger
 
Assign access permissions to the empty databases using the development credentials described below. 

Database tables are generated by when the application is first started and updated as 
needed.  Note that if you set the sync parameter to be `{force: true}` then the database will be recreated entirely each time you start
the program.  This can be useful for testing. See the configuration file described in the next section).
 

## Configuration
 
Configurations for development, production, and test environments are defined in `server/config/environment.js`.  This configuration file relies in turn
on `credentials.js` for sensitive information such as OAUTH2 keys. You will need to create your own `credentials.js` file. A sample file is provided
in the `server/config`.  Be sure to place this file outside of the project itself.  The path to the `credentials.js` file is defined in
`server/config/environment.js`.

See the documentation for [more about configuration](https://github.com/hatfieldlibrary/tagger-2/wiki/Configuration).  
  
  
## User Authentication
 
Tagger uses Google OAUTH2 for authentication.  Authorized users are identified by their Google profile email id.  
 
Currently, we are not creating a default administrator account.  Before logging into Tagger for the first time, you first must add 
yourself to the database Users table.  Insert values for name, email, area (0 is administrator), createdAt and updatedAt.
 
 
## Development Server
 
To start the development server, type:
  
  `npm run dev`
 
The first time you start the application in development mode, Sequelize will create tables in the `acomtags_development` database.
 
The Express server will run on the development port configured in `config/environment.js` (e.g. 3333). This project uses [browser-sync](https://www.browsersync.io/) for synchronized browser testing, including automatic page 
refresh on code changes. You can bypass browser-sync and run the server directly if you prefer.
 
## Unit Tests
 
Jasmine unit tests are included for the administrative client code.  Mocha/Chai/Sinon unit tests are included for the API controllers.
 
## Integration Tests

Mocha integration tests run against the test database.  To execute tests with full reporting, use this `gulp` task:

  `gulp server.integration_test`
  
For quicker tests with minimal reporting, use this npm script:

   `npm run test-server`
 
 
## Production Build
 
To build the optimized version of client code, use this command:

`npm run build-dist`

This executes all `gulp` build tasks and copies the new code into the `dist` directory.

It's a good idea to remove development dependencies.  A convenient way to do this is with the [Strongloop command line tool](https://docs.strongloop.com/display/SLC/Building+applications+with+slc).  You can install this via `npm install -g strongloop`.
Then build the zipped tar file using the `slc` command line tool: `slc build --install --pack`.  
 

