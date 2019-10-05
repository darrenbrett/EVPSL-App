const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const RoundSchema = new Schema({
  games: [{
    away: {
      type: String,
      required: true
    },
    home: {
      type: String,
      required: true
    }
  }],
  season: {
    type: Number
  },
  year: {
    type: Number
  },
  round: {
    type: Number
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Round = mongoose.model('Round', RoundSchema);

module.exports = Round;
