const User = require('./model');

exports.getAll = async () => {
  return User.find();
};

exports.create = async ({
  data = {}
} = {}) => {
  return User.create(data);
};

// Get an individual user record
exports.getById = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  if (!id) return;
  let user = await User.findOne({
    _id: id
  }).lean().exec();
  return user;
};
