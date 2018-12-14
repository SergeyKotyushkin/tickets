import messages from 'constants/messages';
import routes from 'constants/routes';
import statusCodes from 'constants/statusCodes';

import axios from 'axios';

export default function AuthService(dispatchedAuthActions) {
  this.tryLogIn = _tryLogIn.bind(this, dispatchedAuthActions);
  this.logIn = _logIn.bind(this, dispatchedAuthActions);
  this.logOut = _logOut.bind(this, dispatchedAuthActions);
  this.register = _register;
}

// main
function _tryLogIn(dispatchedAuthActions, successCallback, failureCallback) {
  axios
    .get(routes.authStatus)
    .then(
      _onAuthStatusSuccess.bind(null, dispatchedAuthActions, successCallback, failureCallback),
      _onAuthStatusFailure.bind(null, failureCallback)
    );
}

function _logIn(
  dispatchedAuthActions,
  username,
  password,
  successCallback,
  failureCallback
) {
  axios
    .post(routes.logIn, {username, password})
    .then(
      _onLogInSuccess.bind(null, dispatchedAuthActions, username, successCallback),
      _onLogInFailure.bind(null, failureCallback)
    );
}

function _register(
  username,
  password,
  conformPassword,
  successCallback,
  failureCallback
) {
  axios
    .post(routes.register, {username, password, conformPassword})
    .then(
      _onRegisterSuccess.bind(null, successCallback),
      _onRegisterFailure.bind(null, failureCallback)
    );
}

function _logOut(dispatchedAuthActions, successCallback, failureCallback) {
  axios
    .get(routes.logOut)
    .then(
      _onLogOutSuccess.bind(null, dispatchedAuthActions, successCallback),
      _onLogOutFailure.bind(null, failureCallback)
    );
}

// local
function _onAuthStatusSuccess(
  dispatchedAuthActions,
  successCallback,
  failureCallback,
  response
) {
  const authStatus = response.data;
  if (!authStatus.isAuthenticated) {
    failureCallback && failureCallback();
    return;
  }

  dispatchedAuthActions.logIn(authStatus.user.username);

  successCallback && successCallback();
}

function _onAuthStatusFailure(callback, response) {
  alert(messages.internalServerError);

  callback && callback();
}

function _onLogInSuccess(dispatchedAuthActions, username, callback) {
  dispatchedAuthActions.logIn(username);

  callback && callback();
}

function _onLogInFailure(callback, error) {
  const message = error.response.status === statusCodes.unauthorized
    ? messages.wrongCredentials
    : messages.internalServerError;

  alert(message);

  callback && callback();
}

function _onLogOutSuccess(dispatchedAuthActions, callback) {
  dispatchedAuthActions.logOut();

  callback && callback();
}

function _onLogOutFailure(callback) {
  alert(messages.internalServerError);

  callback && callback();
}

function _onRegisterSuccess(callback) {
  alert(messages.registrationIsComplete);

  callback && callback();
}

function _onRegisterFailure(callback) {
  alert(messages.registrationFailed);

  callback && callback();
}
