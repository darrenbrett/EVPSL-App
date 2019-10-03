const jwt = require('jsonwebtoken');
const verificationKey = require('./../configuration/authConfig');

const User = require('./../api/users/model');

module.exports = routeAuth = async (ctx, authHeader, next) => {
  let token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    console.log('No token found.');
    return;
  }

  try {
    const decoded = jwt.verify(token, verificationKey.toString(), (err, decoded) => {
      if (err) {
        console.log('ERROR: ', err);
        return;
      }
      return decoded;
    });

    if (!decoded) {
      console.log('Verification failed.');
      return;
    }

    const user = await User.findOne({
      _id: decoded.user,
      'tokens.token': token
    }).exec();

    if (!user) {
      console.log('Unable to verify user.');
      return;
    }
    ctx.req.user = user;
    ctx.req.token = token;
  } catch (error) {
    console.log(error);
    ctx.res.body = "Please authenticate.";
  }
  await next();
};
