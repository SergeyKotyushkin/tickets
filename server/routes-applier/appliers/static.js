const path = require('path');
const express = require('express');

const routes = require('../../../common/constants/routes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  if (process.env.NODE_ENV === 'production') {
    // use compressed js files in production html-webpack-plugin doesn't add .gz to
    // js files in production
    expressApplication.get(routes.static.prodJs, function(req, res, next) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript');
      next();
    });
  }

  // path to the dist folder
  const distDirPath = path.join(__dirname, '..', '..', '..', 'dist');

  // static for loading scripts
  expressApplication.use(routes.static.all, express.static(distDirPath));
}
