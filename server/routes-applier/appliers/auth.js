const passport = require('passport');
const userRepository = require('../../database/repositories/user');

const statusCodes = require('../../constants/statusCodes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post('/login', passport.authenticate('local'), _onLogIn);

  expressApplication.post('/register', _onRegister);

  expressApplication.get('/logout', _onLogOut);

  expressApplication.get('/try-login', _onTryLogIn);
}

function _onLogIn(req, res) {
  res.json();
}

function _onRegister(req, res) {
  if (req.isAuthenticated()) {
    console.log('already logged in');
    res.sendStatus(statusCodes.authenticated);
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
    res.sendStatusStatus(statusCodes.badRequest).json(
      {reason: 'Not all fields are filled'}
    );
    return;
  }

  if (trimmedPassword !== trimmedConformPassword) {
    console.log('Passwords are not equal');
    res.sendStatusStatus(statusCodes.badRequest).json(
      {reason: 'Passwords are not equal'}
    );
    return;
  }

  userRepository.findUserByUsername(trimmedUsername, function(user) {
    if (user) {
      console.log('User already exists');
      res.sendStatus(statusCodes.badRequest).json({reason: 'already exists'});
      return;
    }

    userRepository.createUser({
      username: username,
      password: password
    }, function() {
      res.json({result: true});
    }, function() {
      console.log('Error on new user creation');
      res.sendStatus(statusCodes.internalServerError).json(
        {reason: messages.internalServerError}
      );
    });
  }, function() {
    console.log('Error on user searching');
    res.sendStatus(statusCodes.internalServerError).json(
      {reason: messages.internalServerError}
    );
  });
}

function _onLogOut(req, res) {
  if (!req.isAuthenticated()) {
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  req.logout();
  res.json();
}

function _onTryLogIn(req, res) {
  const isAuthenticated = req.isAuthenticated();
  if (!isAuthenticated) {
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  res.json({username: req.user.username});
}
