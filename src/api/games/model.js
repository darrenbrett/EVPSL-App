const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const GameSchema = new Schema({
  gameDate: {
    type: Date,
    required: true
  },
  homeTeam: {
    type: String,
    trim: true
  },
  awayTeam: {
    type: String,
    trim: true
  },
  year: {
    type: String
  },
  round: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
