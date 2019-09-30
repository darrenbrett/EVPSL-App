const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./../../configuration');
const User = require('./model');

const secretKey = config.get('SECRET_KEY');

// Gets all records
exports.getAll = async () => {
  return User.find();
};

// Creates a new record
exports.create = async ({
  data = {}
} = {}) => {
  console.log('data: ', data);
  if (data.password) {
    let password = data.password;
    let hashedPassword = await createHashedPassword(password);
    data.password = hashedPassword;
  }
  let user = await User.create(data);
  const token = generateAuthToken(user._id);
  user.tokens.push({
    token: token
  });
  await user.save();
  return {
    user,
    token
  };

};

// Updates an individual user record
exports.update = async (ctx) => {
  const {
    id
  } = ctx.request.query;
  let update = ctx.request.body;
  if (!id) return;
  let updatedUser = await User.findByIdAndUpdate(id, update, {
    new: true
  }).exec();
  return updatedUser;
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

// Hashes user password for storage in db
createHashedPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, 8);
  return hashedPassword;
};

// Checks to see if password matches with db password
doesPasswordMatch = async (username, password) => {
  const user = await User.findOne({
    username
  }).lean().exec();
  if (!user) {
    console.log('Not able to find user');
    return;
  }
  let dbPassword = user.password;
  const isMatch = await bcrypt.compare(password, dbPassword);
  if (isMatch) {
    return true;
  }
};

// Logs in user if credentials match db
exports.getByCredentials = async (ctx) => {
  const {
    username,
    password
  } = ctx.request.body;
  if (!username || !password) {
    console.log('username and password required.');
    return ctx.response.status = 404;
  }
  let isPasswordCorrect = await doesPasswordMatch(username, password);
  if (!isPasswordCorrect) {
    // return ctx.response.status.body = "Authentication failed.";
    return ctx.response.status = 404;
  }
  let user = await User.findOne({
    username: username
  }).exec();
  let token = await generateAuthToken(user._id);
  user.tokens.push({
    token: token
  });
  await user.save();
  console.log(`User ${user._id} just successfully logged in.`);
  return {
    user,
    token
  };
};

// Signs a new token for the user
generateAuthToken = (userId) => {
  let secretKey = 'oneup';
  let token = jwt.sign({
    user: userId.toString()
  }, secretKey, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
};
