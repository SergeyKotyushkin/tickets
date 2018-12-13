export default function HistoryService(history) {
  this.push = _push.bind(this, history);
}

function _push(history, route) {
  history.push(route);
}
