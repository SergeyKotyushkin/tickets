const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({number: Number, dates: [Date]});

module.exports = TicketSchema;
