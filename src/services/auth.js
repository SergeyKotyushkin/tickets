import storageKeys from 'constants/storageKeys';
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
  dispatchedAuthActions.logIn(response.data.username);
  localStorage.setItem(storageKeys.auth, true);

  successCallback && successCallback();
}

function _onLogInSuccess(dispatchedAuthActions, username, callback) {
  dispatchedAuthActions.logIn(username);
  localStorage.setItem(storageKeys.auth, true);

  callback && callback();
}

function _onLogOutSuccess(dispatchedAuthActions, callback) {
  dispatchedAuthActions.logOut();
  localStorage.removeItem(storageKeys.auth);

  callback && callback();
}

function _onRegisterSuccess(callback) {
  callback && callback();
}

function _handleError(callback, error) {
  callback && callback(error);
}
