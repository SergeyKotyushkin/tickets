const passport = require('passport');
const ticketRepository = require('../../database/repositories/ticket');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post('/get-tickets', _onGetTickets);

  expressApplication.post('/add-ticket', _onAddTicket);

  expressApplication.post('/delete-ticket-date', _onDeleteTicketDate);
}

function _onGetTickets(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.json({error: true, unauthenticated: true});
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
      res.json({error: true});
    }
  );
}

function _onAddTicket(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.json({error: true, unauthenticated: true});
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
    res.json({error: true});
  });
}

function _onDeleteTicketDate(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.json({error: true, unauthenticated: true});
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
    res.json({error: true});
  });
}
