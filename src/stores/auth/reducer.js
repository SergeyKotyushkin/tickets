import * as actionTypes from 'stores/auth/action-types';

const initialState = {
  userName: ''
};

export default function auth(state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOG_IN:
      return {userName: action.name}

    case actionTypes.LOG_OUT:
      let newState = JSON.parse(JSON.stringify(state));
      newState.userName = state.userName === action.name
        ? ''
        : state.userName;
      return newState;

    default:
      return state;
  }
}
