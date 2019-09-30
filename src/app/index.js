const Koa = require('koa');
const jwt = require('jsonwebtoken');
const router = require('./../routing');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-morgan');
const responseTime = require('koa-response-time');

const database = require('../database');
const User = require('./../api/users/model');
const verificationKey = require('./../configuration/authConfig');

const app = new Koa();

// Log response time of calls
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // your API logic
  const ms = Date.now() - start;
  console.log(`API response time: ${ms} ms.`);
});

// Authentication
app.use(async (ctx, next) => {
  console.log('ctx.url: ', ctx.url);
  if (ctx.url.includes('api') && (!ctx.url.includes('login')) && (!ctx.url.includes('create'))) {
    const authHeader = ctx.req.headers.authorization;
    console.log('authHeader: ', authHeader);
    if (!authHeader) {
      console.log('No auth header provided.');
      return;
    }
    let token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      console.log('No token found.');
    }
    console.log(token);

    try {
      const decoded = jwt.verify(token, verificationKey);
      console.log('decoded: ', decoded);
      const user = User.findOne({
        _id: decoded._id,
        'tokens.token': token
      });
      if (!user) {
        throw new Error();
      }
      ctx.res.user = user._id;
      await next();
    } catch (error) {
      console.log(error);
      ctx.res.body = "Please authenticate.";
    }
  } else if ((ctx.url.includes('login')) || (ctx.url.includes('create'))) {
    console.log('Login or create API call triggered...');
    await next();
  }
});

app.use(responseTime());
app.use(logger('combined'));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(ctx => {
  ctx.type = 'json';
});

module.exports.start = async () => {
  try {
    await database.connect();
    console.log('Connected to database');
    const port = 3000;
    await app.listen(port);
    console.log(`Connected on port: ${port}`);
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};
