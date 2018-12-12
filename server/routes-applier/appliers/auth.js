const passport = require('passport');
const userRepository = require('../../database/repositories/user');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post(
    '/login',
    passport.authenticate('local'),
    _afterLogInSuccess
  );

  expressApplication.post('/register', _onRegister);

  expressApplication.get('/logout', _onLogOut);

  expressApplication.get('/auth-status', _onAuthStatus);
}

function _afterLogInSuccess(req, res) {
  res.json(true);
}

function _onRegister(req, res) {
  if (req.isAuthenticated()) {
    console.log('already logged in');
    res.json({result: false, reason: 'already logged in'});
    return;
  }

  const username = req.body.username;
  const password = req.body.password;
  const conformPassword = req.body.conformPassword;

  const trimmedUsername = username && username.trim();
  const trimmedPassword = password && password.trim();
  const trimmedConformPassword = conformPassword && conformPassword.trim();

  if (!trimmedUsername || !trimmedPassword || !trimmedConformPassword) {
    console.log('Not all fields are filled');
    res.json({result: false, reason: 'Not all fields are filled'});
    return;
  }

  if (trimmedPassword !== trimmedConformPassword) {
    console.log('Passwords are not equal');
    res.json({result: false, reason: 'Passwords are not equal'});
    return;
  }

  userRepository.findUserByUsername(trimmedUsername, function(user) {
    if (user) {
      console.log('User already exists');
      res.json({result: false, reason: 'already exists'});
      return;
    }

    userRepository.createUser({
      username: username,
      password: password
    }, function() {
      res.json({result: true});
    }, function() {
      res.json({result: false, reason: 'internal server error'});
    });
  }, function() {
    res.json({result: false, reason: 'internal server error'});
  });
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
