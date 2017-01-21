/**
 * Created by mspalti on 1/21/17.
 */

(function () {

  // User's home directory. Should be OS agnostic.
  function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }
  // Home of the development/test credentials file.
  const devDirectory = getUserHome() + '/etc/tagger/';
  // Home of the production credentials file.
  const prodDirectory =  '/etc/tagger';

  const path = {
    development: devDirectory,
    test: devDirectory,
    production: prodDirectory
  };

  function _getPath(env) {
    return path[env];
  }

  const creds = {

    path: _getPath

  };

  module.exports = creds;

})();
