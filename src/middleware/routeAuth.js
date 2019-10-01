const jwt = require('jsonwebtoken');
const verificationKey = require('./../configuration/authConfig');

const User = require('./../api/users/model');

module.exports = routeAuth = async (ctx, authHeader) => {
  // const authHeader = ctx.req.headers.authorization;
  // console.log('authHeader: ', authHeader);
  // if (!authHeader) {
  //   console.log('No auth header provided.');
  //   return;
  // }
  let token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    console.log('No token found.');
  }
  console.log(token);

  try {
    const decoded = jwt.verify(token, verificationKey.toString());
    console.log('decoded: ', decoded);
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
};
