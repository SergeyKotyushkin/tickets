const mongoose = require('mongoose');

module.exports = {
  connect: _connect
};

function _connect(onConnectSuccess) {
  mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(onConnectSuccess, _onConnectFailure);
}

function _onConnectFailure() {
  console.error('Error on mongodb connection');
}
