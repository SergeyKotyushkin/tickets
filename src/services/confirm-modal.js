export default function ConfirmModalService(dispatchedActions) {
  this.open = _open.bind(this, dispatchedActions);
  this.close = _close.bind(this, dispatchedActions);
}

// main
function _open(
  dispatchedActions,
  modalType,
  header,
  message,
  onYesCallback,
  onNoCallback
) {
  dispatchedActions.open(
    {modalType, header, message, onYesCallback, onNoCallback}
  );
}

function _close(dispatchedActions) {
  dispatchedActions.close();
}
