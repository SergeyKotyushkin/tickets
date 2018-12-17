import routes from 'constants/routes';

import axios from 'axios';

export default function AuthService(dispatchedAuthActions) {
  this.getMany = _getMany;
  this.add = _add;
}

// main
function _getMany(from, size, successCallback, failureCallback) {
  axios
    .post(routes.getTickets, {from, size})
    .then(
      _onGetManySuccess.bind(null, successCallback, failureCallback),
      _onGetManyFailure.bind(null, failureCallback)
    );
}

function _add(ticket, successCallback, failureCallback) {
  axios
    .post(routes.addTicket, ticket)
    .then(
      _onAddSuccess.bind(null, successCallback, failureCallback),
      _onAddFailure.bind(null, failureCallback)
    );
}

// local
function _onGetManySuccess(successCallback, failureCallback, response) {
  if (response.data.error) {
    failureCallback && failureCallback(data);
    return;
  }

  let tickets = response.data.tickets;
  let total = response.data.total;

  successCallback && successCallback({tickets, total});
}

function _onGetManyFailure(callback, response) {
  callback && callback(response);
}

function _onAddSuccess(successCallback, failureCallback, response) {
  if (response.data.error) {
    failureCallback && failureCallback(data);
    return;
  }

  successCallback && successCallback();
}

function _onAddFailure(callback, response) {
  callback && callback(response);
}
