const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    // unique: true
  },
  name: {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String
    }
  }],
  type: {
    type: String,
    enum: ['owner', 'admin', 'observer']
  },
  active: {
    type: Boolean
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
