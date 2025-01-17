const Game = require('./model');
const Player = require('./../players/model');

// Get all games across time
exports.getAll = async () => {
  return Game.find();
};

// Get all games from a specific regular season
exports.getAllByYear = async (ctx) => {
  const year = ctx.request.params.year;
  if (!year) {
    ctx.response.status = 404;
    return "You must provide a year to filter by.";
  }
  return Game.find({
    seasonYear: year
  });
};

// Get all games from a specific regular season
exports.getGamesByRound = async (ctx) => {
  console.log('firing getGamesByRound - query: ', ctx.request.query);
  const {
    round
  } = ctx.request.query;
  if (!round) {
    ctx.response.status = 404;
    return "You must provide a round to filter by.";
  }
  return Game.find({
    round
  });
};

// Get scores by round
exports.getScoresByRound = async (ctx) => {
  let {
    year,
    round
  } = ctx.request.params;
  return Game.find({
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
  return Game.find({
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

// Updates an individual game record
exports.update = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  let update = ctx.request.body;
  if (!id) return;
  let updatedGame = await Game.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
  return updatedGame;
};

// Get an individual game record
exports.getById = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  if (!id) return;
  let user = await Game.findOne({
    _id: id
  }).lean().exec();
  return user;
};

exports.getScorersForTeam = async (ctx) => {
  const { team, totalGoals } = ctx.request.query;
  if (!team || !totalGoals || ! eligPlayers) return;
  let eligPlayers = await Player.find({
    currentTeam: team,
    playStatus: active
  });
} 
