const passport = require('passport');
const ticketRepository = require('../../database/repositories/ticket');

module.exports = {
  apply: _applyRoutes
};

function _applyRoutes(expressApplication) {
  expressApplication.post('/get-tickets', _onGetTickets);
}

function _onGetTickets(req, res) {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated');
    res.json({error: true, unauthenticated: true});
    return;
  }

  ticketRepository.getMany(req.body.from, req.body.size, function(data) {
    res.json(data);
  }, function(error) {
    console.log('Internal Server Error');
    res.json({error: true});
  });
}
