import * as actionTypes from 'stores/auth/action-types';

export function logIn(name) {
  return {type: actionTypes.LOG_IN, name};
}

export function logOut(name) {
  return {type: actionTypes.LOG_OUT, name};
}
