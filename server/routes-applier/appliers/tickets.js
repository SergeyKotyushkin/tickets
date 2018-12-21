const passport = require('passport');
const ticketRepository = require('../../database/repositories/ticket');
const statusCodes = require('../../constants/statusCodes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post('/get-tickets', _onGetTickets);

  expressApplication.post('/add-ticket', _onAddTicket);

  expressApplication.post('/delete-ticket-date', _onDeleteTicketDate);

  expressApplication.post('/delete-ticket', _onDeleteTicket);

  expressApplication.post('/find-ticket', _onFindTicketDate);
}

function _onGetTickets(req, res) {
  if (!req.isAuthenticated()) {
    console.log('/get-tickets: unauthenticated');
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  ticketRepository.getMany(
    req.user.id,
    req.body.from,
    req.body.size,
    function(data) {
      res.json(data);
    },
    function(error) {
      console.log('Internal Server Error');
      res.sendStatus(statusCodes.internalServerError);
    }
  );
}

function _onAddTicket(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  ticketRepository.exists(req.user.id, req.body.number, function(result) {
    var functionToExecute = result
      ? ticketRepository.addDate
      : ticketRepository.create;

    functionToExecute.call(
      this,
      req.user.id,
      req.body.number,
      req.body.date,
      function(ticket) {
        res.json({ticket});
      }
    );
  }, function(error) {
    console.log('Internal Server Error');
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _onDeleteTicketDate(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  ticketRepository.exists(req.user.id, req.body.number, function(result) {
    if (!result) {
      res.json({});
      return;
    }

    ticketRepository.deleteDate(
      req.user.id,
      req.body.number,
      req.body.date,
      function() {
        res.json({});
      }
    );
  }, function(error) {
    console.log('Internal Server Error');
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _onDeleteTicket(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  ticketRepository.deleteTicket(req.user.id, req.body.number, function(result) {
    res.json(result);
  }, function(error) {
    console.log('Internal Server Error');
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _onFindTicketDate(req, res) {
  if (!req.isAuthenticated()) {
    console.log('/find-ticket: unauthenticated');
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  ticketRepository.find(req.user.id, req.body.number, function(ticket) {
    res.json({ticket: ticket});
  }, function(error) {
    console.log('Internal Server Error');
    res.sendStatus(statusCodes.internalServerError);
  });
}
