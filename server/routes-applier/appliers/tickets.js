const passport = require('passport');
const ticketRepository = require('../../database/repositories/ticket');
const statusCodes = require('../../../common/constants/statusCodes');

const badRequestTypes = require('../../../common/constants/bad-request-types');
const logs = require('../../../common/constants/logs');
const routes = require('../../../common/constants/routes');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post(routes.tickets.getTickets, _onGetTickets);

  expressApplication.post(routes.tickets.addTicket, _onAddTicket);

  expressApplication.post(routes.tickets.deleteTicketDate, _onDeleteTicketDate);

  expressApplication.post(routes.tickets.deleteTicket, _onDeleteTicket);

  expressApplication.post(routes.tickets.findTicket, _onFindTicket);
}

function _onGetTickets(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.tickets.getTickets, logs.tickets.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  ticketRepository.getMany(
    req.user.id,
    req.body.from,
    req.body.size,
    function(result) {
      var resultDto = {};
      resultDto.total = result.total;
      resultDto.tickets = result.tickets.map(_mapTicketToTicketDto);
      res.json(resultDto);
    },
    function(error) {
      console.error(logs.tickets.getTickets, logs.tickets.internalServerError, error);
      res.sendStatus(statusCodes.internalServerError);
    }
  );
}

function _onAddTicket(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.tickets.addTicket, logs.tickets.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  if ((!req.body.number && req.body.number !== 0) || !_isDateStringCorrect(req.body.date)) {
    console.error(logs.tickets.addTicket, logs.tickets.badRequest);
    res.status(statusCodes.badRequest).json({type: badRequestTypes.badData});
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
        res.json({ticket: _mapTicketToTicketDto(ticket)});
      },
      function(error) {
        console.error(logs.tickets.addTicket, logs.tickets.internalServerError, error);
        res.sendStatus(statusCodes.internalServerError);
      }
    );
  }, function(error) {
    console.error(logs.tickets.internalServerError, error);
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _onDeleteTicketDate(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.tickets.deleteTicketDate, logs.tickets.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  if ((!req.body.number && req.body.number !== 0) || !_isDateStringCorrect(req.body.date)) {
    console.error(logs.tickets.deleteTicketDate, logs.tickets.badRequest);
    res.sendStatus(statusCodes.badRequest);
    return;
  }

  ticketRepository.exists(req.user.id, req.body.number, function(result) {
    if (!result) {
      res.json();
      return;
    }

    ticketRepository.deleteDate(
      req.user.id,
      req.body.number,
      req.body.date,
      function() {
        res.json();
      },
      function(error) {
        console.error(
          logs.tickets.deleteTicketDate,
          logs.tickets.internalServerError,
          error
        );
        res.sendStatus(statusCodes.internalServerError);
      }
    );
  }, function(error) {
    console.error(
      logs.tickets.deleteTicketDate,
      logs.tickets.internalServerError,
      error
    );
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _onDeleteTicket(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.tickets.deleteTicket, logs.tickets.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  if ((!req.body.number && req.body.number !== 0)) {
    console.error(logs.tickets.deleteTicket, logs.tickets.badRequest);
    res.status(statusCodes.badRequest).json({type: badRequestTypes.badData});
    return;
  }

  ticketRepository.deleteTicket(
    req.user.id,
    req.body.number,
    function(result) {
      res.json(result);
    },
    function(error) {
      console.error(
        logs.tickets.deleteTicket,
        log.tickets.internalServerError,
        error
      );
      res.sendStatus(statusCodes.internalServerError);
    },
    function(error) {
      console.error(
        logs.tickets.deleteTicket,
        logs.tickets.internalServerError,
        error
      );
      res.sendStatus(statusCodes.internalServerError);
    }
  );
}

function _onFindTicket(req, res) {
  if (!req.isAuthenticated()) {
    console.error(logs.tickets.findTicket, logs.tickets.unauthenticated);
    res.sendStatus(statusCodes.unauthenticated);
    return;
  }

  if ((!req.body.number && req.body.number !== 0)) {
    console.error(logs.tickets.findTicket, logs.tickets.badRequest);
    res.status(statusCodes.badRequest).json({type: badRequestTypes.badData});
    return;
  }

  ticketRepository.find(req.user.id, req.body.number, function(ticket) {
    res.json({ticket: _mapTicketToTicketDto(ticket)});
  }, function(error) {
    console.error(logs.tickets.findTicket, logs.tickets.internalServerError, error);
    res.sendStatus(statusCodes.internalServerError);
  });
}

function _mapTicketToTicketDto(ticket) {
  return ticket
    ? {
      number: ticket.number,
      dates: ticket.dates
    }
    : null;
}

function _isDateStringCorrect(dateISOString) {
  var parsedDate = Date.parse(dateISOString);
  return !isNaN(parsedDate) && dateISOString === new Date(parsedDate).toISOString();
}
