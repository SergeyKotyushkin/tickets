import * as actionTypes from './action-types';

const initialState = {
  isOpen: false,
  header: null,
  message: null
};

export default function alertModal(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN:
      return {isOpen: true, header: action.data.header, message: action.data.message};

    case actionTypes.CLOSE:
      return {isOpen: false, header: null, message: null};

    default:
      return state;
  }
}
