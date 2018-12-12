const authApplier = require('./appliers/auth');
const staticFilesApplier = require('./appliers/static');
const markupApplier = require('./appliers/markup');

module.exports = {
  apply: _applyAll
}

const appliers = [authApplier, staticFilesApplier, markupApplier];

function _applyAll(expressApplication) {
  appliers.forEach(function(applier) {
    applier.apply(expressApplication);
  });
}
