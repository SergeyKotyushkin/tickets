var path = require('path');
var express = require('express');

var app = express();

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3200, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3200/');
});
