import storageKeys from 'constants/storageKeys';
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
  axios.get(routes.auth.tryLogIn).then(
    _onTryLogInSuccess.bind(null, dispatchedAuthActions, successCallback),
    _handleError.bind(null, failureCallback)
  );
}

function _logIn(
  dispatchedAuthActions,
  username,
  password,
  successCallback,
  failureCallback
) {
  axios.post(routes.auth.logIn, {username, password}).then(
    _onLogInSuccess.bind(null, dispatchedAuthActions, username, successCallback),
    _handleError.bind(null, failureCallback)
  );
}

function _register(
  username,
  password,
  conformPassword,
  successCallback,
  failureCallback
) {
  axios.post(routes.auth.register, {username, password, conformPassword}).then(
    _onRegisterSuccess.bind(null, successCallback),
    _handleError.bind(null, failureCallback)
  );
}

function _logOut(dispatchedAuthActions, successCallback, failureCallback) {
  axios.get(routes.auth.logOut).then(
    _onLogOutSuccess.bind(null, dispatchedAuthActions, successCallback),
    _handleError.bind(null, failureCallback)
  );
}

// local
function _onTryLogInSuccess(dispatchedAuthActions, successCallback, response) {
  localStorage.setItem(storageKeys.auth, true);
  dispatchedAuthActions.logIn(response.data.username);

  successCallback && successCallback();
}

function _onLogInSuccess(dispatchedAuthActions, username, callback) {
  localStorage.setItem(storageKeys.auth, true);
  dispatchedAuthActions.logIn(username);

  callback && callback();
}

function _onLogOutSuccess(dispatchedAuthActions, callback) {
  localStorage.removeItem(storageKeys.auth);
  dispatchedAuthActions.logOut();

  callback && callback();
}

function _onRegisterSuccess(callback) {
  callback && callback();
}

function _handleError(callback, error) {
  callback && callback(error);
}
