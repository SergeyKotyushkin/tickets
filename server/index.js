const path = require('path');
const express = require('express');

const app = express();

const distDirPath = path.join(__dirname, '..', 'dist');

if (process.env.NODE_ENV === 'production') {
  // use compressed js files in production
  // html-webpack-plugin doesn't add .gz to js files in production
  app.get('*/dist/*.js', function(req, res, next) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
}

// static for loading scripts
app.use('*/dist', express.static(distDirPath));

app.get('*', function(req, res) {
  res.sendFile(path.join(distDirPath, 'index.html'));
});

app.listen(process.env.PORT, function(err) {
  if (err) {
    return console.error('Server hasn\'t started', err);
  }

  console.log(`Listening at http://localhost:${process.env.PORT}/`);
});
