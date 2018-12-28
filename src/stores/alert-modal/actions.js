import * as actionTypes from './action-types';

export function open(alertModalData) {
  return {type: actionTypes.OPEN, data: alertModalData};
}

export function close() {
  return {type: actionTypes.CLOSE};
}
