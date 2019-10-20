const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const PlayerSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true,
      // required: true
    },
    last: {
      type: String,
      trim: true,
      // required: true
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  speed: {
    type: Number
  },
  age: {
    type: Number
  },
  ballHandling: {
    type: Number
  },
  strength: {
    type: Number
  },
  soccerIntelligence: {
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
  mentalFortitude: {
    type: Number
  },
  physicalFortitude: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  currentTeam: {
    type: String
  },
  formerTeams: [],
  currentPosition: {
    type: String
  },
  aggScore: {
    type: Number
  },
  position: {
    type: String
  }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
