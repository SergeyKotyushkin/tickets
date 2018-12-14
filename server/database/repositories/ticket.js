const TicketModel = require('../models/ticket');

module.exports = {
  getMany: _getMany
};

function _getMany(from, size, successCallback, errorCallback) {
  TicketModel.countDocuments(function(error, count) {
    if (error) {
      errorCallback(error);
      return;
    }

    if (count === 0) {
      successCallback({total: count, tickets: []});
      return;
    }

    TicketModel.find({}, null, {
      skip: from,
      limit: size
    }, function(error, tickets) {
      if (error) {
        errorCallback(error);
        return;
      }

      successCallback({total: count, tickets});
    })
  });
}
