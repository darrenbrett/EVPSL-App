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
