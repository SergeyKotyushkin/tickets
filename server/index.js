const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const initPassportStrategy = require('./auth/passport');
const routesApplier = require('./routes-applier');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false})
);
app.use(passport.initialize());
app.use(passport.session());

initPassportStrategy();

routesApplier.apply(app);

app.listen(process.env.PORT, function(err) {
  if (err) {
    return console.error('Server hasn\'t started', err);
  }

  console.log(`Listening at http://localhost:${process.env.PORT}/`);
});
