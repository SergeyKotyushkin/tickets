const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

UserSchema.methods.comparePasswords = function(password) {
  return this.encryptPassword(password) === this.password;
}

UserSchema.methods.encryptPassword = function(password) {
  return this.salt
    ? crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    : password;
}

UserSchema.methods.makeSalt = function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
}

UserSchema.path('password').set(function _setPassword(password) {
  this.salt = this.makeSalt();
  return this.encryptPassword(password);
});

module.exports = UserSchema;
