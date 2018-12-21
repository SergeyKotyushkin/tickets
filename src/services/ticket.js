import routes from 'constants/routes';

import axios from 'axios';

export default function AuthService(dispatchedAuthActions) {
  this.getMany = _getMany;
  this.add = _add;
  this.deleteDate = _deleteDate;
  this.deleteTicket = _deleteTicket;
  this.find = _find;
}

// main
function _getMany(from, size, successCallback, failureCallback) {
  axios.post(routes.tickets.getTickets, {from, size}).then(
    _handleSuccess.bind(null, successCallback),
    _handleFailture.bind(null, failureCallback)
  );
}

function _add(number, date, successCallback, failureCallback) {
  axios.post(routes.tickets.addTicket, {number, date}).then(
    _handleSuccess.bind(null, successCallback),
    _handleFailture.bind(null, failureCallback)
  );
}

function _deleteDate(number, date, successCallback, failureCallback) {
  axios.post(routes.tickets.deleteTicketDate, {number, date}).then(
    _handleSuccess.bind(null, successCallback),
    _handleFailture.bind(null, failureCallback)
  );
}

function _deleteTicket(number, successCallback, failureCallback) {
  axios.post(routes.tickets.deleteTicket, {number}).then(
    _handleSuccess.bind(null, successCallback),
    _handleFailture.bind(null, failureCallback)
  );
}

function _find(number, successCallback, failureCallback) {
  axios.post(routes.tickets.findTicket, {number}).then(
    _handleSuccess.bind(null, successCallback),
    _handleFailture.bind(null, failureCallback)
  );
}

// local
function _handleSuccess(successCallback, response) {
  successCallback && successCallback(response.data);
}

function _handleFailture(callback, error) {
  callback && callback(error);
}
