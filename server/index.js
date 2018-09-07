const path = require('path');
const express = require('express');

const app = express();

const distDirPath = path.join(__dirname, '..', 'dist');

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
