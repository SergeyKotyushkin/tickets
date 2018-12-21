const passport = require('passport');

const userRepository = require('../../database/repositories/user');

const logs = require('../../../common/constants/logs');
const routes = require('../../../common/constants/routes');
const statusCodes = require('../../../common/constants/statusCodes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post(
    routes.auth.logIn,
    passport.authenticate('local'),
    _onLogIn
  );

  expressApplication.post(routes.auth.register, _onRegister);

  expressApplication.get(routes.auth.logOut, _onLogOut);

  expressApplication.get(routes.auth.tryLogIn, _onTryLogIn);
}

// main
function _onLogIn(req, res) {
  res.json();
}

function _onRegister(req, res) {
  if (req.isAuthenticated()) {
    console.error(logs.registration.alreadyAuthenticated, req.user.username);
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
    console.log(logs.registration.someFieldsAreNotFilled);
    res.sendStatusStatus(statusCodes.badRequest).json(
      {message: messages.registration.someFieldsAreNotFilled}
    );
    return;
  }

  if (trimmedPassword !== trimmedConformPassword) {
    console.log(logs.registration.passwordsAreNotEqual);
    res.sendStatusStatus(statusCodes.badRequest).json(
      {message: messages.registration.passwordsAreNotEqual}
    );
    return;
  }

  userRepository.findUserByUsername(
    trimmedUsername,
    _onRegisterAfterFindUserByUsernameSuccess.bind(null, username, password),
    _onRegisterAfterFindUserByUsernameFailure
  );
}

function _onLogOut(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.logOut.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  req.logout();
  res.json();
}

function _onTryLogIn(req, res) {
  const isAuthenticated = req.isAuthenticated();
  if (!isAuthenticated) {
    console.log(logs.tryLogIn.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  res.json({username: req.user.username});
}

// local
function _onRegisterAfterFindUserByUsername(username, password, user) {
  if (user) {
    console.log(logs.registration.existingUsername);
    res.sendStatus(statusCodes.badRequest).json(
      {message: messages.registration.existingUsername}
    );
    return;
  }

  userRepository.createUser({
    username: username,
    password: password
  }, function() {
    res.json();
  }, function(error) {
    console.error(logs.registration.userCreationError, error);
    res.sendStatus(statusCodes.internalServerError).json(
      {message: messages.common.internalServerError}
    );
  });
}

function _onRegisterAfterFindUserByUsernameFailure(error) {
  console.error(logs.registration.userSearchingError, error);
  res.sendStatus(statusCodes.internalServerError).json(
    {reason: messages.common.internalServerError}
  );
}
