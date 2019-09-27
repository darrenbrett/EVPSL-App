const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const PlayerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
