import * as actionTypes from 'stores/auth/action-types';

const initialState = {
  userName: '',
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
  return !!(state.userName && state.userName.length);
}

export default function auth(state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOG_IN:
      var newState = _getDefautState()
      newState.userName = action.name;
      newState.isLoggedIn = _getIsLoggedIn(newState);
      return newState;

    case actionTypes.LOG_OUT:
      var newState = _getDefautState(state);
      newState.userName = state.userName === action.name
        ? ''
        : state.userName;

      newState.isLoggedIn = _getIsLoggedIn(newState);
      return newState;

    default:
      return state;
  }
}
