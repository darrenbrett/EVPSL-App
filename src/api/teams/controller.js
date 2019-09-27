const Team = require('./model');

// Get all teams
exports.getAll = async () => {
  return Team.find();
};

// Get a specific team
exports.getById = async (ctx) => {
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
