const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userRepository = require('../../../database/repositories/user');

module.exports = function init() {
  passport.use(new LocalStrategy(_validateCredentials));

  passport.serializeUser((user, done) => {
    done(null, {
      id: user._id,
      username: user.username
    });
  });

  passport.deserializeUser((user, done) => {
    if (!user) {
      done(null, null);
      return;
    }

    done(null, {
      id: user.id,
      username: user.username
    });
  });
}

function _validateCredentials(username, password, done) {
  userRepository.findUserByUsername(
    username,
    _onFindUserByUsernameSuccess.bind(null, done, username, password),
    _onFindUserByUsernameError.bind(null, done)
  );
}

function _onFindUserByUsernameSuccess(doneCallback, username, password, user) {
  if (!user) {
    doneCallback(null, null);
    return;
  }

  var isMatch = user.comparePasswords(password);
  doneCallback(
    null,
    isMatch
      ? user
      : null
  );
}

function _onFindUserByUsernameError(doneCallback, error) {
  doneCallback(error);
}
