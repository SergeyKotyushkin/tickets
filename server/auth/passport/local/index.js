const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const user = {
  username: 'Name',
  password: 'Pass',
  id: 1
}

module.exports = function init() {
  passport.use(new LocalStrategy(function(username, password, done) {
    if (username !== user.username || password !== user.password) {
      done(null, false);
      return;
    }

    done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    if (!username) {
      done(null, null);
      return;
    }

    done(null, {username: username});
  });
}
