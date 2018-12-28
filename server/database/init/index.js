const mongoose = require('mongoose');

module.exports = {
  connect: _connect
};

function _connect(onConnectSuccess) {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(
    _onConnectSuccess.bind(null, onConnectSuccess, mongoose.connection),
    _onConnectFailure
  );
}

function _onConnectSuccess(callback, mongooseConnection) {
  callback(mongooseConnection);
}

function _onConnectFailure() {
  console.error('Error on mongodb connection');
}
