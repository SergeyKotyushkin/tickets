const authApplier = require('./appliers/auth');
const staticFilesApplier = require('./appliers/static');
const markupApplier = require('./appliers/markup');
const ticketsApplier = require('./appliers/tickets');

module.exports = {
  apply: _applyAll
}

const appliers = [authApplier, ticketsApplier, staticFilesApplier, markupApplier];

function _applyAll(expressApplication) {
  appliers.forEach(function(applier) {
    applier.apply(expressApplication);
  });
}
