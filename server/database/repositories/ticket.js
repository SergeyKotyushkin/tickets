const TicketModel = require('../models/ticket');

const userRepository = require('./user');

module.exports = {
  exists: _exists,
  getMany: _getMany,
  create: _create,
  addDate: _addDate
};

function _exists(userId, number, successCallback, errorCallback) {
  TicketModel.countDocuments({
    user: userId,
    number: number
  }, function(error, count) {
    if (error) {
      errorCallback && errorCallback(error);
      return;
    }

    successCallback && successCallback(count !== 0);
  });
}

function _getMany(from, size, successCallback, errorCallback) {
  TicketModel.countDocuments(function(error, count) {
    if (error) {
      errorCallback && errorCallback(error);
      return;
    }

    if (count === 0) {
      successCallback && successCallback({total: count, tickets: []});
      return;
    }

    TicketModel.find({}, null, {
      skip: from,
      limit: size
    }, function(error, tickets) {
      if (error) {
        errorCallback && errorCallback(error);
        return;
      }

      successCallback && successCallback({total: count, tickets});
    })
  });
}

function _create(userId, number, date, successCallback, errorCallback) {
  TicketModel.create({
    user: userId,
    number: number,
    dates: [date]
  }, function(error, ticket) {
    if (error) {
      errorCallback && errorCallback(error);
      return;
    }

    successCallback && successCallback(ticket);
  });
}

function _addDate(userId, number, date, successCallback, errorCallback) {
  console.log('findOne ticket', {
    user: userId,
    number: number
  });
  TicketModel.findOne({
    user: userId,
    number: number
  }, function(error, ticket) {
    if (error) {
      errorCallback && errorCallback(error);
      return;
    }

    ticket.dates = ticket.dates
      ? ticket.dates
      : [];
    ticket
      .dates
      .push(date);

    ticket.save(function(saveError) {
      if (saveError) {
        errorCallback && errorCallback(saveError);
        return;
      }

      successCallback && successCallback(ticket);
    });
  });
}
