import * as actionTypes from 'stores/auth/action-types';

const initialState = {
  username: '',
  isLoggedIn: false
};

function _getDefautState(state) {
  return JSON.parse(JSON.stringify(
    state
      ? state
      : initialState
  ));
}

function _getIsLoggedIn(state) {
  return !!(state.username && state.username.length);
}

export default function auth(state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOG_IN:
      var newState = _getDefautState()
      newState.username = action.name;
      newState.isLoggedIn = _getIsLoggedIn(newState);
      return newState;

    case actionTypes.LOG_OUT:
      var newState = _getDefautState();
      newState.username = null;
      newState.isLoggedIn = false;
      return newState;

    default:
      return state;
  }
}
