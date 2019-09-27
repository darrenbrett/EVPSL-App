const Game = require('./model');

// Get all games across time
exports.getAll = async () => {
  return Games.find();
};

// Get all games from a specific regular season
exports.getAllByYear = async (ctx) => {
  const year = ctx.request.params.year;
  if (!year) {
    ctx.response.status = 404;
    return "You must provide a year to filter by.";
  }
  return Games.find({
    seasonYear: year
  });
};

// Get scores by round
exports.getScoresByRound = async (ctx) => {
  let {
    year,
    round
  } = ctx.request.params;
  return Games.find({
    year,
    round
  });
};

// Get a score for a particular game
exports.getScore = async (ctx) => {
  let {
    year,
    round,
    homeTeam,
    awayTeam
  } = ctx.request.params;
  return Games.find({
    year,
    round,
    homeTeam,
    awayTeam
  });
};

// Execute the playing of the game
playGame = async () => {
  console.log('game being played...');
};

// Add a new game
exports.create = async ({
  data = {}
} = {}) => {
  return Game.create(data);
};
