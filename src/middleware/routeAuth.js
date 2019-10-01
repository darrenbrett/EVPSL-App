const jwt = require('jsonwebtoken');
const verificationKey = require('./../configuration/authConfig');

const User = require('./../api/users/model');

module.exports = routeAuth = async (ctx, authHeader, next) => {
  let token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    console.log('No token found.');
    return;
  }
  console.log(token);

  try {
    const decoded = jwt.verify(token, verificationKey.toString(), (err, decoded) => {
      if (err) {
        console.log('ERR! 46: ', err);
        return;
      }
      console.log('decoded 49: ', decoded);
      return decoded;
    });

    if (!decoded) {
      console.log('Verification failed.');
      return;
    }

    const user = await User.findById(decoded.user).exec();
    if (!user) {
      throw new Error();
    }
    ctx.req.user = user;
    ctx.req.token = token;
  } catch (error) {
    console.log(error);
    ctx.res.body = "Please authenticate.";
  }
  await next();
};
