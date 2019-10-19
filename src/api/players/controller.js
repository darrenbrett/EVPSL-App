'use script';

const Player = require('./model');

// Get all players
exports.getAll = async () => {
  return Player.find();
};

// Create a player record
exports.add = async ({
  data
}) => {
  console.log('player.create() is firing...');
  console.log('data: ', data);
  return Player.create(data);
};

// Updates an individual player record
exports.update = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  let update = ctx.request.body;
  if (!id) return;
  let updatedPlayer = await Player.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
  return updatedPlayer;
};

// Get an individual player record
exports.getById = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  if (!id) return;
  let player = await Player.findOne({
    _id: id
  }).lean().exec();
  return player;
};

exports.getPlayersTeamScore = async (ctx) => {
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

  let aggPlayerTeamScore = teamPlayerScores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log('aggPlayerTeamScore: ', aggPlayerTeamScore);
};
