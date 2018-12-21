import * as actionTypes from 'stores/auth/action-types';

const initialState = {
  username: '',
  isAuthenticated: false
};

function _getDefautState(state) {
  return JSON.parse(JSON.stringify(
    state
      ? state
      : initialState
  ));
}

function _getIsAuthenticated(state) {
  return !!(state.username && state.username.length);
}

export default function auth(state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOG_IN:
      var newState = _getDefautState()
      newState.username = action.name;
      newState.isAuthenticated = _getIsAuthenticated(newState);
      return newState;

    case actionTypes.LOG_OUT:
      var newState = _getDefautState();
      newState.username = null;
      newState.isAuthenticated = false;
      return newState;

    default:
      return state;
  }
}
