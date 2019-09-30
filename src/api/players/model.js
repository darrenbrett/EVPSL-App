const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const PlayerSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true,
      required: true
    },
    last: {
      type: String,
      trim: true,
      required: true
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number
  },
  birthdate: {
    type: Date
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  active: {
    type: Boolean
  }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
