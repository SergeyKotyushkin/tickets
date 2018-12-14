import routes from 'constants/routes';

import axios from 'axios';

export default function AuthService(dispatchedAuthActions) {
  this.getMany = _getMany;
}

// main
function _getMany(from, size, successCallback, failureCallback) {
  axios
    .post(routes.getTickets, {from, size})
    .then(
      _onGetManySuccess.bind(null, successCallback),
      _onGetManyFailure.bind(null, failureCallback)
    );
}

// local
function _onGetManySuccess(callback, response) {
  let tickets = response.data.tickets;
  let total = response.data.total;

  callback && callback({tickets, total});
}

function _onGetManyFailure(callback, response) {
  callback && callback(response);
}
