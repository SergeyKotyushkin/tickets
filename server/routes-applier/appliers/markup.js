const path = require('path');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  // path to the dist folder
  const distDirPath = path.join(__dirname, '..', '..', '..', 'dist');

  expressApplication.get('*', function(req, res) {
    res.sendFile(path.join(distDirPath, 'index.html'));
  });
}
