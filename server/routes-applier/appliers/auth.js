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
