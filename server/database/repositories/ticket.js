const TicketModel = require('../models/ticket');

const userRepository = require('./user');

module.exports = {
  exists: _exists,
  getMany: _getMany,
  create: _create,
  addDate: _addDate,
  deleteDate: _deleteDate,
  find: _find
};

function _exists(userId, number, successCallback, errorCallback) {
  TicketModel.countDocuments({
    user: userId,
    number: number
  }, _onExistsExecuted.bind(null, successCallback, errorCallback));
}

function _getMany(userId, from, size, successCallback, errorCallback) {
  TicketModel.countDocuments(
    {
      user: userId
    },
    _onGetManyCountOffAllFound.bind(null, userId, from, size, successCallback, errorCallback)
  );
}

function _create(userId, number, date, successCallback, errorCallback) {
  TicketModel.create({
    user: userId,
    number: number,
    dates: [date]
  }, _onCreateExecuted.bind(null, successCallback, errorCallback));
}

function _addDate(userId, number, date, successCallback, errorCallback) {
  TicketModel.findOne({
    user: userId,
    number: number
  }, _onAddDateFoundTicket.bind(null, date, successCallback, errorCallback));
}

function _deleteDate(userId, number, date, successCallback, errorCallback) {
  TicketModel.findOne({
    user: userId,
    number: number,
    dates: date
  }, _onDeleteDateFoundTicket.bind(null, date, successCallback, errorCallback));
}

function _find(userId, number, successCallback, errorCallback) {
  TicketModel.findOne({
    user: userId,
    number: number
  }, _onFindTicket.bind(null, successCallback, errorCallback));
}

// local
function _onGetManyCountOffAllFound(
  userId,
  from,
  size,
  successCallback,
  errorCallback,
  error,
  count
) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  if (count === 0) {
    successCallback && successCallback({total: count, tickets: []});
    return;
  }

  TicketModel.find({
    user: userId
  }, null, {
    skip: from,
    limit: size,
    sort: {
      number: 1
    }
  }, _onGetManyFound.bind(null, count, successCallback, errorCallback));
}

function _onGetManyFound(count, successCallback, errorCallback, error, tickets) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  successCallback && successCallback({total: count, tickets});
}

function _onCreateExecuted(successCallback, errorCallback, error, ticket) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  successCallback && successCallback(ticket);
}

function _onExistsExecuted(successCallback, errorCallback, error, count) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  successCallback && successCallback(count !== 0);
}

function _onAddDateFoundTicket(
  addedDate,
  successCallback,
  errorCallback,
  error,
  ticket
) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  if (!ticket) {
    errorCallback && errorCallback(error);
    return;
  }

  _addDateToTicket(ticket, addedDate);

  _saveTicket(ticket, successCallback, errorCallback);
}

function _addDateToTicket(ticket, date) {
  ticket.dates = ticket.dates
    ? ticket.dates
    : [];

  ticket
    .dates
    .push(date);
}

function _onDeleteDateFoundTicket(
  deletedDate,
  successCallback,
  errorCallback,
  error,
  ticket
) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  if (!ticket) {
    errorCallback && errorCallback(error);
    return;
  }

  _deleteDateFromTicket(ticket, deletedDate);

  if (!ticket.dates.length) {
    _removeTicket(ticket, successCallback, errorCallback);
    return;
  }

  _saveTicket(ticket, successCallback, errorCallback);
}

function _deleteDateFromTicket(ticket, date) {
  for (var i = 0; i < ticket.dates.length; i++) {
    if (ticket.dates[i].getTime() === new Date(date).getTime()) {
      ticket
        .dates
        .splice(i, 1);
      return;
    }
  }
}

function _removeTicket(ticket, successCallback, errorCallback) {
  ticket.remove(function(deleteError) {
    if (deleteError) {
      errorCallback && errorCallback(deleteError);
      return;
    }

    successCallback && successCallback();
  });
}

function _saveTicket(ticket, successCallback, errorCallback) {
  ticket.save(function(saveError) {
    if (saveError) {
      errorCallback && errorCallback(saveError);
      return;
    }

    successCallback && successCallback(ticket);
  });
}

function _onFindTicket(successCallback, errorCallback, error, ticket) {
  if (error) {
    errorCallback && errorCallback(error);
    return;
  }

  successCallback && successCallback(ticket);
}
