import * as actionTypes from './action-types';

export function open(confirmModalData) {
  return {type: actionTypes.OPEN, data: confirmModalData};
}

export function close() {
  return {type: actionTypes.CLOSE};
}
