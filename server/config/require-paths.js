/**
 * Created by mspalti on 1/21/17.
 */

(function () {

  function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }

  const devDirectory = getUserHome() + '/etc/tagger/';
  const path = {
    development: devDirectory,
    test: devDirectory,
    production: '/etc/tagger'
  };

  function _getPath(env) {
    return path[env];
  }

  const creds = {

    path: _getPath
  };

  module.exports = creds;

})();
