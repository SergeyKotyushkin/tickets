const mongoose = require('mongoose');
const TicketSchema = require('../schemas/ticket');

const TicketModel = mongoose.model('Ticket', TicketSchema);

module.exports = TicketModel;
