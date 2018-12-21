const path = require('path');

const routes = require('../../../common/constants/routes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  // path to the dist folder
  const distDirPath = path.join(__dirname, '..', '..', '..', 'dist');

  expressApplication.get(routes.markup.all, function(req, res) {
    res.sendFile(path.join(distDirPath, 'index.html'));
  });
}
