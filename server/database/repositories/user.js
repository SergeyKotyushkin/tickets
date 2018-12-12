const UserModel = require('../models/user');

module.exports = {
  findUserByUsername: _findUserByUsername
};

function _findUserByUsername(username, successCallback, errorCallback) {
  UserModel.findOne({
    username: username
  }, function(error, user) {
    if (error) {
      errorCallback(error, null);
      return;
    }

    successCallback(user);
  });
}
