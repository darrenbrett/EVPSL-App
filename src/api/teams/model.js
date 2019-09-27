const mongoose = require('mongoose');
const {
  Schema
} = require('mongoose');

const TeamSchema = new Schema({
  name: {
    location: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    nick: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  owner: {
    firstName: {
      type: String,
      required: true,
      trim: true,
      default: 'League'
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      default: 'Office'
    }
  },
  playerRoster: [{
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  }],
  headCoach: {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  entryYear: {
    type: String
  },
  firstSeason: {
    type: String
  }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
