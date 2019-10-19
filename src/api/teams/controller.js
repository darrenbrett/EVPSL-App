const Team = require('./model');
const Player = require('./../players/model');

// Get all teams
exports.getAll = async () => {
  return Team.find();
};

// Get a specific team
exports.getById = async (ctx) => {
  console.log('ctx.state: ', ctx.state);
  const {
    id
  } = ctx.request.query;
  if (!id) return;
  let team = await Team.findOne({
    _id: id
  }).lean().exec();
  return team;
};

// Create a team
exports.create = async ({
  data = {}
} = {}) => {
  return Team.create(data);
};

// Updates an individual team record
exports.update = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  let update = ctx.request.body;
  if (!id) return;
  let updatedTeam = await Team.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
  return updatedTeam;
};

// Get the total players agg score per team
exports.getPlayersAggScore = async (ctx) => {
  let teamPlayerScores = [];
  const {
    team
  } = ctx.request.query;
  if (!team) return;

  // Get all player docs for a given team
  const teamPlayers = await Player.find({
    currentTeam: team
  });

  teamPlayerScores = teamPlayers.map(player => player.aggScore);

  let aggPlayerTeamScore = Math.round(teamPlayerScores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  ));

  return aggPlayerTeamScore;
};

// Get the total agg player score for all teams
exports.getAllTeamPlayerAggScores = async (ctx) => {
  let teams = await Team.find();
  const teamPlayerScores = teams.map(({
    name,
    playersAggScore
  }) => ({
    [name.location]: playersAggScore
  }));
  return teamPlayerScores;
};

// Get team score - aggPlayerScore + Random Variability
exports.getTeamScores = async (ctx) => {
  let teamPlayerScores = await this.getAllTeamPlayerAggScores();
  console.log('teamPlayerScores');
  let min = Math.ceil(0);
  max = Math.floor(3);
  let randomVal = Math.floor(Math.random() * (max - min + 1)) + min; // The minimm and maximum are inclusive
  const teamScores = teamsPlayerScores.map(({
    name,
    playersAggScore
  }) => ({
    [name.location]: playersAggScore
  }));
  return teamPlayerScores;
};
