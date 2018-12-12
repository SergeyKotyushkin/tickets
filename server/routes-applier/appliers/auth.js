const passport = require('passport');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post(
    '/login',
    passport.authenticate('local'),
    _afterLogInSuccess
  );

  expressApplication.get('/logout', _onLogOut);

  expressApplication.get('/auth-status', _onAuthStatus);
}

function _afterLogInSuccess(req, res) {
  res.json(true);
}

function _onLogOut(req, res) {
  if (!req.isAuthenticated()) {
    res.json(false);
    return;
  }

  req.logout();
  res.json(true);
}

function _onAuthStatus(req, res) {
  const isAuthenticated = req.isAuthenticated();
  const status = {
    isAuthenticated: isAuthenticated
  };

  if (isAuthenticated) {
    status.user = {
      username: req.user.username
    };
  }

  res.json(status);
}
