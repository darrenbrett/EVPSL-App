const Team = require('./model');

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
