const passport = require('passport');

const userRepository = require('../../database/repositories/user');

const badRequestTypes = require('../../../common/constants/badRequestTypes');
const logs = require('../../../common/constants/logs');
const routes = require('../../../common/constants/routes');
const statusCodes = require('../../../common/constants/statusCodes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post(
    routes.auth.logIn,
    _beforePassportLogin,
    passport.authenticate('local'),
    _onLogIn
  );

  expressApplication.post(routes.auth.register, _onRegister);

  expressApplication.get(routes.auth.logOut, _onLogOut);

  expressApplication.get(routes.auth.tryLogIn, _onTryLogIn);
}

// main
function _beforePassportLogin(req, res, next) {
  const trimmedUsername = req.body.username && req.body.username.trim();
  const trimmedPassword = req.body.password && req.body.password.trim();
  if (!trimmedUsername || !trimmedPassword) {
    console.log(logs.logIn.someFieldsAreNotFilled);
    res.status(statusCodes.badRequest).json(
      {type: badRequestTypes.someFieldsAreNotFilled}
    );
    return;
  }

  next();
}

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
    res.status(statusCodes.badRequest).json(
      {type: badRequestTypes.someFieldsAreNotFilled}
    );
    return;
  }

  if (trimmedPassword !== trimmedConformPassword) {
    console.log(logs.registration.passwordsAreNotEqual);
    res.status(statusCodes.badRequest).json(
      {type: badRequestTypes.passwordsAreNotEqual}
    );
    return;
  }

  userRepository.findUserByUsername(
    trimmedUsername,
    _onRegisterAfterFindUserByUsernameSuccess.bind(null, res, username, password),
    _onRegisterAfterFindUserByUsernameFailure.bind(null, res)
  );
}

function _onLogOut(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.logOut.unauthenticated);
    res.status(statusCodes.unauthenticated);
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
function _onRegisterAfterFindUserByUsernameSuccess(
  res,
  username,
  password,
  user
) {
  if (user) {
    console.log(logs.registration.existingUsername);
    res.status(statusCodes.badRequest).json(
      {type: badRequestTypes.existingUsername}
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
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _onRegisterAfterFindUserByUsernameFailure(res, error) {
  console.error(logs.registration.userSearchingError, error);
  res.sendStatus(statusCodes.internalServerError);
}
