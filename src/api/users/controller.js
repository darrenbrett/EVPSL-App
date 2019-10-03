const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model');
const verificationKey = require('./../../configuration/authConfig');

// Gets all records
exports.getAll = async () => {
  return User.find();
};

// Creates a new record
exports.create = async ({
  data = {}
} = {}) => {
  if (data.password) {
    const password = data.password;
    const hashedPassword = await createHashedPassword(password);
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
  const update = ctx.request.body;
  if (!id) return;
  const updatedUser = await User.findByIdAndUpdate(id, update, {
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
exports.getByCredentials = async ctx => {
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

// Logout a user out of a session
exports.logout = async (ctx) => {
  try {
    const user = ctx.req.user;
    console.log('username: ', user.username);
    console.log('user.tokens.length before: ', user.tokens.length);
    user.tokens = user.tokens.filter((token) => {
      return token.token !== ctx.req.token;
    });
    console.log('user.tokens.length after: ', user.tokens.length);
    await user.save();
    console.log(`User ${user._id} just logged out.`);
    return user;
  } catch (error) {
    console.log('Error: ', error);
  }
};

// Signs a new token for the user
generateAuthToken = (userId) => {
  let secretKey = verificationKey;
  let token = jwt.sign({
    user: userId.toString()
  }, secretKey, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
};
