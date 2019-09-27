const Player = require('./model');

// Get all players
exports.getAll = async () => {
  return Player.find();
};

// Create a player record
exports.create = async ({
  data = {}
} = {}) => {
  return Player.create(data);
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

// Update a player record
exports.update = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  let updatedPlayer = await Player.update({
    _id: id
  });
  return updatedPlayer;
};
