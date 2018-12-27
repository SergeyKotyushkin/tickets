import * as actionTypes from './action-types';

const initialState = {
  isOpen: false,
  header: null,
  message: null,
  onYesCallback: null,
  onNoCallback: null
};

export default function alertModal(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN:
      {
        const newState = {
          isOpen: true,
          header: action.data.header,
          message: action.data.message,
          onYesCallback: action.data.onYesCallback,
          onNoCallback: action.data.onNoCallback
        };

        return newState;
      }

    case actionTypes.CLOSE:
      {
        const newState = {
          isOpen: false,
          header: null,
          message: null,
          onYesCallback: null,
          onNoCallback: null
        };

        return newState;
      }

    default:
      return state;
  }
}
