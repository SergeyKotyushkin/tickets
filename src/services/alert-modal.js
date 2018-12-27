export default function AlertModalService(dispatchedAlertModalActions) {
  this.open = _open.bind(this, dispatchedAlertModalActions);
  this.close = _close.bind(this, dispatchedAlertModalActions);
}

// main
function _open(dispatchedAlertModalActions, header, message) {
  dispatchedAlertModalActions.open({header, message});
}

function _close(dispatchedAlertModalActions) {
  dispatchedAlertModalActions.close();
}
