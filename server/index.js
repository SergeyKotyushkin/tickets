const path = require('path');
const express = require('express');

const app = express();

const distDirPath = path.join(__dirname, '..', 'dist');

// static for loading scripts
app.use('*/dist', express.static(distDirPath));

app.get('*', function(req, res) {
  res.sendFile(path.join(distDirPath, 'index.html'));
});

app.listen(3200, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3200/');
});
