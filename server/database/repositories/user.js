const UserModel = require('../models/user');

module.exports = {
  findUserByUsername: _findUserByUsername,
  createUser: _createUser
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

function _createUser(user, successCallback, errorCallback) {
  UserModel.create({
    username: user.username,
    password: user.password
  }, function(error, user) {
    if (error) {
      errorCallback(error);
      return;
    }

    successCallback(user);
  });
}
